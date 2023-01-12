import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getBranch, _setBranch, addBranch, deleteBranch, restoreBranch} from '../../src/gql/branch'
import {getLegalObjects} from '../../src/gql/legalObject'
import branchStyle from '../../src/styleMUI/list'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import { useRouter } from 'next/router'
import MenuItem from '@material-ui/core/MenuItem';
import Router from 'next/router'
import * as userActions from '../../redux/actions/user'
import * as snackbarActions from '../../redux/actions/snackbar'
import * as appActions from '../../redux/actions/app'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../../components/dialog/Confirmation'
import dynamic from 'next/dynamic'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { ugnsTypes, bTypes, pTypes, calcItemAttributes, administrativeAreas } from '../../src/const'
import { pdDDMMYYHHMM, cloneObject } from '../../src/lib'
import AutocomplectOnline from '../../components/app/AutocomplectOnline'
import Menu from '@material-ui/core/Menu';
import Link from 'next/link';
import History from '../../components/dialog/History';
import HistoryIcon from '@material-ui/icons/History';
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import ViewText from '../../components/dialog/ViewText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const Geo = dynamic(import('../../components/dialog/Geo'), { ssr: false });

const Branch = React.memo((props) => {
    const { profile } = props.user;
    const classes = branchStyle();
    const { data } = props;
    const { isMobileApp } = props.app;
    const { showSnackBar } = props.snackbarActions;
    const { setBranch } = props.appActions;
    const initialRender = useRef(true);
    let [name, setName] = useState(data.object?data.object.name:'');
    let [locality, setLocality] = useState(data.object?data.object.locality:'');
    let [postalCode, setPostalCode] = useState(data.object?data.object.postalCode:'-');
    let [route, setRoute] = useState(data.object?data.object.route:'');
    let [streetNumber, setStreetNumber] = useState(data.object?data.object.streetNumber:'');
    let [address, setAddress] = useState(data.object?data.object.address:'');
    let [geo, setGeo] = useState(data.object&&data.object.geo&&data.object.geo.length?cloneObject(data.object.geo):[42.8700000, 74.5900000]);
    let [administrativeArea_v2, setAdministrativeArea_v2] = useState(data.object?data.object.administrativeArea_v2:'');
    let handleAdministrativeArea_v2 =  (event) => {
        setAdministrativeArea_v2(event.target.value)
    };
    let [ugns_v2, setUgns_v2] = useState(data.object?ugnsTypes[data.object.ugns_v2]:'');
    let [bType_v2, setBType_v2] = useState(data.object?bTypes[data.object.bType_v2]:'');
    let [pType_v2, setPType_v2] = useState(data.object?pTypes[data.object.pType_v2]:'');
    let [calcItemAttribute, setCalcItemAttribute] = useState(data.object?calcItemAttributes[data.object.calcItemAttribute]:'');
    let handleCalcItemAttribute =  (event) => {
        setCalcItemAttribute(event.target.value)
    };
    let [legalObject, setLegalObject] = useState(data.object?data.object.legalObject:undefined);
    const { setMiniDialog, showMiniDialog, setFullDialog, showFullDialog } = props.mini_dialogActions;
    const router = useRouter()
    const [anchorElQuick, setAnchorElQuick] = useState(null);
    const openQuick = Boolean(anchorElQuick);
    let handleMenuQuick = (event) => {
        setAnchorElQuick(event.currentTarget);
    }
    let handleCloseQuick = () => {
        setAnchorElQuick(null);
    }
    useEffect(()=>{
        if(initialRender.current)
            initialRender.current = false
        else
            setAddress(`${locality}, ${route} ${streetNumber}`)
    },[locality, route, streetNumber])
    return (
        <App pageName={data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'}>
            <Head>
                <title>{data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'}</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content={data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'} />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/branch/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/branch/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
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
                                <Link href='/users/[id]' as={`/users/${legalObject._id}`}>
                                    <MenuItem onClick={async()=>{await setBranch({_id: router.query.id, name})}}>
                                        Сотрудники
                                    </MenuItem>
                                </Link>
                                <Link href='/cashboxes/[id]' as={`/cashboxes/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        Кассы
                                    </MenuItem>
                                </Link>
                                <Link href='/workshifts/[id]' as={`/workshifts/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        Смены
                                    </MenuItem>
                                </Link>
                                <Link href='/sales/[id]' as={`/sales/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        Операции
                                    </MenuItem>
                                </Link>
                                <Link href='/deposithistorys/[id]' as={`/deposithistorys/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        Внесения
                                    </MenuItem>
                                </Link>
                                <Link href='/withdrawhistorys/[id]' as={`/withdrawhistorys/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        Изъятия
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'X'}}} as={`/reports/${legalObject._id}?type=X`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        X-Отчет
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'Z'}}} as={`/reports/${legalObject._id}?type=Z`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        Z-Отчет
                                    </MenuItem>
                                </Link>
                            </Menu>
                            <Button onClick={handleMenuQuick} color='primary'>
                                Переход
                            </Button>
                            </>
                            :
                            null
                    }
                    {
                        ['admin', 'superadmin', 'оператор'].includes(profile.role)&&profile.statistic&&data.object&&data.object._id?
                            <>
                            {
                                data.object.sync?
                                    <SyncOn color='primary' onClick={async()=>{
                                        setMiniDialog('Синхронизация', <ViewText text={data.object.syncMsg}/>)
                                        showMiniDialog(true)
                                    }} className={classes.sync}/>
                                    :
                                    <SyncOff color='secondary' onClick={async()=>{
                                        if(profile.statistic) {
                                            setMiniDialog('Синхронизация', <ViewText text={data.object.syncMsg}/>)
                                            showMiniDialog(true)
                                        }
                                    }} className={classes.sync}/>
                            }
                            {
                                ['admin', 'superadmin'].includes(profile.role)&&profile.statistic?
                                    <HistoryIcon onClick={async()=>{
                                        if(profile.statistic) {
                                            setMiniDialog('История', <History where={data.object._id}/>)
                                            showMiniDialog(true)
                                        }
                                    }} style={{ color: '#10183D'}}/>
                                    :
                                    null
                            }
                            </>
                            :
                            null
                    }
                </div>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                    <br/>
                    {
                    data.object!==null?
                        <>
                        {['superadmin', 'admin', 'оператор'].includes(profile.role)&&profile.add?
                            <>
                            {
                                router.query.id!=='new'?
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
                                router.query.id!=='new'?
                                    <Link href='/legalobject/[id]' as={`/legalobject/${data.object.legalObject._id}`}>
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
                                    :
                                    <AutocomplectOnline
                                        error={!legalObject}
                                        setElement={setLegalObject}
                                        getElements={async (search)=>{return await getLegalObjects({search})}}
                                        label={'налогоплательщика'}
                                    />
                            }
                            <TextField
                                label='Название'
                                error={!name}
                                value={name}
                                className={classes.input}
                                onChange={(event)=>{
                                    setName(event.target.value)
                                }}
                            />
                            <Autocomplete
                                className={classes.input}
                                options={ugnsTypes.slice(1)}
                                value={ugns_v2}
                                getOptionLabel={option => option}
                                noOptionsText='Ничего не найдено'
                                onChange={(event, newValue) => {
                                    setUgns_v2(newValue)
                                }}
                                renderInput={(params) => <TextField error={!ugns_v2} {...params} label='Налоговый орган' variant='standard' />}
                            />
                            <FormControl error={!calcItemAttribute} className={classes.input}>
                                <InputLabel>Признаки предметов расчета</InputLabel>
                                <Select value={calcItemAttribute} onChange={handleCalcItemAttribute}>
                                    {calcItemAttributes.map((element)=>
                                        <MenuItem key={element} value={element}>{element}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Autocomplete
                                className={classes.input}
                                options={pTypes.slice(1)}
                                value={pType_v2}
                                getOptionLabel={option => option}
                                noOptionsText='Ничего не найдено'
                                onChange={(event, newValue) => {
                                    setPType_v2(newValue)
                                }}
                                renderInput={(params) => <TextField error={!pType_v2} {...params} label='Тип' variant='standard' />}
                            />
                            <Autocomplete
                                className={classes.input}
                                options={bTypes.slice(1)}
                                value={bType_v2}
                                getOptionLabel={option => option}
                                noOptionsText='Ничего не найдено'
                                onChange={(event, newValue) => {
                                    setBType_v2(newValue)
                                }}
                                renderInput={(params) => <TextField error={!bType_v2} {...params} label='Тип бизнеса' variant='standard' />}
                            />
                            <TextField
                                error={!address}
                                label='Адрес'
                                value={address}
                                className={classes.input}
                            />
                            <div className={classes.geo} style={{color: geo&&geo[0]!==42.8700000&&geo[1]!==74.5900000?'#10183D':'red'}} onClick={()=>{
                                setFullDialog('Геолокация', <Geo change={true} geo={geo} setAddressGeo={setGeo}/>)
                                showFullDialog(true)
                            }}>
                                {
                                    geo&&geo[0]!==42.8700000&&geo[1]!==74.5900000?
                                        'Изменить геолокацию'
                                        :
                                        'Задайте геолокацию'
                                }
                            </div>
                            <FormControl error={!administrativeArea_v2} className={classes.input}>
                                <InputLabel>Область</InputLabel>
                                <Select value={administrativeArea_v2} onChange={handleAdministrativeArea_v2}>
                                    {administrativeAreas.map((element)=>
                                        <MenuItem key={element} value={element}>{element}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField
                                error={!locality}
                                label='Населенный пункт'
                                value={locality}
                                className={classes.input}
                                onChange={(event)=>{setLocality(event.target.value)}}
                            />
                            <TextField
                                error={!route}
                                label='Улица, проспект, микрорайон'
                                value={route}
                                className={classes.input}
                                onChange={(event)=>{setRoute(event.target.value)}}
                            />
                            <TextField
                                error={!streetNumber}
                                label='Номер здания'
                                value={streetNumber}
                                className={classes.input}
                                onChange={(event)=>{setStreetNumber(event.target.value)}}
                            />
                            <TextField
                                error={!postalCode}
                                label='Почтовый индекс'
                                value={postalCode}
                                className={classes.input}
                                onChange={(event)=>{setPostalCode(event.target.value)}}
                            />
                            </>
                            :
                            ['управляющий', 'супервайзер', 'admin', 'оператор'].includes(profile.role)?
                                <>
                                {
                                    ['admin', 'оператор'].includes(profile.role)?
                                        <>
                                        <div className={classes.row}>
                                            <div className={classes.nameField}>
                                                Регистрация:&nbsp;
                                            </div>
                                            <div className={classes.value}>
                                                {pdDDMMYYHHMM(data.object.createdAt)}
                                            </div>
                                        </div>
                                        <Link href='/legalobject/[id]' as={`/legalobject/${data.object.legalObject._id}`}>
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
                                        </>
                                        :
                                        null
                                }
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Название:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {name}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Адрес:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {address}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Область:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {administrativeArea_v2}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Населенный пункт:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {locality}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Почтовый индекс:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {postalCode}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Улица, проспект, микрорайон:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {route}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Номер здания:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {streetNumber}
                                    </div>
                                </div>
                                <div className={classes.geo} style={{color: geo?'#10183D':'red'}} onClick={()=>{
                                    setFullDialog('Геолокация', <Geo geo={geo}/>)
                                    showFullDialog(true)
                                }}>
                                    Просмотреть геолокацию
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Налоговый орган:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.ugns?data.object.ugns:ugnsTypes[ugns_v2]}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Предметы расчета:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {calcItemAttributes[calcItemAttribute]}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Тип:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.pType?data.object.pType:pTypes[pType_v2]}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Тип бизнеса:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.bType?data.object.bType:bTypes[bType_v2]}
                                    </div>
                                </div>
                                </>
                                :
                                'Ничего не найдено'
                        }
                        <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                            {
                                ['admin', 'superadmin', 'оператор'].includes(profile.role)&&profile.add?
                                    !data.object.del?
                                        <>
                                        <Button color='primary' onClick={()=>{
                                            if (administrativeArea_v2&&calcItemAttribute&&geo&&legalObject&&name&&address&&locality&&postalCode&&route&&streetNumber&&pType_v2&&bType_v2&&ugns_v2) {
                                                const action = async() => {
                                                    if(router.query.id==='new') {
                                                        let res = await addBranch({
                                                            legalObject: legalObject._id,
                                                            bType_v2: bTypes.indexOf(bType_v2),
                                                            pType_v2: bTypes.indexOf(bType_v2),
                                                            administrativeArea_v2,
                                                            calcItemAttribute: calcItemAttributes.indexOf(calcItemAttribute),
                                                            ugns_v2: ugnsTypes.indexOf(ugns_v2),
                                                            name,
                                                            address,
                                                            locality,
                                                            postalCode,
                                                            route,
                                                            streetNumber,
                                                            geo
                                                        })
                                                        Router.push(`/branch/${res}`)
                                                        showSnackBar('Успешно', 'success')
                                                    }
                                                    else {
                                                        let element = {_id: router.query.id}
                                                        if (JSON.stringify(geo)!==JSON.stringify(data.object.geo)) element.geo = geo
                                                        if (name!==data.object.name) element.name = name
                                                        if (address!==data.object.address) element.address = address
                                                        if (locality!==data.object.locality) element.locality = locality
                                                        if (postalCode!==data.object.postalCode) element.postalCode = postalCode
                                                        if (route!==data.object.route) element.route = route
                                                        if (streetNumber!==data.object.streetNumber)
                                                            element.streetNumber = streetNumber
                                                        else
                                                            element.streetNumber = streetNumber[streetNumber.length-1]===' '?streetNumber.slice(0, streetNumber.length-1):streetNumber+' '
                                                        if (ugnsTypes.indexOf(ugns_v2)!==data.object.ugns_v2) element.ugns_v2 = ugnsTypes.indexOf(ugns_v2)
                                                        if (bTypes.indexOf(bType_v2)!==data.object.bType_v2) element.bType_v2 = bTypes.indexOf(bType_v2)
                                                        if (pTypes.indexOf(pType_v2)!==data.object.pType_v2) element.pType_v2 = pTypes.indexOf(pType_v2)
                                                        if (calcItemAttributes.indexOf(calcItemAttribute)!==data.object.calcItemAttribute) element.calcItemAttribute = calcItemAttributes.indexOf(calcItemAttribute)
                                                        if (administrativeArea_v2!==data.object.administrativeArea_v2) element.administrativeArea_v2 = administrativeArea_v2
                                                        let res = await _setBranch(element)
                                                        if(res==='OK')
                                                            Router.reload()
                                                        else if(res==='USED_WORKSHIFT')
                                                            showSnackBar('Закройте смены')
                                                        else
                                                            showSnackBar('Ошибка', 'error')
                                                    }
                                                }
                                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            } else
                                                showSnackBar('Заполните все поля')
                                        }}>
                                            Сохранить
                                        </Button>
                                        {
                                            profile.role!=='оператор'?
                                                <Button color='secondary' onClick={()=>{
                                                    const action = async() => {
                                                        let res = await deleteBranch(router.query.id)
                                                        if(res==='OK')
                                                            Router.push(`/branchs/${legalObject._id}`)
                                                        else if(res==='USED_WORKSHIFT')
                                                            showSnackBar('Закройте смены')
                                                        else if(res==='USED_CASHBOX')
                                                            showSnackBar('Отвяжите кассы')
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

Branch.getInitialProps = async function(ctx) {
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
            object:ctx.query.id!=='new'?await getBranch({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined):{
                legalObject: undefined,
                bType_v2: null,
                pType_v2: null,
                ugns_v2: null,
                name: '',
                locality: '',
                calcItemAttribute: '',
                administrativeArea_v2: '',
                postalCode: '',
                address: '',
                route: '',
                streetNumber: '',
                geo: undefined
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(Branch);