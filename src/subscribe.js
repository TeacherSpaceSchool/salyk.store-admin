import { getJWT } from '../src/lib'
let isSubscribed = false;
let swRegistration = null;
import { applicationKey, urlSubscribe } from '../redux/constants/other';

export let checkDisableSubscribe = () => {
    if('Notification' in window){
        if (Notification.permission !== 'denied') {
            Notification.requestPermission()
        }
        if (localStorage.browserNumber&&Notification.permission !== 'granted') {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open('POST', `${urlSubscribe}/delete`);
            xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8', );
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState != 4) return;
                localStorage.removeItem('browserNumber')
            };
            xmlHttp.send(JSON.stringify({number: localStorage.browserNumber}));
        }
    }
}

export let register = (update) => {
// Installing service worker
    return new Promise(async (resolve) => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then((swReg) => {
                if (!!swReg) {
                    swRegistration = swReg;
                    swRegistration.pushManager.getSubscription()
                        .then(function (subscription) {
                            isSubscribed = !(subscription === null);
                            if (isSubscribed) {
                                saveSubscription(subscription);
                                isSubscribed = true;
                                resolve()
                                /*if (update||!localStorage.browserNumber) {
                                    subscription.unsubscribe().then(function () {
                                        saveSubscription(subscription);
                                        isSubscribed = true;
                                        resolve()
                                    }).catch(function (err) {
                                        console.error('Failed to unsubscribe user: ', err);
                                        resolve()
                                    })
                                }
                                else{
                                    resolve()
                                }*/
                            } else {
                                swRegistration.pushManager.subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlB64ToUint8Array(applicationKey)
                                })
                                    .then(function (subscription) {
                                        saveSubscription(subscription);
                                        isSubscribed = true;
                                        resolve()
                                    })
                                    .catch(function (err) {
                                        console.error('Failed to subscribe user: ', err);
                                        resolve()
                                    })
                            }
                        })
                }
            })
        }
        else resolve()
    })
}

export let unregister = () => {
    if(localStorage.browserNumber){
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', `${urlSubscribe}/unregister`);
        xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8', );
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState != 4) return;
        };
        if(localStorage.browserNumber)
            xmlHttp.send(JSON.stringify({number: localStorage.browserNumber}));
    }
}

// Url Encription
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Send request to database for add new subscriber
function saveSubscription(subscription) {
    let xmlHttp = new XMLHttpRequest();
    //put here API address
    xmlHttp.open('POST', `${urlSubscribe}/register`);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8', );
    xmlHttp.setRequestHeader('Authorization', 'Bearer '+getJWT(document.cookie), );
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState != 4) return;
        if(xmlHttp.response)
            localStorage.browserNumber = xmlHttp.response
    };
    if(localStorage.browserNumber) {
        subscription = JSON.parse(JSON.stringify(subscription))
        subscription.number = localStorage.browserNumber
    }
    xmlHttp.send(JSON.stringify(subscription));
}