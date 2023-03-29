import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as snackbarActions from '../../redux/actions/snackbar'
import Button from '@material-ui/core/Button';
import dialogContentStyle from '../../src/styleMUI/dialogContent'
import { checkFloat, inputFloat } from '../../src/lib';
import { addSale } from '../../src/gql/sale';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import * as appActions from '../../redux/actions/app'

const BuyBasket =  React.memo(
    (props) =>{
        const { isMobileApp } = props.app;
        const { profile } = props.user;
        let { classes, client, amountStart, _setComment, cashbox, allNsp, allNds, items, type, usedPrepayment, sale, setItems, setType, setClient, setSale, setAllAmount } = props;
        //при возврате кредита минусуем долг
        const { consignation } = props;
        const { showLoad } = props.appActions;
        const { showMiniDialog } = props.mini_dialogActions;
        const { showSnackBar } = props.snackbarActions;
        const width = isMobileApp? (window.innerWidth-112) : 500
        let [typePayment, setTypePayment] = useState('Наличными');
        let [res, setRes] = useState(undefined);
        let [amountEnd, setAmountEnd] = useState(amountStart);
        let [paid, setPaid] = useState(0);
        let [comment, setComment] = useState('');
        let [commentShow, setCommentShow] = useState(false);
        let [change, setChange] = useState('');
        useEffect(() => {
            amountEnd = checkFloat(amountStart - consignation)
            setAmountEnd(amountEnd)
            if (typePayment === 'Безналичный')
                paid = amountEnd
            else
                paid = Math.ceil(amountEnd)
            change = (checkFloat(paid)+('Продажа'===type?usedPrepayment:0)) - amountEnd
            if(change<0)
                change = Math.ceil(change*-1)*-1
            else
                change = parseInt(change)
            setChange(change)
            setPaid(paid)
        }, [typePayment]);
        return (
            <div className={classes.main} style={{width}}>
                {
                    !res?
                        <>
                        {
                            ['Возврат продажи', 'Продажа', 'Возврат покупки'].includes(type)?
                                <>
                                {
                                    sale&&sale.returned?
                                        <div className={classes.row} style={{color: 'red'}}>
                                            <div className={classes.value}>На операцию оформлен возврат</div>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    sale&&sale.used&&sale.type==='Аванс'?
                                        <div className={classes.row} style={{color: 'red'}}>
                                            <div className={classes.value}>Аванс был использован</div>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    consignation?
                                        <div className={classes.row} style={{color: 'red'}}>
                                            <div className={classes.nameField}>{'Продажа'===type?'Текущий кредит':'Кредит'}:&nbsp;</div>
                                            <div className={classes.value}>{` ${consignation} сом`}</div>
                                        </div>
                                        :
                                        null
                                }
                                </>
                                :
                                null
                        }
                        <div className={classes.row}>
                            <div className={classes.nameField}>Итого:&nbsp;</div>
                            <div className={classes.value}>{` ${amountEnd} сом`}</div>
                        </div>
                        <div className={classes.row}>
                            <center className={classes.input}>
                                <Button onClick={() => {setTypePayment('Наличными')}} style={{color: typePayment!=='Наличными'?'#A0A0A0':'#10183D'}}>
                                    Наличными
                                </Button>
                            </center>
                            <center className={classes.input}>
                                <Button onClick={() => {setTypePayment('Безналичный')}} style={{color: typePayment!=='Безналичный'?'#A0A0A0':'#10183D'}}>
                                    Безналичный
                                </Button>
                            </center>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>Оплачено:&nbsp;</div>
                            <div className={classes.counter}>
                                <div className={classes.counterbtn} onClick={() => {
                                    paid = checkFloat(paid - 5)
                                    if(paid<0)
                                        paid = 0
                                    change = (checkFloat(paid)+('Продажа'===type?usedPrepayment:0)) - amountEnd
                                    if(change<0)
                                        change = Math.ceil(change*-1)*-1
                                    else
                                        change = parseInt(change)
                                    setChange(change)
                                    setPaid(paid)
                                }}>–</div>
                                <input
                                    type={isMobileApp?'number':'text'}
                                    className={classes.counternmbr}
                                    value={paid}
                                    onChange={(event) => {
                                        paid = inputFloat(event.target.value)
                                        change = (checkFloat(paid)+('Продажа'===type?usedPrepayment:0)) - amountEnd
                                        if(change<0)
                                            change = Math.ceil(change*-1)*-1
                                        else
                                            change = parseInt(change)
                                        setChange(change)
                                        setPaid(paid)
                                    }}
                                    onFocus={()=>{
                                        paid = inputFloat('')
                                        change = (checkFloat(paid)+('Продажа'===type?usedPrepayment:0)) - amountEnd
                                        if(change<0)
                                            change = Math.ceil(change*-1)*-1
                                        else
                                            change = parseInt(change)
                                        setChange(change)
                                        setPaid(paid)
                                    }}
                                />
                                <div className={classes.counterbtn} onClick={() => {
                                    paid = checkFloat(checkFloat(paid) + 5)
                                    change = (checkFloat(paid)+('Продажа'===type?usedPrepayment:0)) - amountEnd
                                    if(change<0)
                                        change = Math.ceil(change*-1)*-1
                                    else
                                        change = parseInt(change)
                                    setChange(change)
                                    setPaid(paid)
                                }}>+
                                </div>
                            </div>
                            <div className={classes.typeShow}>
                                сом
                            </div>
                        </div>
                        {
                            usedPrepayment&&'Продажа'===type?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Аванс:&nbsp;</div>
                                    <div className={classes.value}>{` ${usedPrepayment} сом`}</div>
                                </div>
                                :
                                null
                        }
                        {
                            change<0?
                                <div className={classes.row}>
                                    <b style={{color: 'red'}}>{
                                        ['Аванс', 'Погашение кредита', 'Покупка', 'Возврат продажи', 'Возврат покупки', 'Возврат аванса'].includes(type)||!profile.credit?
                                            'Оплата слишком мала'
                                            :
                                            'Оплата слишком мала'/*/КРЕДИТ/`Кредит: ${change*-1} сома`*/
                                    }</b>
                                </div>
                                :
                                <div className={classes.row}>
                                    <div className={classes.nameField}>Сдача:&nbsp;</div>
                                    <div className={classes.value}>{` ${change} сом`}</div>
                                </div>
                        }
                        {
                            commentShow?
                                <TextField
                                    label='Комментарий (не обязательно)'
                                    style={{width}}
                                    className={classes.textField}
                                    margin='normal'
                                    value={comment}
                                    onChange={(event)=>{setComment(event.target.value)}}
                                />
                                :
                                <Button color='primary' onClick={()=>{setCommentShow(true);}} className={classes.button}>
                                    Добавить комментарий
                                </Button>
                        }
                        <br/>
                        <div>
                            <Button variant='contained' color='primary' onClick={async()=>{
                                showLoad(true)
                                if(typePayment==='Наличными'&&['Покупка', 'Возврат аванса', 'Возврат продажи'].includes(type)&&paid>cashbox.cash)
                                    showSnackBar('Наличных в кассе недостаточно, внесите нужную сумму')
                                else {
                                    if(/*/КРЕДИТ/!profile.credit&&*/change<0) {
                                        showMiniDialog(false)
                                        showSnackBar(/*/КРЕДИТ/'Кредит не разрешен'*/'Оплата слишком мала')
                                    }
                                    else {
                                        if (change<0&&['Аванс', 'Погашение кредита', 'Покупка', 'Возврат продажи', 'Возврат покупки', 'Возврат аванса'].includes(type) || amountEnd<0 || paid<0)
                                            showSnackBar('Сумма слишком мала')
                                        else {
                                            let discountAll = 0, extraAll = 0
                                            for (let i = 0; i < items.length; i++) {
                                                let discount = checkFloat(items[i].discount)
                                                if(items[i].discountType==='%') {
                                                    discount = checkFloat(items[i].amountStart/100*items[i].discount)
                                                }
                                                discountAll = checkFloat(discountAll + discount)
                                                let extra = checkFloat(items[i].extra)
                                                if(items[i].extraType==='%') {
                                                    extra = checkFloat(items[i].amountStart/100*items[i].extra)
                                                }
                                                extraAll = checkFloat(extraAll + extra)
                                                items[i] = {
                                                    name: items[i].name,
                                                    unit: items[i].unit,
                                                    count: checkFloat(items[i].count),
                                                    price: checkFloat(items[i].price),
                                                    discount,
                                                    extra,
                                                    amountStart: checkFloat(items[i].amountStart),
                                                    amountEnd: checkFloat(items[i].amountEnd),
                                                    tnved: items[i].tnved,
                                                    mark: items[i].mark,
                                                    ndsPrecent: checkFloat(items[i].ndsPrecent),
                                                    nds: checkFloat(items[i].nds),
                                                    nspPrecent: checkFloat(items[i].nspPrecent),
                                                    nsp: checkFloat(items[i].nsp),
                                                }
                                            }
                                            let res = await addSale({
                                                client: client?client._id:client,
                                                sale: sale?sale._id:sale,
                                                typePayment,
                                                type: change<0?'Кредит':type,
                                                paid: checkFloat(paid),
                                                change: change<0?0:change,
                                                extra: extraAll,
                                                discount: discountAll,
                                                items,
                                                amountEnd,
                                                usedPrepayment: 'Продажа'===type?usedPrepayment:0,
                                                comment,
                                                nds: checkFloat(allNds),
                                                nsp: checkFloat(allNsp)
                                            })
                                            if(res){
                                                setRes(res)
                                                if(setItems)
                                                    setItems([])
                                                if(setType)
                                                    setType('Продажа')
                                                if(setClient)
                                                    setClient(undefined)
                                                if(setSale)
                                                    setSale(undefined)
                                                if(_setComment)
                                                    _setComment('')
                                                if(setAllAmount)
                                                    setAllAmount('')
                                            }
                                            else
                                                showSnackBar('Ошибка', 'error')
                                        }
                                    }
                                }
                                showLoad(false)
                            }} className={classes.button}>
                                Оплатить
                            </Button>
                            <Button variant='contained' color='secondary' onClick={()=>{showMiniDialog(false);}} className={classes.button}>
                                Закрыть
                            </Button>
                        </div>
                        </>
                        :
                        <div>
                            <Link href='/sale/[id]' as={`/sale/${res}`}>
                                <Button variant='contained' color='primary' className={classes.button}>
                                    Чек
                                </Button>
                            </Link>
                            <Button variant='contained' color='primary' onClick={()=>{showMiniDialog(false);}} className={classes.button}>
                                Касса
                            </Button>
                        </div>
                }
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }
}

BuyBasket.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dialogContentStyle)(BuyBasket));