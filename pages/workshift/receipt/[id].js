import initialApp from '../../../src/initialApp'
import Head from 'next/head';
import React, {useRef, useState, useEffect} from 'react';
import App from '../../../layouts/App';
import { connect } from 'react-redux'
import {getWorkShift} from '../../../src/gql/workShift'
import saleStyle from '../../../src/styleMUI/list'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions/app'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { urlMain } from '../../../redux/constants/other'
import { getClientGqlSsr } from '../../../src/getClientGQL'
import {pdDDMMYYHHMM} from '../../../src/lib'
import { connectPrinterByBluetooth, printEsPosData } from '../../../src/printer'
import Button from '@material-ui/core/Button';
import dynamic from 'next/dynamic'
const Pdf = dynamic(import('react-to-pdf'), { ssr: false });
import Link from 'next/link';
import {taxSystems} from '../../../src/const'

const Receipt = React.memo((props) => {
    const classes = saleStyle();
    const { data } = props;
    const { isMobileApp, printer } = props.app;
    const { profile } = props.user;
    const { setPrinter } = props.appActions;
    const router = useRouter()
    const receiptRef = useRef(null);
    let [syncData] = useState(data.object&&data.object.syncData?JSON.parse(data.object.syncData):null);
    let [readyPrint, setReadyPrint] = useState(data.list);
    useEffect(() => {
        setReadyPrint(process.browser&&receiptRef.current&&data.object)
    }, [process.browser, receiptRef.current]);
    return (
        <App pageName={data.object!==null?`Чек №${data.object.number}`:'Ничего не найдено'}>
            <Head>
                <title>{data.object!==null?`Чек №${data.object.number}`:'Ничего не найдено'}</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content={data.object!==null?`Чек №${data.object.number}`:'Ничего не найдено'} />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/workshift/receipt/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/workshift/receipt/${router.query.id}`}/>
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
                                ['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(profile.role)?
                                    <Link href='/branch/[id]' as={`/branch/${data.object.branch._id}`}>
                                        <a>
                                            <div style={{textAlign: 'center', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.name}, {data.object.branch.address}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'center', marginBottom: 5}}><span style={{fontWeight: 400}}>{data.object.branch.name}, {data.object.branch.address}</span></div>
                            }
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Дата: {pdDDMMYYHHMM(data.object.createdAt)}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Операция: Открытие смены</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>ЧЕК №{data.object.number}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>ИНН: {data.object.legalObject.inn}</span></div>
                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>НР: {data.object.legalObject.rateTaxe?data.object.legalObject.rateTaxe:taxSystems[data.object.legalObject.taxSystem_v2]}</span></div>
                            {
                                ['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(profile.role)?
                                    <Link href='/cashbox/[id]' as={`/cashbox/${data.object.cashbox._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Касса: {data.object.cashbox.name}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Касса: {data.object.cashbox.name}</span></div>
                            }
                            {
                                ['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(profile.role)?
                                    <Link href='/workshift/[id]' as={`/workshift/${data.object._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Смена №{data.object.number}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Смена №{data.object.number}</span></div>
                            }
                            {
                                ['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(profile.role)?
                                    <Link href='/user/[id]' as={`/user/${data.object.cashier._id}`}>
                                        <a>
                                            <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Кассир: {data.object.cashier.name}</span></div>
                                        </a>
                                    </Link>
                                    :
                                    <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Кассир: {data.object.cashier.name}</span></div>
                            }
                            {
                                data.object.syncMsg!=='Фискальный режим отключен'?
                                    <>
                                    <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>*********************ФП*********************</span></p>
                                    {
                                        syncData?
                                            <>
                                            <div style={{textAlign: 'right', marginBottom: 5}}>РН ККМ: {syncData.fields[1037]}</div>
                                            <div style={{textAlign: 'right', marginBottom: 5}}>ФМ: {syncData.fields[1041]}</div>
                                            <div style={{textAlign: 'right', marginBottom: 5}}>ФД: {syncData.fields[1040]}</div>
                                            <div style={{textAlign: 'right', marginBottom: 5}}>ФПД: {parseInt(syncData.fields[1077], 16)}</div>
                                            <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>**********************************************</span></p>
                                            </>
                                            :
                                            null
                                    }
                                    </>
                                    :
                                    <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>**********************************************</span></p>
                            }
                            <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>ККМ SALYK.STORE v1.0</span></p>
                        </div>
                    </center>
                    {
                        readyPrint?
                            <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
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
                                            {message: `Дата: ${pdDDMMYYHHMM(data.object.createdAt)}`, align: 'left'},
                                            {message: 'Операция: Открытие смены', align: 'left'},
                                            {message: `ЧЕК №${data.object.number}`, align: 'left'},
                                            {message: `ИНН: ${data.object.legalObject.inn}`, align: 'left'},
                                            {message: `НР: ${data.object.legalObject.rateTaxe?data.object.legalObject.rateTaxe:taxSystems[data.object.legalObject.taxSystem_v2]}`, align: 'left'},
                                            {message: `Касса: ${data.object.cashbox.name}`, align: 'left'},
                                            {message: `Смена №${data.object.number}`, align: 'left'},
                                            {message: `Кассир: ${data.object.cashier.name}`, align: 'left'},
                                        ]
                                        if(data.object.syncMsg!=='Фискальный режим отключен') {
                                            _data.push({
                                                message: '***************ФП***************',
                                                align: 'center',
                                                bold: true
                                            })
                                            if (syncData) {
                                                _data.push({
                                                    message: `РН ККМ: ${syncData.fields[1037]}`,
                                                    align: 'right'
                                                })
                                                _data.push({
                                                    message: `ФМ: ${syncData.fields[1041]}`,
                                                    align: 'right'
                                                })
                                                _data.push({
                                                    message: `ФД: ${syncData.fields[1040]}`,
                                                    align: 'right'
                                                })
                                                _data.push({
                                                    message: `ФПД: ${parseInt(syncData.fields[1077], 16)}`,
                                                    align: 'right'
                                                })
                                                _data.push({
                                                    message: '********************************',
                                                    align: 'center'
                                                })
                                            }
                                        }
                                        else
                                            _data.push({message: '********************************', align: 'center'})
                                        _data.push({message: 'ККМ SALYK.STORE v1.0', align: 'center', bold: true})
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
                                }}>Печать</Button>
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
    if(!['admin', 'superadmin', 'управляющий', 'кассир', 'супервайзер'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    let object = await getWorkShift({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)
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