import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import cardWorkshiftStyle from '../src/styleMUI/card'
import { connect } from 'react-redux'
import Link from 'next/link';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import { pdDDMMYYHHMM } from '../src/lib'
import Button from '@material-ui/core/Button';
import Confirmation from './dialog/Confirmation'
import SetFloat from './dialog/SetFloat'
import {_setWorkShift, endWorkShift} from '../src/gql/workShift'
import * as snackbarActions from '../redux/actions/snackbar';
import Router from 'next/router'
import {generateReportX} from '../src/gql/report'
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';

const CardWorkshift = React.memo((props) => {
    const { element, setList } = props;
    const { profile } = props.user;
    const classes = cardWorkshiftStyle();
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { showSnackBar } = props.snackbarActions;
    const { isMobileApp } = props.app;
    let [deposit, setDeposit] = useState(element?element.deposit:0);
    let [withdraw, setWithdraw] = useState(element?element.withdraw:0);
    let [cashEnd, setCashEnd] = useState(element?element.cashEnd:0);
    useEffect(()=>{
        if(element.needDeposit) {
            element.needDeposit = false
            setList([element])
            setMiniDialog('Внести', <SetFloat action={async (float, comment)=>{
                if(float>0) {
                    let res = await _setWorkShift({deposit: float, comment, withdraw: 0})
                    if(res==='OK') {
                        setDeposit(deposit + float)
                        setCashEnd(cashEnd + float)
                    }
                }
                else
                    showSnackBar('Сумма слишком мала')
            }}/>)
            showMiniDialog(true)
        }
    },[])
    return (
        <Card className={isMobileApp?classes.cardM:classes.cardD}>
            {
                ['admin', 'superadmin', 'оператор'].includes(profile.role)?
                    element.sync?
                        <SyncOn color={element.syncMsg==='Фискальный режим отключен'?'secondary':'primary'} className={classes.sync}/>
                        :
                        <SyncOff color='secondary' className={classes.sync}/>
                    :
                    null
            }
            <Link href='/workshift/[id]' as={`/workshift/${element._id}`}>
                <CardActionArea>
                    <CardContent>
                        {
                            !element.end?
                                <div className={classes.status} style={{background: element.expired?'red':'green'}}>{element.expired?'Cмена просрочена':'Работает'}</div>
                                :
                                null
                        }
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Номер:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.number}
                            </div>
                        </div>
                        {
                            ['admin', 'superadmin'].includes(profile.role)?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Налогоплательщик:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.legalObject.name}
                                    </div>
                                </div>
                                :
                                null
                        }
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Объект:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.branch.name}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Касса:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.cashbox.name}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Кассир:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.cashier.name}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Начало:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {pdDDMMYYHHMM(element.start)}
                            </div>
                        </div>
                        {
                            element.end?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Конец:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {pdDDMMYYHHMM(element.end)}
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            cashEnd?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Наличных в кассе:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {cashEnd.toFixed(2)} сом
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            deposit?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Внесено:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {deposit.toFixed(2)} сом
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            withdraw?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Изъято:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {withdraw.toFixed(2)} сом
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.cash?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Наличными:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.cash.toFixed(2)} сом
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.cashless ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Безналичными:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.cashless.toFixed(2)} сом
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.discount ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Скидки:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.discount.toFixed(2)} сом
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.extra ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Наценки:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.extra.toFixed(2)} сом
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.saleCount||element.sale ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Продажа:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.sale.toFixed(2)} сом | {element.saleCount} шт
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.returnedCount||element.returned ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Возврат:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.returned.toFixed(2)} сом | {element.returnedCount} шт
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.consignationCount||element.consignation?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Кредит:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.consignation.toFixed(2)} сом | {element.consignationCount} шт
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.paidConsignation||element.paidConsignationCount ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Погашение кредита:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.paidConsignation.toFixed(2)} сом | {element.paidConsignationCount} шт
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.prepayment||element.prepaymentCount ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Аванс:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.prepayment.toFixed(2)} сом | {element.prepaymentCount} шт
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.buy||element.buyCount ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Покупка:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.buy.toFixed(2)} сом | {element.buyCount} шт
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            element.returnedBuy||element.returnedBuyCount ?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Возврат покупки:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.returnedBuy.toFixed(2)} сом | {element.returnedBuyCount} шт
                                    </div>
                                </div>
                                :
                                null
                        }
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                {
                    element!==undefined&&!element.end?
                        <>
                        <div style={{width: '100%'}}>
                            <div className={classes.row}>
                                {
                                    !element.expired?
                                        <>
                                        {
                                            profile.role==='кассир'?
                                                <>
                                                <Button color='primary' onClick={()=>{
                                                    setMiniDialog('Внести', <SetFloat action={async (float, comment)=>{
                                                        if(float>0) {
                                                            let res = await _setWorkShift({deposit: float, comment, withdraw: 0})
                                                            if(res==='OK') {
                                                                setDeposit(deposit + float)
                                                                setCashEnd(cashEnd + float)
                                                            }
                                                        }
                                                        else
                                                            showSnackBar('Сумма слишком мала')
                                                    }}/>)
                                                    showMiniDialog(true)
                                                }}>
                                                    Внести
                                                </Button>
                                                {
                                                    cashEnd>0?
                                                        <Button color='primary' onClick={()=>{
                                                            setMiniDialog('Изъять', <SetFloat action={async (float, comment)=>{
                                                                if(float>0&&float<=cashEnd) {
                                                                    let res = await _setWorkShift({deposit: 0, comment, withdraw: float})
                                                                    if(res==='OK') {
                                                                        setWithdraw(withdraw + float)
                                                                        setCashEnd(cashEnd - float)
                                                                    }
                                                                }
                                                                else if(float<1)
                                                                    showSnackBar('Сумма слишком мала')
                                                                else
                                                                    showSnackBar('Сумма слишком велика')
                                                            }}/>)
                                                            showMiniDialog(true)
                                                        }}>
                                                            Изъять
                                                        </Button>
                                                        :
                                                        null
                                                }
                                                </>
                                                :
                                                null
                                        }
                                        {
                                            profile.role!=='admin'||profile.add?
                                                <Button color='primary' onClick={async()=>{
                                                    Router.push(`/report/${await generateReportX({cashbox: element.cashbox._id})}?type=X`)
                                                    /*const action = () => {
                                                    }
                                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                    showMiniDialog(true)*/
                                                }}>
                                                    X-Отчет
                                                </Button>
                                                :
                                                null
                                        }
                                        </>
                                        :
                                        null
                                }
                                {
                                    profile.role!=='admin'||profile.add||element.expired?
                                        <Button color='secondary' onClick={()=>{
                                            const action = async() => {
                                                let res = await _setWorkShift({deposit: 0, comment: 'Закрытие смены', withdraw: cashEnd})
                                                if(res==='OK') {
                                                    let report = await endWorkShift(...['управляющий', 'супервайзер', 'admin', 'superadmin'].includes(profile.role)?[element._id]:[])
                                                    Router.push(`/report/${report}?type=Z`)
                                                }
                                            }
                                            setMiniDialog('Закрыть смену и обнулить кассу?', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        }}>
                                            Закрыть смену
                                        </Button>
                                        :
                                        null
                                }
                            </div>
                            {
                                profile.role==='кассир'&&!element.expired?
                                    <center>
                                        <Link href='/salenew'>
                                            <Button variant='outlined' color='primary' style={{width: '100%', marginTop: 10}}>
                                                Совершить операцию
                                            </Button>
                                        </Link>
                                    </center>
                                    :
                                    null
                            }
                        </div>
                        <br/>
                        </>
                    :
                    null
                }
            </CardActions>
        </Card>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardWorkshift)