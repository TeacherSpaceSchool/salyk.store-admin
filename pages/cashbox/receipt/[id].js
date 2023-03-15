import initialApp from '../../../src/initialApp'
import Head from 'next/head';
import React, {useRef, useState, useEffect} from 'react';
import App from '../../../layouts/App';
import { connect } from 'react-redux'
import {getCashbox} from '../../../src/gql/cashbox'
import saleStyle from '../../../src/styleMUI/list'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions/app'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { urlMain } from '../../../redux/constants/other'
import { getClientGqlSsr } from '../../../src/getClientGQL'
import {pdDDMMYYHHMM, pdDDMMYYYY} from '../../../src/lib'
import { connectPrinterByBluetooth, printEsPosData } from '../../../src/printer'
import Button from '@material-ui/core/Button';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import Bluetooth from '@material-ui/icons/Bluetooth';
import Print from '@material-ui/icons/Print';
const Pdf = dynamic(import('react-to-pdf'), { ssr: false });

const Receipt = React.memo((props) => {
    const classes = saleStyle();
    const { data } = props;
    const { isMobileApp, printer } = props.app;
    const { profile } = props.user;
    const { setPrinter } = props.appActions;
    const router = useRouter()
    const receiptRef = useRef(null);
    let [syncData] = useState(data.object?JSON.parse(data.object.syncData[router.query.idx][1]):null);
    let [readyPrint, setReadyPrint] = useState(data.list);
    useEffect(() => {
        setReadyPrint(process.browser&&receiptRef.current&&data.object)
    }, [process.browser, receiptRef.current]);
    return (
        <App pageName={data.object!==null?`Чек №${parseInt(router.query.idx)+1}`:'Ничего не найдено'}>
            <Head>
                <title>{data.object!==null?`Чек №${parseInt(router.query.idx)+1}`:'Ничего не найдено'}</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content={data.object!==null?`Чек №${parseInt(router.query.idx)+1}`:'Ничего не найдено'} />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/cashbox/receipt/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/cashbox/receipt/${router.query.id}`}/>
            </Head>
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
                            <h3 style={{textAlign: 'center', marginBottom: 10, marginTop: 10}}>{
                                data.object.syncData[router.query.idx][0]==='registerCashbox'?
                                    'РЕГИСТРАЦИЯ ФМ'
                                    :
                                    data.object.syncData[router.query.idx][0]==='reregisterCashbox'?
                                        'ПЕРЕРЕГИСТРАЦИЯ ФМ'
                                        :
                                        'ЗАКРЫТИЕ ФМ'
                            }</h3>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>ЧЕК №{parseInt(router.query.idx)+1}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Дата: {pdDDMMYYHHMM(syncData.date)}</span></div>
                            {
                                ['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(profile.role)?
                                    <Link href='/cashbox/[id]' as={`/cashbox/${data.object._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Касса: {data.object.name}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Касса: {data.object.name}</span></div>
                            }
                            {
                                ['admin', 'superadmin'].includes(profile.role)?
                                    <Link href='/legalobject/[id]' as={`/legalobject/${data.object.legalObject._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.legalObject.name}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.legalObject.name}</span></div>
                            }
                            {
                                ['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(profile.role)?
                                    <>
                                        <Link href='/branch/[id]' as={`/branch/${data.object.branch._id}`}>
                                            <a>
                                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.name}</span></div>
                                            </a>
                                        </Link>
                                        <Link href='/branch/[id]' as={`/branch/${data.object.branch._id}`}>
                                            <a>
                                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.address}</span></div>
                                            </a>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.name}</span></div>
                                        <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.address}</span></div>
                                    </>
                            }
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>ИНН: {data.object.legalObject.inn}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>СНО: {data.object.legalObject.taxSystemName_v2}</span></div>
                             <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>**********************************************</span></p>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Истечение регистрации ФМ: {pdDDMMYYYY(data.object.fnExpiresAt)}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Налоговый орган: {data.object.branch.ugnsName_v2}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Плательщик НДС: {data.object.legalObject.vatPayer_v2?'Да':'Нет'}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Тип: {data.object.branch.entrepreneurshipObjectName_v2}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Деятельность: {data.object.branch.businessActivityName_v2}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Предметы расчета: {data.object.branch.calcItemAttributeName_v2}</span></div>
                            <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>*********************ФП*********************</span></p>
                            <div style={{textAlign: 'right', marginBottom: 5}}>РН ККМ: {data.object.registrationNumber}</div>
                            <div style={{textAlign: 'right', marginBottom: 5}}>ФМ: {data.object.fn}</div>
                            <div style={{textAlign: 'right', marginBottom: 5}}>ФД: {syncData.fields[1040]}</div>
                            <div style={{textAlign: 'right', marginBottom: 5}}>ФПД: {parseInt(syncData.fields[1077], 16)}</div>
                            <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>**********************************************</span></p>
                            <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>ККМ SALYK.STORE v1.1</span></p>
                        </div>
                    </center>
                    {
                        readyPrint?
                            <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                                {
                                    !isMobileApp?
                                        <Button color='primary' onClick={async ()=>{
                                            let printContents = receiptRef.current.innerHTML;
                                            let printWindow = window.open();
                                            printWindow.document.write(printContents);
                                            printWindow.document.write(`<script type="text/javascript">window.onload = function() { window.print(); window.close()};</script>`);
                                            printWindow.document.close();
                                            printWindow.focus();
                                        }}>
                                            <Print/>&nbsp;Печать
                                        </Button>
                                        :
                                        null
                                }
                                {
                                    navigator.bluetooth?
                                        <Button color='primary' onClick={async ()=>{
                                            let _printer = printer
                                            if(!_printer) {
                                                _printer = await connectPrinterByBluetooth()
                                                setPrinter(_printer)
                                            }
                                            let _data = [
                                                {message: `${
                                                        data.object.syncData[router.query.idx][0]==='registerCashbox'?
                                                            'РЕГИСТРАЦИЯ ФМ'
                                                            :
                                                            data.object.syncData[router.query.idx][0]==='reregisterCashbox'?
                                                                'ПЕРЕРЕГИСТРАЦИЯ ФМ'
                                                                :
                                                                'ЗАКРЫТИЕ ФМ'
                                                    }`, align: 'center', bold: true},
                                                {message: `ЧЕК №${parseInt(router.query.idx)+1}`, align: 'left'},
                                                {message: `Дата: ${pdDDMMYYHHMM(syncData.date)}`, align: 'left'},
                                                {message: `Касса: ${data.object.name}`, align: 'left'},
                                                {message: data.object.legalObject.name, align: 'left'},
                                                {message: data.object.branch.name, align: 'left'},
                                                {message: data.object.branch.address, align: 'left'},
                                                {message: `ИНН: ${data.object.legalObject.inn}`, align: 'left'},
                                                {message: `СНО: ${data.object.legalObject.rateTaxe?data.object.legalObject.rateTaxe:data.object.legalObject.taxSystemName_v2}`, align: 'left'},
                                                {message: `********************************`, align: 'center'},
                                                {message: `Истечение регистрации ФМ: ${pdDDMMYYYY(data.object.fnExpiresAt)}`, align: 'left'},
                                                {message: `Налоговый орган: ${data.object.branch.ugnsName_v2}`, align: 'left'},
                                                {message: `Плательщик НДС: ${data.object.legalObject.vatPayer_v2?'Да':'Нет'}`, align: 'left'},
                                                {message: `Тип: ${data.object.branch.entrepreneurshipObjectName_v2}`, align: 'left'},
                                                {message: `Деятельность: ${data.object.branch.businessActivityName_v2}`, align: 'left'},
                                                {message: `Предметы расчета: ${data.object.branch.calcItemAttributeName_v2}`, align: 'left'},
                                                {message: '***************ФП***************', align: 'center', bold: true},
                                                {message: `РН ККМ: ${data.object.registrationNumber}`, align: 'left'},
                                                {message: `ФМ: ${data.object.fn}`, align: 'left'},
                                                {message: `ФД: ${syncData.fields[1040]}`, align: 'left'},
                                                {message: `ФПД: ${parseInt(syncData.fields[1077], 16)}`, align: 'left'},
                                                {message: '********************************', align: 'center'},
                                                {message: 'ККМ SALYK.STORE v1.1', align: 'center', bold: true},
                                            ]
                                            await printEsPosData(_printer, _data)
                                        }}>
                                            <Bluetooth/>Печать
                                        </Button>
                                        :
                                        null
                                }
                                <Pdf targetRef={receiptRef} filename={`Чек №${data.object.number}`}
                                     options = {{
                                         format: [receiptRef.current.offsetHeight*0.8, receiptRef.current.offsetWidth*0.75]
                                     }}>
                                    {({ toPdf }) => <Button color='primary' onClick={toPdf}>Скачать</Button>}
                                </Pdf>
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
    if(!['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    let object = await getCashbox({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)
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
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);