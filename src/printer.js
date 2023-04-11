import EscPosEncoder from 'esc-pos-encoder'
const {loadImage} = require('canvas')

const bufferLength = 512

export const connectPrinterByBluetooth = async () => {
    let device = await navigator.bluetooth.requestDevice({filters: [{services: ['000018f0-0000-1000-8000-00805f9b34fb']}]})
    let server = await device.gatt.connect();
    let service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb')
    return await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb')
}

export const printEsPosData = async (printer, data) => {
    let encoder = new EscPosEncoder();
    let printMessage, printQR, printImg
    for(let i=0; i<data.length; i++) {
        if(data[i].message) {
            data[i].message = encoder.initialize().codepage('cp866').align(data[i].align).bold(data[i].bold).line(data[i].message).bold(false).encode();
            while (data[i].message.length > bufferLength) {
                printMessage = data[i].message.slice(0, bufferLength);
                await printer.writeValue(printMessage);
                data[i].message = data[i].message.slice(bufferLength);
            }
            if(data[i].message.length)
                await printer.writeValue(data[i].message);
        }
        else if(data[i].QR) {
            data[i].QR = encoder.initialize().align('center').qrcode(data[i].QR, 1, 8, 'h').encode();
            while (data[i].QR.length > bufferLength) {
                printQR = data[i].QR.slice(0, bufferLength);
                await printer.writeValue(printQR);
                data[i].QR = data[i].QR.slice(bufferLength);
            }
            if(data[i].QR.length)
                await printer.writeValue(data[i].QR);
        }
        else if(data[i].image) {
            let img = new Image();
            img.src = data[i].image;
            await img.decode();
            img = encoder
                .initialize()
                .align('center')
                .image(img, 320, 320, 'atkinson')
                .encode()
            while (img.length > bufferLength) {
                printImg = img.slice(0, bufferLength);
                await printer.writeValue(printImg);
                img = img.slice(bufferLength);
            }
            if(img.length)
                await printer.writeValue(img);
        }
    }
    await printer.writeValue(encoder.initialize().text('\u000A\u000A\u000D').encode());
}

export const printEsPosQR = async (printer, QR) => {
    let encoder = new EscPosEncoder();
    let printQR
    QR = encoder
        .initialize()
        .align('center')
        .qrcode(QR, 1, 6, 'h')
        .encode();
    while (QR.length > bufferLength) {
        printQR = QR.slice(0, bufferLength);
        await printer.writeValue(printQR);
        QR = QR.slice(bufferLength);
    }
    await printer.writeValue(QR);
    await printer.writeValue(encoder.text('\u000A\u000A\u000D').encode());
}

export const printEsPosImg = async (printer, srcImg) => {
    let encoder = new EscPosEncoder();
    let img = await loadImage(srcImg)
    img = encoder
        .initialize()
        .align('center')
        .image(img, 320, 320)
        .encode()
    while (img.length > bufferLength) {
        const printImg = img.slice(0, bufferLength);
        await printer.writeValue(printImg);
        img = img.slice(bufferLength);
    }
    if(img.length)
        await printer.writeValue(img);
    await printer.writeValue(encoder.text('\u000A\u000A\u000D').encode());
}