import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, {useRef, useState, useEffect} from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getReport} from '../../src/gql/report'
import reportStyle from '../../src/styleMUI/list'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as appActions from '../../redux/actions/app'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { pdDDMMYYHHMM } from '../../src/lib'
import Button from '@material-ui/core/Button';
import { connectPrinterByBluetooth, printEsPosData } from '../../src/printer'
import dynamic from 'next/dynamic'
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import ViewText from '../../components/dialog/ViewText';
import Link from 'next/link';
import Bluetooth from '@material-ui/icons/Bluetooth';
import Print from '@material-ui/icons/Print';
const Pdf = dynamic(import('react-to-pdf'), { ssr: false });

const Receipt = React.memo((props) => {
    const classes = reportStyle();
    const { data } = props;
    const { isMobileApp, printer } = props.app;
    const { profile } = props.user;
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { setPrinter } = props.appActions;
    const router = useRouter()
    const receiptRef = useRef(null);
    let [syncData] = useState(
        data.object?
            data.object.syncData?
                JSON.parse(data.object.syncData)
                :
                data.object.cashbox.registrationNumber?
                    {fields: {1037: data.object.cashbox.registrationNumber, 1041: data.object.cashbox.fn}}
                    :
                    null
            :
            null
    );
    let [readyPrint, setReadyPrint] = useState(data.list);
    useEffect(() => {
        setReadyPrint(process.browser&&receiptRef.current&&data.object)
    }, [process.browser, receiptRef.current]);
    return (
        <App pageName={data.object!==null?`${data.object.type}-ОТЧЕТ №${data.object.number}`:'Ничего не найдено'}>
            <Head>
                <title>{data.object!==null?`${data.object.type}-ОТЧЕТ №${data.object.number}`:'Ничего не найдено'}</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content={data.object!==null?`${data.object.type}-ОТЧЕТ №${data.object.number}`:'Ничего не найдено'} />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/report/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/report/${router.query.id}`}/>
            </Head>
            {
                ['admin', 'superadmin', 'оператор'].includes(profile.role)&&data.object&&data.object._id&&data.object.type==='Z'?
                    <div className={classes.status}>
                        {
                            data.object.sync?
                                <SyncOn color={data.object.syncMsg==='Фискальный режим отключен'?'secondary':'primary'} onClick={async()=>{
                                    if(profile.statistic) {
                                        setMiniDialog('Синхронизация', <ViewText text={data.object.syncMsg}/>)
                                        showMiniDialog(true)
                                    }
                                }} className={classes.sync}/>
                                :
                                <SyncOff color='secondary' onClick={async()=>{
                                    if(profile.statistic) {
                                        setMiniDialog('Синхронизация', <ViewText text={data.object.syncMsg}/>)
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
                                <h3 style={{textAlign: 'center', marginBottom: 10, marginTop: 10}}>{data.object.type}-ОТЧЕТ</h3>
                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Дата: {`${pdDDMMYYHHMM(data.object.start)}${data.object.end?` - ${pdDDMMYYHHMM(data.object.end)}`:''}`}</span></div>
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
                                        <Link href='/workshift/[id]' as={`/workshift/${data.object.workShift._id}`}>
                                            <a>
                                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Смена №{data.object.workShift.number}</span></div>
                                            </a>
                                        </Link>
                                        :
                                        <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Смена №{data.object.workShift.number}</span></div>
                                }
                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>Документ №{data.object.number}</span></div>
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
                                <div style={{textAlign: 'left', marginBottom: 5}}><span style={{fontWeight: 400}}>СНО: {data.object.legalObject.rateTaxe?data.object.legalObject.rateTaxe:data.object.legalObject.taxSystemName_v2}</span></div>
                                <div style={{textAlign: 'center', height: 12, marginTop: 10, marginBottom: 10}}>**********************************************</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Наличных в кассе</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {data.object.cashEnd.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Внесено</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {data.object.deposit.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Изъято</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {data.object.withdraw.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Наличными</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {data.object.cash.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Безналичными</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {data.object.cashless.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Итоговая сумма</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {(data.object.cashless+data.object.cash).toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Скидка</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {data.object.discount.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Наценка</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Сумма: {data.object.extra.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Продажа</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Чеков: {data.object.saleCount} | Сумма: {data.object.sale.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Возврат</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Чеков: {data.object.returnedCount} | Сумма: {data.object.returned.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Покупка</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Чеков: {data.object.buyCount} | Сумма: {data.object.buy.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Возврат покупки</div>
                                <div style={{textAlign: 'left', marginBottom: 5}}>Чеков: {data.object.returnedBuyCount} | Сумма: {data.object.returnedBuy.toFixed(2)}</div>
                                {/*<div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Кредит</div>
                                <div style={{textAlign: 'right', marginBottom: 5}}>Чеков: {data.object.consignationCount} | Сумма: {data.object.consignation.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Погашение кредита</div>
                                <div style={{textAlign: 'right', marginBottom: 5}}>Чеков: {data.object.paidConsignationCount} | Сумма: {data.object.paidConsignation.toFixed(2)}</div>
                                <div style={{textAlign: 'left', marginBottom: 5, fontWeight: 500}}>Аванс</div>
                                <div style={{textAlign: 'right', marginBottom: 5}}>Чеков: {data.object.prepaymentCount} | Сумма: {data.object.prepayment.toFixed(2)}</div>*/}
                                {
                                    data.object.syncMsg!=='Фискальный режим отключен'?
                                        <>
                                            <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>*********************ФП*********************</span></p>
                                            {
                                                syncData?
                                                    <>
                                                        <div style={{textAlign: 'right', marginBottom: 5}}>РН ККМ: {syncData.fields[1037]}</div>
                                                        <div style={{textAlign: 'right', marginBottom: 5}}>ФМ: {syncData.fields[1041]}</div>
                                                        {
                                                            syncData.fields[1040]?
                                                                <div style={{textAlign: 'right', marginBottom: 5}}>ФД: {syncData.fields[1040]}</div>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            syncData.fields[1077]?
                                                                <div style={{textAlign: 'right', marginBottom: 5}}>ФПД: {parseInt(syncData.fields[1077], 16)}</div>
                                                                :
                                                                null
                                                        }
                                                        <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>**********************************************</span></p>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </>
                                        :
                                        <p style={{textAlign: 'center'}}><span style={{fontWeight: 400}}>**********************************************</span></p>
                                }
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
                                                printWindow.document.write(`<script type="text/javascript">window.onload = function() { window.print(); ${isMobileApp?'setTimeout(window.close, 1000)':'window.close()'}; };</script>`);
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
                                                    _printer = await connectPrinterByBluetooth(isMobileApp)
                                                    setPrinter(_printer)
                                                }
                                                let _data = [
                                                    {message: `${data.object.type}-ОТЧЕТ`, align: 'center', bold: true},
                                                    {message: `Дата: ${`${pdDDMMYYHHMM(data.object.start)}${data.object.end?` - ${pdDDMMYYHHMM(data.object.end)}`:''}`}`, align: 'left'},
                                                    {message: `Касса: ${data.object.cashbox.name}`, align: 'left'},
                                                    {message: `Смена №${data.object.workShift.number}`, align: 'left'},
                                                    {message: `Документ №${data.object.number}`, align: 'left'},
                                                    {message: data.object.legalObject.name, align: 'left'},
                                                    ...data.object.branch?[{message: data.object.branch.name, align: 'left'}]:[],
                                                    ...data.object.branch?[{message: data.object.branch.address, align: 'left'}]:[],
                                                    {message: `ИНН: ${data.object.legalObject.inn}`, align: 'left'},
                                                    {message: `СНО: ${data.object.legalObject.rateTaxe?data.object.legalObject.rateTaxe:data.object.legalObject.taxSystemName_v2}`, align: 'left'},
                                                    {message: '********************************', align: 'center'},
                                                    {message: `Наличных в кассе`, align: 'left'},
                                                    {message: `Сумма: ${data.object.cashEnd.toFixed(2)}`, align: 'left'},
                                                    {message: `Внесено`, align: 'left'},
                                                    {message: `Сумма: ${data.object.deposit.toFixed(2)}`, align: 'left'},
                                                    {message: `Изъято`, align: 'left'},
                                                    {message: `Сумма: ${data.object.withdraw.toFixed(2)}`, align: 'left'},
                                                    {message: `Наличными`, align: 'left'},
                                                    {message: `Сумма: ${data.object.cash.toFixed(2)}`, align: 'left'},
                                                    {message: `Безналичными`, align: 'left'},
                                                    {message: `Сумма: ${data.object.cashless.toFixed(2)}`, align: 'left'},
                                                    {message: `Итоговая сумма`, align: 'left'},
                                                    {message: `Сумма: ${(data.object.cashless+data.object.cash).toFixed(2)}`, align: 'left'},
                                                    {message: `Скидка`, align: 'left'},
                                                    {message: `Сумма: ${data.object.discount.toFixed(2)}`, align: 'left'},
                                                    {message: `Наценка`, align: 'left'},
                                                    {message: `Сумма: ${data.object.extra.toFixed(2)}`, align: 'left'},
                                                    {message: `Продажа`, align: 'left'},
                                                    {message: `Чеков: ${data.object.saleCount} | Сумма: ${data.object.sale.toFixed(2)}`, align: 'left'},
                                                    {message: `Возврат`, align: 'left'},
                                                    {message: `Чеков: ${data.object.returnedCount} | Сумма: ${data.object.returned.toFixed(2)}`, align: 'left'},
                                                    /*{message: `Кредит`, align: 'left'},
                                                    {message: `Чеков: ${data.object.consignationCount} | Сумма: ${data.object.consignation.toFixed(2)}`, align: 'left'},
                                                    {message: `Погашение кредита`, align: 'left'},
                                                    {message: `Чеков: ${data.object.paidConsignationCount} | Сумма: ${data.object.paidConsignation.toFixed(2)}`, align: 'left'},
                                                    {message: `Аванс`, align: 'left'},
                                                    {message: `Чеков: ${data.object.prepaymentCount} | Сумма: ${data.object.prepayment.toFixed(2)}`, align: 'left'},*/
                                                    {message: `Покупка`, align: 'left'},
                                                    {message: `Чеков: ${data.object.buyCount} | Сумма: ${data.object.buy.toFixed(2)}`, align: 'left'},
                                                    {message: `Возврат покупки`, align: 'left'},
                                                    {message: `Чеков: ${data.object.returnedBuyCount} | Сумма: ${data.object.returnedBuy.toFixed(2)}`, align: 'left'}
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
                                                        if(syncData.fields[1040])
                                                            _data.push({
                                                                message: `ФД: ${syncData.fields[1040]}`,
                                                                align: 'right'
                                                            })
                                                        if(syncData.fields[1077])
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
                                                _data.push({message: 'ККМ SALYK.STORE v1.1', align: 'center', bold: true})
                                                printEsPosData(_printer, _data)
                                            }}>
                                                <Bluetooth/>Печать
                                            </Button>
                                            :
                                            null
                                    }
                                    <Pdf targetRef={receiptRef} filename={`${data.object.type}-ОТЧЕТ №${data.object.number}`}
                                         options = {{
                                             format: [receiptRef.current.offsetHeight*0.8, receiptRef.current.offsetWidth*0.75+1]
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
    return {
        data: {
            object: await getReport({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)
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
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);