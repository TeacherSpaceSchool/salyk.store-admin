import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, { useState } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getCashbox, _setCashbox, addCashbox, deleteCashbox} from '../../src/gql/cashbox'
import {generateReportX} from '../../src/gql/report'
import {getLegalObjects} from '../../src/gql/legalObject'
import {getFns} from '../../src/gql/kkm-2.0'
import cashboxStyle from '../../src/styleMUI/list'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { useRouter } from 'next/router'
import Router from 'next/router'
import * as userActions from '../../redux/actions/user'
import * as snackbarActions from '../../redux/actions/snackbar'
import * as appActions from '../../redux/actions/app'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../../components/dialog/Confirmation'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { pdDDMMYYHHMM, pdDDMMYYYY } from '../../src/lib'
import AutocomplectOnline from '../../components/app/AutocomplectOnline'
import {getBranchs} from '../../src/gql/branch';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import History from '../../components/dialog/History';
import SetFn from '../../components/dialog/SetFn';
import HistoryIcon from '@material-ui/icons/History';
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import ViewText from '../../components/dialog/ViewText';

const Cashbox = React.memo((props) => {
    const classes = cashboxStyle();
    const { data } = props;
    const { isMobileApp } = props.app;
    const { profile } = props.user;
    const { showSnackBar } = props.snackbarActions;
    const { setCashbox } = props.appActions;
    let [name, setName] = useState(data.object?data.object.name:'');
    let [fn, setFn] = useState(data.object&&data.object.fn?data.object.fn:'');
    let [legalObject, setLegalObject] = useState(data.object?data.object.legalObject:undefined);
    let [branch, setBranch] = useState(data.object?data.object.branch:undefined);
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const router = useRouter()
    const [anchorElQuick, setAnchorElQuick] = useState(null);
    const openQuick = Boolean(anchorElQuick);
    let handleMenuQuick = (event) => {
        setAnchorElQuick(event.currentTarget);
    }
    let handleCloseQuick = () => {
        setAnchorElQuick(null);
    }
    const [anchorElReport, setAnchorElReport] = useState(null);
    const openReport = Boolean(anchorElReport);
    let handleMenuReport = (event) => {
        setAnchorElReport(event.currentTarget);
    }
    let handleCloseReport = () => {
        setAnchorElReport(null);
    }
    return (
        <App pageName={data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'}>
            <Head>
                <title>{data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'}</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content={data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'} />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/cashbox/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/cashbox/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                {
                    data.object&&data.object._id?
                        <div className={classes.status}>
                            {
                                router.query.id!=='new'&&profile.role!=='оператор'?
                                    <>
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
                                        <Link href='/workshifts/[id]' as={`/workshifts/${legalObject._id}`}>
                                            <MenuItem onClick={()=>{setCashbox({_id: router.query.id, name})}}>
                                                Смены
                                            </MenuItem>
                                        </Link>
                                        <Link href='/sales/[id]' as={`/sales/${legalObject._id}`}>
                                            <MenuItem onClick={()=>{setCashbox({_id: router.query.id, name})}}>
                                                Операции
                                            </MenuItem>
                                        </Link>
                                        <Link href='/deposithistorys/[id]' as={`/deposithistorys/${legalObject._id}`}>
                                            <MenuItem onClick={()=>{setCashbox({_id: router.query.id, name})}}>
                                                Внесения
                                            </MenuItem>
                                        </Link>
                                        <Link href='/withdrawhistorys/[id]' as={`/withdrawhistorys/${legalObject._id}`}>
                                            <MenuItem onClick={()=>{setCashbox({_id: router.query.id, name})}}>
                                                Изъятия
                                            </MenuItem>
                                        </Link>
                                        <Link href={{pathname: '/reports/[id]', query: {type: 'X'}}} as={`/reports/${legalObject._id}?type=X`}>
                                            <MenuItem onClick={()=>{setCashbox({_id: router.query.id, name})}}>
                                                X-Отчет
                                            </MenuItem>
                                        </Link>
                                        <Link href={{pathname: '/reports/[id]', query: {type: 'Z'}}} as={`/reports/${legalObject._id}?type=Z`}>
                                            <MenuItem onClick={()=>{setCashbox({_id: router.query.id, name})}}>
                                                Z-Отчет
                                            </MenuItem>
                                        </Link>
                                    </Menu>
                                    <Button onClick={handleMenuQuick} color='primary'>
                                        Переходы
                                    </Button>
                                    </>
                                    :
                                    null
                            }
                            {
                                data.object.presentCashier?
                                    <div className={classes.status} style={{background: 'green', position: 'initial'}}>Работает</div>
                                    :
                                    null
                            }
                            {
                                ['admin', 'superadmin', 'оператор'].includes(profile.role)?
                                    data.object.sync?
                                        <SyncOn color='primary' onClick={async()=>{
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
                                    :
                                    null
                            }
                            {
                                ['admin', 'superadmin'].includes(profile.role)&&profile.statistic?
                                    <HistoryIcon onClick={async()=>{
                                        setMiniDialog('История', <History where={data.object._id}/>)
                                        showMiniDialog(true)
                                    }} style={{ color: '#10183D'}}/>
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                    <br/>
                {
                    data.object!==null?
                        <>
                        {['admin', 'superadmin', 'оператор'].includes(profile.role)?
                            <>
                            {
                                data.object.createdAt&&'оператор'!==profile.role?
                                    <div className={classes.row}>
                                        <div className={classes.nameField}>
                                            Регистрация:&nbsp;
                                        </div>
                                        <div className={classes.value}>
                                            {pdDDMMYYHHMM(data.object.createdAt)}
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {
                                router.query.id==='new'?
                                    <AutocomplectOnline
                                        error={!legalObject}
                                        setElement={(legalObject)=>{
                                            setFn('')
                                            setLegalObject(legalObject)
                                        }}
                                        getElements={async (search)=>{return await getLegalObjects({search})}}
                                        label={'налогоплательщика'}
                                    />
                                    :
                                    <Link href='/legalobject/[id]' as={`/legalobject/${legalObject._id}`}>
                                        <a>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Налогоплательщик:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {data.object.legalObject.name}
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                            }
                            </>
                            :
                            null
                        }
                        {
                            legalObject&&!data.object.fn?
                                <TextField
                                    label='Номер ФМ'
                                    error={!fn}
                                    value={fn}
                                    className={classes.input}
                                    onClick={async ()=>{
                                        let fns = await getFns(legalObject._id)
                                        fns = fns.filter(fn=>fn.status==='FREE')
                                        setMiniDialog('Номер ФМ', <SetFn _id={legalObject._id} fns={fns} setFn={setFn}/>)
                                        showMiniDialog(true)
                                    }}
                                    inputProps = {{
                                        readOnly: true
                                    }}
                                />
                                :
                                null
                        }
                        {
                            data.object.fn?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Номер ФМ:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.fn}
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            data.object.registrationNumber?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Номер регистрации:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.registrationNumber}
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            data.object.fnExpiresAt?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Истечение регистрации ФМ:&nbsp;
                                    </div>
                                    <div className={classes.value} style={{color: data.object.fnWork?'green':'red'}}>
                                        {pdDDMMYYYY(data.object.fnExpiresAt)}
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            data.object.rnmNumber?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        РНМ:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.rnmNumber}
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            router.query.id!=='new'?
                                <div className={classes.row} onClick={() => {
                                    if(['admin', 'superadmin', 'оператор'].includes(profile.role)&&profile.add)
                                        Router.push('/payment/new')
                                }}>
                                    <div className={classes.nameField}>
                                        Оплачен до:&nbsp;
                                    </div>
                                    <div className={classes.value} style={{color: data.object.paidWork?'green':'red'}}>
                                        {data.object.endPayment?pdDDMMYYHHMM(data.object.endPayment):'не оплачен'}
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            legalObject&&legalObject._id?
                                profile.add?
                                    <AutocomplectOnline
                                        error={!branch}
                                        defaultValue={data.object.branch}
                                        setElement={setBranch}
                                        getElements={async (search)=>{return await getBranchs({search, legalObject: legalObject._id})}}
                                        label={'объект'}
                                        minLength={0}
                                    />
                                    :
                                    branch?
                                        <Link href='/branch/[id]' as={`/branch/${branch._id}`}>
                                            <a>
                                                <div className={classes.row}>
                                                    <div className={classes.nameField}>
                                                        Объект:&nbsp;
                                                    </div>
                                                    <div className={classes.value}>
                                                        {branch.name}
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                        :
                                        null
                                :
                                null
                        }
                        {
                            profile.add?
                                <TextField
                                    label='Название'
                                    error={!name}
                                    value={name}
                                    className={classes.input}
                                    onChange={(event)=>{setName(event.target.value)}}
                                />
                                :
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Название:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {name}
                                    </div>
                                </div>
                        }
                        {
                            router.query.id!=='new'?
                                <>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Наличными:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.cash} сом
                                    </div>
                                </div>
                                {
                                    data.object.presentCashier?
                                        <div className={classes.row}>
                                            <div className={classes.nameField}>
                                                Кассир:&nbsp;
                                            </div>
                                            <Link key={data.object.presentCashier._id} href='/user/[id]' as={`/user/${data.object.presentCashier._id}`}>
                                                <a>
                                                    <div className={classes.value}>
                                                        {data.object.presentCashier.name}
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                        :
                                        null
                                }
                                </>
                                :
                                null
                        }
                        <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                            {
                                router.query.id!=='new'&&data.object.syncData&&data.object.fnExpiresAt?
                                    <>
                                    <Menu
                                        key='Report'
                                        id='menu-appbar'
                                        anchorEl={anchorElReport}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        open={openReport}
                                        onClose={handleCloseReport}
                                    >
                                        {data.object.syncData.map((element, idx)=>
                                            <Link href={{pathname: '/cashbox/receipt/[id]', query: {idx: idx}}} as={`/cashbox/receipt/${router.query.id}?idx=${idx}`}>
                                                <MenuItem key={`syncData${idx}`}>{
                                                    element[0]==='registerCashbox'?
                                                        `Регистрация №${idx+1}`
                                                        :
                                                        element[0]==='reregisterCashbox'?
                                                            `Перерегистрация №${idx+1}`
                                                            :
                                                            `Закрытие №${idx+1}`
                                                }</MenuItem>
                                            </Link>
                                        )}
                                    </Menu>
                                    <Button color='primary' onClick={handleMenuReport}>
                                        Чеки
                                    </Button>
                                    </>
                                    :
                                    null
                            }
                            {
                                !data.object.del?
                                    <>
                                    {
                                        router.query.id!=='new'&&data.object.presentCashier&&(['управляющий', 'супервайзер'].includes(profile.role)||['admin', 'superadmin'].includes(profile.role)&&profile.add)?
                                            <Button color='primary' onClick={async()=>{
                                                let report = await generateReportX({cashbox: router.query.id})
                                                if(report)
                                                    Router.push(`/report/${report}?type=X`)
                                                else
                                                    showSnackBar('Смена просрочена', 'error')
                                                /*const action = async() => {
                                                }
                                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                showMiniDialog(true)*/
                                            }}>
                                                Х-Отчет
                                            </Button>
                                            :
                                            null
                                    }
                                    {
                                        profile.add?
                                            <Button color='primary' onClick={()=>{
                                                if(name.length&&legalObject&&branch&&fn) {
                                                    const action = async() => {
                                                        if(router.query.id==='new') {
                                                            let res = await addCashbox({fn, name, legalObject: legalObject._id, branch: branch._id})
                                                            Router.push(`/cashbox/${res}`)
                                                            showSnackBar('Успешно', 'success')
                                                        }
                                                        else {
                                                            let element = {_id: router.query.id}
                                                            if (name!==data.object.name) element.name = name
                                                            if (branch._id!==data.object.branch._id) element.branch = branch._id
                                                            await _setCashbox(element)
                                                            Router.reload()
                                                        }
                                                    }
                                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                    showMiniDialog(true)
                                                } else
                                                    showSnackBar('Заполните все поля')
                                            }}>
                                                Сохранить
                                            </Button>
                                            :
                                            null
                                    }
                                    {
                                        ['admin', 'superadmin'].includes(profile.role)&&router.query.id!=='new'&&!data.object.presentCashier&&profile.add?
                                            <Button color='secondary' onClick={()=>{
                                                const action = async() => {
                                                    let res = await deleteCashbox(router.query.id)
                                                    if(res==='OK')
                                                        Router.push(`/cashboxes/${legalObject._id}`)
                                                    else
                                                        showSnackBar('Ошибка', 'error')
                                                }
                                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            }}>
                                                Удалить
                                            </Button>
                                            :
                                            null
                                    }
                                    </>
                                    :
                                    null
                            }
                        </div>
                        </>
                        :
                        'Ничего не найдено'
                }
                </CardContent>
            </Card>
        </App>
    )
})

Cashbox.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            object:ctx.query.id!=='new'?await getCashbox({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined):
                {name: '', legalObject: undefined, branch: undefined, fn: ''}
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
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cashbox);