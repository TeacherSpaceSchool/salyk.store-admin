import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, {useRef, useState, useEffect} from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getSale} from '../../src/gql/sale'
import saleStyle from '../../src/styleMUI/list'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as appActions from '../../redux/actions/app'
import { useRouter } from 'next/router'
//import Router from 'next/router'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import {checkFloat, pdDDMMYYHHMM} from '../../src/lib'
import { connectPrinterByBluetooth, printEsPosData } from '../../src/printer'
import Button from '@material-ui/core/Button';
import dynamic from 'next/dynamic'
const Pdf = dynamic(import('react-to-pdf'), { ssr: false });
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import ViewText from '../../components/dialog/ViewText';
import SendText from '../../components/dialog/SendText';
import QRShare from '../../components/dialog/QRShare';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as snackbarActions from '../../redux/actions/snackbar'

const Receipt = React.memo((props) => {
    const classes = saleStyle();
    const { data } = props;
    const { isMobileApp, printer } = props.app;
    const { profile } = props.user;
    const { setPrinter } = props.appActions;
    const router = useRouter()
    const { showSnackBar } = props.snackbarActions;
    const receiptRef = useRef(null);
    let [readyPrint, setReadyPrint] = useState(data.list);
    useEffect(() => {
        setReadyPrint(process.browser&&receiptRef.current&&data.object)
    }, [process.browser, receiptRef.current]);
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const [anchorElQuick, setAnchorElQuick] = useState(null);
    const openQuick = Boolean(anchorElQuick);
    let handleMenuQuick = (event) => {
        setAnchorElQuick(event.currentTarget);
    }
    let handleCloseQuick = () => {
        setAnchorElQuick(null);
    }
    return (
        <App pageName={data.object!==null?`?????? ???${data.object.number}`:'???????????? ???? ??????????????'}>
            <Head>
                <title>{data.object!==null?`?????? ???${data.object.number}`:'???????????? ???? ??????????????'}</title>
                <meta name='description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:title' content={data.object!==null?`?????? ???${data.object.number}`:'???????????? ???? ??????????????'} />
                <meta property='og:description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/sale/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/sale/${router.query.id}`}/>
            </Head>
            {
                ['admin', 'superadmin', '????????????????'].includes(profile.role)&&data.object&&data.object._id?
                    <div className={classes.status}>
                        {
                            data.object.sync?
                                <SyncOn color={data.object.syncMsg==='???????????????????? ?????????? ????????????????'?'secondary':'primary'} onClick={async()=>{
                                    if(profile.statistic) {
                                        setMiniDialog('??????????????????????????', <ViewText text={data.object.syncMsg}/>)
                                        showMiniDialog(true)
                                    }
                                }} className={classes.sync}/>
                                :
                                <SyncOff color='secondary' onClick={async()=>{
                                    if(profile.statistic) {
                                        setMiniDialog('??????????????????????????', <ViewText text={data.object.syncMsg}/>)
                                        showMiniDialog(true)
                                    }
                                }} className={classes.sync}/>
                        }
                    </div>
                    :
                    null
            }
            {
                data.object!==null?
                    <>
                    <center style={{width: '100%'}}>
                        <div style={{
                            border: '1px black solid',
                            width: 323,
                            fontSize: 14,
                            padding: 10,
                            background: 'white',
                            marginTop: 20
                        }} ref={receiptRef}>
                            {
                                ['admin', 'superadmin'].includes(profile.role)?
                                    <Link href='/legalobject/[id]' as={`/legalobject/${data.object.legalObject._id}`}>
                                        <a>
                                            <h3 style={{textAlign: 'center', marginBottom: 10, marginTop: 10}}>{data.object.legalObject.name}</h3>
                                        </a>
                                    </Link>
                                    :
                                    <h3 style={{textAlign: 'center', marginBottom: 10, marginTop: 10}}>{data.object.legalObject.name}</h3>
                            }
                            {
                                ['admin', 'superadmin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                    <Link href='/branch/[id]' as={`/branch/${data.object.branch._id}`}>
                                        <a>
                                            <div style={{textAlign: 'center', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.name}, {data.object.branch.address}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'center', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.name}, {data.object.branch.address}</span></div>
                            }
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>????????: {pdDDMMYYHHMM(data.object.createdAt)}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>????????????????: {data.object.type}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>?????? ???{data.object.number}</span></div>
                            {
                                data.object.sale?
                                    profile.role?
                                        <Link href='/sale/[id]' as={`/sale/${data.object.sale._id}`}>
                                            <a>
                                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>?????? ?????????????????? ???{data.object.sale.number}</span></div>
                                            </a>
                                        </Link>
                                        :
                                        <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>?????? ?????????????????? ???{data.object.sale.number}</span></div>
                                    :
                                    null
                            }
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>??????: {data.object.legalObject.inn}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>????: {data.object.legalObject.rateTaxe}</span></div>
                            {
                                ['admin', 'superadmin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                    <Link href='/cashbox/[id]' as={`/cashbox/${data.object.cashbox._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>??????: {data.object.cashbox.rnmNumber}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>??????: {data.object.cashbox.rnmNumber}</span></div>
                            }
                            {
                                ['admin', 'superadmin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                    <Link href='/workshift/[id]' as={`/workshift/${data.object.workShift._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>?????????? ???{data.object.workShift.number}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>?????????? ???{data.object.workShift.number}</span></div>
                            }
                            {
                                ['admin', 'superadmin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                    <Link href='/user/[id]' as={`/user/${data.object.cashier._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>????????????: {data.object.cashier.name}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>????????????: {data.object.cashier.name}</span></div>
                            }
                            {
                                data.object.client?
                                    profile.role?
                                        <Link href='/client/[id]' as={`/client/${data.object.client._id}`}>
                                            <a>
                                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>????????????????????: {data.object.client.name}</span></div>
                                            </a>
                                        </Link>
                                        :
                                        <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>????????????????????: {data.object.client.name}</span></div>
                                    :
                                    null
                            }
                            <div style={{textAlign: 'center', height: 12, marginTop: 10, marginBottom: 10}}>**********************************************</div>
                            {data.object.items?data.object.items.map((item, idx)=>
                                <div key={`item${idx}`} className={classes.column}>
                                    <div style={{textAlign: 'left', marginBottom: 5}}>{item.name}{item.mark?' | M':''}{item.tnved?` | ${item.tnved}`:''}</div>
                                    <div style={{textAlign: 'right', marginBottom: 5}}>{item.price} * {item.count} {item.unit} = {item.amountStart}</div>
                                    {
                                        item.discount||item.extra?
                                            <>
                                            {
                                                item.discount?
                                                    <div style={{textAlign: 'right', marginBottom: 5}}>{'??????????????'===data.object.type?'????????????':'????????????'}: {item.discount}</div>
                                                    :
                                                    null
                                            }
                                            {
                                                item.extra?
                                                    <div style={{textAlign: 'right', marginBottom: 5}}>??????????????: {item.extra}</div>
                                                    :
                                                    null
                                            }
                                            <div style={{textAlign: 'right', marginBottom: 5}}>??????????: {item.amountEnd}</div>
                                            </>
                                            :
                                            null
                                    }
                                </div>
                            ):null}
                            <div style={{textAlign: 'center', height: 12, marginTop: 10, marginBottom: 10}}>**********************************************</div>
                            {
                                data.object.discount?
                                    <div style={{textAlign: 'right', marginBottom: 5}}>{'??????????????'===data.object.type?'????????????':'????????????'}: {data.object.discount}</div>
                                    :
                                    null
                            }
                            {
                                data.object.extra?
                                    <div style={{textAlign: 'right', marginBottom: 5}}>??????????????: {data.object.extra}</div>
                                    :
                                    null
                            }
                            <div style={{textAlign: 'right', marginBottom: 5}}>??????{data.object.ndsPrecent?` ${data.object.ndsPrecent}%`:''}: {data.object.nds}</div>
                            <div style={{textAlign: 'right', marginBottom: 5}}>??????{data.object.nspPrecent?` ${data.object.nspPrecent}%`:''}: {data.object.nsp}</div>
                            <div style={{textAlign: 'right', marginBottom: 5, fontWeight: 'bold'}}>??????????: {data.object.amountEnd}</div>
                            <div style={{textAlign: 'right', marginBottom: 5}}>{data.object.type==='??????????????'?'??????????????????':data.object.typePayment}: {data.object.paid}</div>
                            {
                                data.object.usedPrepayment?
                                    <div style={{textAlign: 'right', marginBottom: 5}}>??????????????: {data.object.usedPrepayment}</div>
                                    :
                                    null
                            }
                            {
                                data.object.type==='????????????'||data.object.type==='??????????????'&&data.object.paid<data.object.amountEnd?
                                    <div style={{textAlign: 'right', marginBottom: 5}}>????????????????: {checkFloat(data.object.amountEnd-data.object.paid)}</div>
                                    :
                                    null
                            }
                            <div style={{textAlign: 'right', marginBottom: 5}}>??????????: {data.object.change}</div>
                            {
                                data.object.comment?
                                    <div style={{textAlign: 'right', marginBottom: 5}}>??????????????????????: {data.object.comment}</div>
                                    :
                                    null
                            }
                            {
                                data.object.syncMsg!=='???????????????????? ?????????? ????????????????'?
                                    <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>*********************????*********************</span></p>
                                    :
                                    null
                            }
                            <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>?????? SALYK.STORE v1.0</span></p>
                            {
                                data.object.qr?
                                    <>
                                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                        <img width={170} height={170} src={data.object.qr} />
                                    </div>
                                    <p style={{textAlign: 'center'}}>???????????????????????????? ???????????? ??????:<br/>kkm.salyk.kg</p>
                                    </>
                                    :
                                    null
                            }
                        </div>
                    </center>
                    {
                        readyPrint?
                            <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                                {
                                    profile.role?
                                        <>
                                        <Button color='primary' onClick={async ()=>{
                                            if(isMobileApp&&navigator.bluetooth){
                                                let _printer = printer
                                                if(!_printer) {
                                                    _printer = await connectPrinterByBluetooth()
                                                    setPrinter(_printer)
                                                }

                                                let _data = [
                                                    {message: data.object.legalObject.name, align: 'center'},
                                                    {message: `${data.object.branch.name}, ${data.object.branch.address}`, align: 'center'},
                                                    {message: `????????: ${pdDDMMYYHHMM(data.object.createdAt)}`, align: 'left'},
                                                    {message: `????????????????: ${data.object.type}`, align: 'left'},
                                                    {message: `?????? ???${data.object.number}`, align: 'left'},
                                                    ...data.object.sale?[{message: `?????? ?????????????????? ???${data.object.sale.number}`, align: 'left'}]:[],
                                                    {message: `??????: ${data.object.legalObject.inn}`, align: 'left'},
                                                    {message: `????: ${data.object.legalObject.rateTaxe}`, align: 'left'},
                                                    {message: `??????: ${data.object.cashbox.rnmNumber}`, align: 'left'},
                                                    {message: `?????????? ???${data.object.workShift.number}`, align: 'left'},
                                                    {message: `????????????: ${data.object.cashier.name}`, align: 'left'},
                                                    ...data.object.client?[{message: `????????????????????: ${data.object.client.number}`, align: 'left'}]:[],
                                                    {message: '********************************', align: 'center'},
                                                ]
                                                for(let i=0; i<data.object.items.length; i++) {
                                                    _data.push({message: `${data.object.items[i].name}${data.object.items[i].mark?' | M':''}${data.object.items[i].tnved?` | ${data.object.items[i].tnved}`:''}`, align: 'left'})
                                                    _data.push({message: `${data.object.items[i].price} * ${data.object.items[i].count} ${data.object.items[i].unit} = ${data.object.items[i].amountStart}`, align: 'right'})
                                                    if(data.object.items[i].discount||data.object.items[i].extra){
                                                        if(data.object.items[i].discount)
                                                            _data.push({message: `${'??????????????'===data.object.type?'????????????':'????????????'}: ${data.object.items[i].discount}`, align: 'right'})
                                                        if(data.object.items[i].extra)
                                                            _data.push({message: `??????????????: ${data.object.items[i].extra}`, align: 'right'})
                                                        _data.push({message: `??????????: ${data.object.items[i].amountEnd}`, align: 'right'})
                                                    }
                                                }
                                                _data.push({message: '********************************', align: 'center'})
                                                if(data.object.discount)
                                                    _data.push({message: `${'??????????????'===data.object.type?'????????????':'????????????'}: ${data.object.discount}`, align: 'right'})
                                                if(data.object.extra)
                                                    _data.push({message: `??????????????: ${data.object.extra}`, align: 'right'})
                                                _data.push({message: `??????${data.object.ndsPrecent?` ${data.object.ndsPrecent}%`:''}: ${data.object.nds}`, align: 'right'})
                                                _data.push({message: `??????${data.object.nspPrecent?` ${data.object.nspPrecent}%`:''}: ${data.object.nsp}`, align: 'right'})
                                                _data.push({message: `??????????: ${data.object.amountEnd}`, align: 'right', bold: true})
                                                _data.push({message: `${data.object.type==='??????????????'?'??????????????????':data.object.typePayment}: ${data.object.paid}`, align: 'right'})
                                                if(data.object.usedPrepayment)
                                                    _data.push({message: `??????????????: ${data.object.usedPrepayment}`, align: 'right'})
                                                if(data.object.type==='????????????'||data.object.type==='??????????????'&&data.object.paid<data.object.amountEnd)
                                                    _data.push({message: `????????????????: ${checkFloat(data.object.amountEnd-data.object.paid)}`, align: 'right'})
                                                _data.push({message: `??????????: ${data.object.change}`, align: 'right'})
                                                if(data.object.comment)
                                                    _data.push({message: `??????????????????????: ${data.object.comment}`, align: 'right'})
                                                if(data.object.syncMsg!=='???????????????????? ?????????? ????????????????')
                                                    _data.push({message: '***************????***************', align: 'center', bold: true})
                                                _data.push({message: '?????? SALYK.STORE v1.0', align: 'center', bold: true})

                                                _data.push({image: data.object.qr})
                                                _data.push({message: '???????????????????????????? ???????????? ??????:', align: 'center'})
                                                _data.push({message: 'kkm.salyk.kg', align: 'center'})

                                                await printEsPosData(_printer, _data)
                                            }
                                            else {
                                                let printContents = receiptRef.current.innerHTML;
                                                let printWindow = window.open();
                                                printWindow.document.write(printContents);
                                                printWindow.document.write(`<script type="text/javascript">window.onload = function() { window.print(); window.close()};</script>`);
                                                printWindow.document.close();
                                                printWindow.focus();
                                            }
                                        }}>????????????</Button>
                                        <Pdf targetRef={receiptRef} filename={`?????? ???${data.object.number}`}
                                             options = {{
                                                 format: [receiptRef.current.offsetHeight*0.8, receiptRef.current.offsetWidth*0.75]
                                             }}>
                                            {({ toPdf }) => <Button color='primary' onClick={toPdf}>??????????????</Button>}
                                        </Pdf>
                                        <Menu
                                            key='Quick'
                                            id='menu-appbar'
                                            anchorEl={anchorElQuick}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            open={openQuick}
                                            onClose={handleCloseQuick}
                                        >
                                            <MenuItem onClick={async()=>{
                                                setMiniDialog('???????????????????? QR', <QRShare value={`${urlMain}/sale/${router.query.id}`}/>)
                                                showMiniDialog(true)
                                                handleCloseQuick()
                                            }}>
                                                QR
                                            </MenuItem>
                                            <MenuItem onClick={async()=>{
                                                setMiniDialog('?????????????????? ???? WhatsApp', <SendText type='whatsapp' text={`${urlMain}/sale/${router.query.id}`}/>)
                                                showMiniDialog(true)
                                                handleCloseQuick()
                                            }}>
                                                WhatsApp
                                            </MenuItem>
                                            <MenuItem onClick={async()=>{
                                                setMiniDialog('?????????????????? ???? ??????????', <SendText type='mail' title={`?????? ???${data.object.number}`} text={`${urlMain}/sale/${router.query.id}`}/>)
                                                showMiniDialog(true)
                                                handleCloseQuick()
                                            }}>
                                                ??????????
                                            </MenuItem>
                                            {
                                                navigator.share&&isMobileApp?
                                                    <MenuItem onClick={async()=>{
                                                        await navigator.share({
                                                            url: `${urlMain}/sale/${router.query.id}`,
                                                        })
                                                        handleCloseQuick()
                                                    }}>
                                                        ????????????????????
                                                    </MenuItem>
                                                    :
                                                    null
                                            }
                                            {
                                                navigator.clipboard?
                                                    <MenuItem onClick={async()=>{
                                                        await navigator.clipboard.writeText(`${urlMain}/sale/${router.query.id}`)
                                                        handleCloseQuick()
                                                        showSnackBar('???????????? ??????????????????????')
                                                    }}>
                                                        ????????????????????
                                                    </MenuItem>
                                                    :
                                                    null
                                            }
                                        </Menu>
                                        <Button onClick={handleMenuQuick} color='primary'>
                                            ??????????????????
                                        </Button>
                                        </>
                                        :
                                        <Pdf targetRef={receiptRef} filename={`?????? ???${data.object.number}`}
                                             options = {{
                                                 format: [receiptRef.current.offsetHeight*0.8, receiptRef.current.offsetWidth*0.75]
                                             }}>
                                            {({ toPdf }) => <Button color='primary' onClick={toPdf}>??????????????</Button>}
                                        </Pdf>
                                }
                            </div>
                            :
                            null
                    }
                    </>
                    :
                    null
            }
        </App>
    )
})

Receipt.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    /*if(!['admin', 'superadmin', '??????????????????????', '????????????', '??????????????????????'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')*/
    let object = await getSale({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)
    return {
        data: {
            object
        }
    };
};

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);