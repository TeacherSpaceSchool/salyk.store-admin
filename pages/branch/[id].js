import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getBranch, _setBranch, addBranch, deleteBranch} from '../../src/gql/branch'
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
import { administrativeAreas } from '../../src/const'
import { pdDDMMYYHHMM, cloneObject } from '../../src/lib'
import AutocomplectOnline from '../../components/app/AutocomplectOnline'
import Menu from '@material-ui/core/Menu';
import Link from 'next/link';
import History from '../../components/dialog/History';
import HistoryIcon from '@material-ui/icons/History';
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import ViewText from '../../components/dialog/ViewText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SetFMData from '../../components/dialog/SetFMData';
import {getBusinessActivities, getCalcItemAttributes, getEntrepreneurshipObjects, getTaxAuthorityDepartments} from '../../src/gql/kkm-2.0';
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
    let [ugnsCode_v2, setUgnsCode_v2] = useState(data.object?data.object.ugnsCode_v2:'');
    let [ugnsName_v2, setUgnsName_v2] = useState(data.object?data.object.ugnsName_v2:'');
    let handleUgns_v2 =  async () => {
        setMiniDialog('Налоговый орган', <SetFMData list={await getTaxAuthorityDepartments()} selectData={(code, name) => {
            setUgnsCode_v2(parseInt(code))
            setUgnsName_v2(name)
        }} defaultCode={ugnsCode_v2}/>)
        showMiniDialog(true)
    };
    let [businessActivityCode_v2, setBusinessActivityCode_v2] = useState(data.object?data.object.businessActivityCode_v2:'');
    let [businessActivityName_v2, setBusinessActivityName_v2] = useState(data.object?data.object.businessActivityName_v2:'');
    let handleBusinessActivity_v2 =  async () => {
        setMiniDialog('Тип бизнеса', <SetFMData list={await getBusinessActivities()} selectData={(code, name) => {
            setBusinessActivityCode_v2(parseInt(code))
            setBusinessActivityName_v2(name)
        }} defaultCode={businessActivityCode_v2}/>)
        showMiniDialog(true)
    };
    let [entrepreneurshipObjectCode_v2, setEntrepreneurshipObjectCode_v2] = useState(data.object?data.object.entrepreneurshipObjectCode_v2:'');
    let [entrepreneurshipObjectName_v2, setEntrepreneurshipObjectName_v2] = useState(data.object?data.object.entrepreneurshipObjectName_v2:'');
    let handleEntrepreneurshipObject_v2 =  async () => {
        setMiniDialog('Тип предпринимательства', <SetFMData list={await getEntrepreneurshipObjects()} selectData={(code, name) => {
            setEntrepreneurshipObjectCode_v2(parseInt(code))
            setEntrepreneurshipObjectName_v2(name)
        }} defaultCode={entrepreneurshipObjectCode_v2}/>)
        showMiniDialog(true)
    };
    let [calcItemAttributeCode_v2, setCalcItemAttributeCode_v2] = useState(data.object?data.object.calcItemAttributeCode_v2:'');
    let [calcItemAttributeName_v2, setCalcItemAttributeName_v2] = useState(data.object?data.object.calcItemAttributeName_v2:'');
    let handleCalcItemAttribute_v2 =  async () => {
        setMiniDialog('Признаки предметов расчета', <SetFMData list={await getCalcItemAttributes()} selectData={(code, name) => {
            setCalcItemAttributeCode_v2(parseInt(code))
            setCalcItemAttributeName_v2(name)
        }} defaultCode={calcItemAttributeCode_v2}/>)
        showMiniDialog(true)
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
                                        <TextField
                                            inputProps = {{readOnly: true}}
                                            error={!ugnsName_v2}
                                            label='Налоговый орган'
                                            value={ugnsName_v2?`${ugnsName_v2}`:''}
                                            className={classes.input}
                                            onClick={handleUgns_v2}
                                        />
                                        <TextField
                                            error={!calcItemAttributeName_v2}
                                            label='Признаки предметов расчета'
                                            value={calcItemAttributeName_v2?`${calcItemAttributeName_v2}`:''}
                                            className={classes.input}
                                            inputProps = {{readOnly: true}}
                                            onClick={handleCalcItemAttribute_v2}
                                        />
                                        <TextField
                                            error={!entrepreneurshipObjectName_v2}
                                            label='Тип предпринимательства'
                                            value={entrepreneurshipObjectName_v2?`${entrepreneurshipObjectName_v2}`:''}
                                            className={classes.input}
                                            inputProps = {{readOnly: true}}
                                            onClick={handleEntrepreneurshipObject_v2}
                                        />
                                        <TextField
                                            error={!businessActivityName_v2}
                                            label='Тип бизнеса'
                                            value={businessActivityName_v2?`${businessActivityName_v2}`:''}
                                            className={classes.input}
                                            inputProps = {{readOnly: true}}
                                            onClick={handleBusinessActivity_v2}
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
                                                    {data.object.ugns?data.object.ugns:ugnsName_v2}
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Предметы расчета:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {calcItemAttributeName_v2}
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Тип:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {data.object.pType?data.object.pType:entrepreneurshipObjectName_v2}
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Тип бизнеса:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {data.object.bType?data.object.bType:businessActivityName_v2}
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
                                                        if (administrativeArea_v2&&calcItemAttributeName_v2&&geo&&legalObject&&name&&address&&locality&&postalCode&&route&&streetNumber&&entrepreneurshipObjectName_v2&&businessActivityName_v2&&ugnsName_v2) {
                                                            const action = async() => {
                                                                if(router.query.id==='new') {
                                                                    let res = await addBranch({
                                                                        legalObject: legalObject._id,
                                                                        businessActivityCode_v2,
                                                                        businessActivityName_v2,
                                                                        entrepreneurshipObjectCode_v2,
                                                                        entrepreneurshipObjectName_v2,
                                                                        administrativeArea_v2,
                                                                        ugnsCode_v2,
                                                                        ugnsName_v2,
                                                                        calcItemAttributeCode_v2,
                                                                        calcItemAttributeName_v2,
                                                                        name,
                                                                        address,
                                                                        locality,
                                                                        postalCode,
                                                                        route,
                                                                        streetNumber,
                                                                        geo
                                                                    })
                                                                    if(res!=='ERROR') {
                                                                        Router.push(`/branch/${res}`)
                                                                        showSnackBar('Успешно', 'success')
                                                                    }
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
                                                                    if (ugnsName_v2!==data.object.ugnsName_v2) element.ugnsName_v2 = ugnsName_v2
                                                                    if (ugnsCode_v2!==data.object.ugnsCode_v2) element.ugnsCode_v2 = ugnsCode_v2
                                                                    if (entrepreneurshipObjectName_v2!==data.object.entrepreneurshipObjectName_v2) element.entrepreneurshipObjectName_v2 = entrepreneurshipObjectName_v2
                                                                    if (entrepreneurshipObjectCode_v2!==data.object.entrepreneurshipObjectCode_v2) element.entrepreneurshipObjectCode_v2 = entrepreneurshipObjectCode_v2
                                                                    if (businessActivityCode_v2!==data.object.businessActivityCode_v2) element.businessActivityCode_v2 = businessActivityCode_v2
                                                                    if (businessActivityName_v2!==data.object.businessActivityName_v2) element.businessActivityName_v2 = businessActivityName_v2
                                                                    if (calcItemAttributeCode_v2!==data.object.calcItemAttributeCode_v2) element.calcItemAttributeCode_v2 = calcItemAttributeCode_v2
                                                                    if (calcItemAttributeName_v2!==data.object.calcItemAttributeName_v2) element.calcItemAttributeName_v2 = calcItemAttributeName_v2
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