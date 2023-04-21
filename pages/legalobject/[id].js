import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, {useEffect, useState} from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { getLegalObject, setLegalObject, onoffLegalObject, addLegalObject, deleteLegalObject } from '../../src/gql/legalObject'
import {
    getNdsTypes,
    getNspTypes,
    getTaxAuthorityDepartments,
    geTtpDataByINNforBusinessActivity
} from '../../src/gql/kkm-2.0'
import { getUsers } from '../../src/gql/user'
import legalObjectStyle from '../../src/styleMUI/list'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Remove from '@material-ui/icons/Remove';
import { useRouter } from 'next/router'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Router from 'next/router'
import * as userActions from '../../redux/actions/user'
import * as snackbarActions from '../../redux/actions/snackbar'
import * as appActions from '../../redux/actions/app'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../../components/dialog/Confirmation'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { taxpayerTypes, taxpayerTypesReverse } from '../../src/const'
import { getTaxSystems } from '../../src/gql/kkm-2.0'
import { pdDDMMYYHHMM, validPhone1, validPhones1, validMail, validMails, cloneObject, inputPhone } from '../../src/lib'
import Menu from '@material-ui/core/Menu';
import Link from 'next/link';
import Checkbox from '@material-ui/core/Checkbox';
import History from '../../components/dialog/History';
import ViewText from '../../components/dialog/ViewText';
import HistoryIcon from '@material-ui/icons/History';
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import Check from '@material-ui/icons/Check';
import AutocomplectOnline from '../../components/app/AutocomplectOnline'
import SetFMData from '../../components/dialog/SetFMData';

const LegalObject = React.memo((props) => {
    const { profile } = props.user;
    const classes = legalObjectStyle();
    const { data } = props;
    const { isMobileApp } = props.app;
    const { showSnackBar } = props.snackbarActions;
    const { showLoad } = props.appActions;
    let [inn, setInn] = useState(data.object?data.object.inn:'');
    let [taxSystemCode_v2, setTaxSystemCode_v2] = useState(data.object.taxSystemCode_v2);
    let [taxSystemName_v2, setTaxSystemName_v2] = useState(data.object.taxSystemName_v2);
    let handleTaxSystem_v2 = async () => {
        setMiniDialog('Налоговый режим', <SetFMData list={await getTaxSystems()} selectData={(code, name) => {
            setTaxSystemCode_v2(code)
            setTaxSystemName_v2(name)
        }} defaultCode={taxSystemCode_v2}/>)
        showMiniDialog(true)
    };
    let [responsiblePerson, setResponsiblePerson] = useState(data.object?data.object.responsiblePerson:'');
    let [address, setAddress] = useState(data.object?data.object.address:'');
    let [ofd, setOfd] = useState(data.object?data.object.ofd:true);
    let [status, setStatus] = useState(data.object?data.object.status:'active');
    let [vatPayer_v2, setVatPayer_v2] = useState(data.object?data.object.vatPayer_v2:false);
    let [ndsTypeCode_v2, setNdsTypeCode_v2] = useState(data.object.ndsTypeCode_v2);
    let [ndsTypeRate_v2, setNdsTypeRate_v2] = useState(data.object.ndsTypeRate_v2);
    let handleNdsType_v2 = async () => {
        setMiniDialog('Ставка НДС', <SetFMData list={await getNdsTypes()} selectData={(code, name) => {
            setNdsTypeCode_v2(parseInt(code))
            setNdsTypeRate_v2(name)
        }} defaultCode={ndsTypeCode_v2}/>)
        showMiniDialog(true)
    };
    let [nspTypeCode_v2, setNspTypeCode_v2] = useState(data.object.nspTypeCode_v2);
    let [nspTypeRate_v2, setNspTypeRate_v2] = useState(data.object.nspTypeRate_v2);
    let handleNspType_v2 = async () => {
        setMiniDialog('Ставка НСП', <SetFMData list={await getNspTypes()} selectData={(code, name) => {
            setNspTypeCode_v2(parseInt(code))
            setNspTypeRate_v2(name)
        }} defaultCode={nspTypeCode_v2}/>)
        showMiniDialog(true)
    };
    let [agent, setAgent] = useState(data.object?{...data.object.agent}:undefined);
    let [email, setEmail] = useState(data.object&&data.object.email?cloneObject(data.object.email):[]);
    let addEmail = ()=>{
        email = [...email, '']
        setEmail(email)
    };
    let editEmail = (event, idx)=>{
        email[idx] = event.target.value
        setEmail([...email])
    };
    let deleteEmail = (idx)=>{
        email.splice(idx, 1);
        setEmail([...email])
    };
    let [phone, setPhone] = useState(data.object&&data.object.phone?cloneObject(data.object.phone):[]);
    let addPhone = ()=>{
        phone = [...phone, '']
        setPhone(phone)
    };
    let editPhone = (event, idx)=>{
        phone[idx] = inputPhone(event.target.value)
        setPhone([...phone])
    };
    let deletePhone = (idx)=>{
        phone.splice(idx, 1);
        setPhone([...phone])
    };
    let [name, setName] = useState(data.object?data.object.name:'');
    let [ugnsCode_v2, setUgnsCode_v2] = useState(data.object.ugns_v2);
    let [ugnsName_v2, setUgnsName_v2] = useState('');
    const handleUgns = async (ugnsCode_v2) => {
        const ugnses = await getTaxAuthorityDepartments();
        for(let i=0; i<ugnses.length; i++) {
            if(ugnses[i].code===ugnsCode_v2) {
                ugnsName_v2 = ugnses[i].name
                break
            }
        }
        if(!ugnsName_v2) ugnsName_v2 = 'Не найден'
        setUgnsName_v2(ugnsName_v2)
    }
    useEffect(() => {(async () => {
        if(data.object&&data.object.ugns_v2!=undefined) handleUgns(data.object.ugns_v2)
    })()}, [])
    let [taxpayerType_v2, setTaxpayerType_v2] = useState(data.object&&data.object.taxpayerType_v2?taxpayerTypes[data.object.taxpayerType_v2]:'');
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
    return (
        <App pageName={data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'}>
            <Head>
                <title>{data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'}</title>
                <meta name='description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content={data.object!==null?router.query.id==='new'?'Добавить':data.object.name:'Ничего не найдено'} />
                <meta property='og:description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/legalobject/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/legalobject/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                <div className={classes.status}>

                    {
                        router.query.id!=='new'&&'оператор'!==profile.role?
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
                                    <Link href='/branchs/[id]' as={`/branchs/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Объекты
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/cashboxes/[id]' as={`/cashboxes/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Кассы
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/users/[id]' as={`/users/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Сотрудники
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/items/[id]' as={`/items/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Товары
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/districts/[id]' as={`/districts/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Районы
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/clients/[id]' as={`/clients/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Клиенты
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/workshifts/[id]' as={`/workshifts/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Смены
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/sales/[id]' as={`/sales/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Операции
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/deposithistorys/[id]' as={`/deposithistorys/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Внесения
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href='/withdrawhistorys/[id]' as={`/withdrawhistorys/${router.query.id}`}>
                                        <a>
                                            <MenuItem>
                                                Изъятия
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href={{pathname: '/reports/[id]', query: {type: 'X'}}} as={`/reports/${router.query.id}?type=X`}>
                                        <a>
                                            <MenuItem>
                                                X-Отчет
                                            </MenuItem>
                                        </a>
                                    </Link>
                                    <Link href={{pathname: '/reports/[id]', query: {type: 'Z'}}} as={`/reports/${router.query.id}?type=Z`}>
                                        <a>
                                            <MenuItem>
                                                Z-Отчет
                                            </MenuItem>
                                        </a>
                                    </Link>
                                </Menu>
                                <Button onClick={handleMenuQuick} color='primary'>
                                    Переходы
                                </Button>
                            </>
                            :
                            null
                    } {
                    ['admin', 'superadmin', 'оператор'].includes(profile.role)&&data.object&&data.object._id?
                        <>
                            {
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
                        </>
                        :
                        null
                }
                </div>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                    <br/>
                    {
                        data.object?
                            <>
                                {
                                    ['admin', 'superadmin', 'оператор'].includes(profile.role)&&profile.add?
                                        <>
                                            <div className={classes.row}>
                                                <div className={classes.nameField} style={{marginBottom: 0}}>
                                                    Плательщик НДС:&nbsp;
                                                </div>
                                                <div className={classes.value} style={{marginBottom: 0}}>
                                                    {vatPayer_v2?'да':'нет'}
                                                </div>
                                            </div>
                                            <div className={classes.row} style={{alignItems: 'flex-end'}}>
                                                <div className={classes.nameField}>Фискальный режим:&nbsp;</div>
                                                <Checkbox
                                                    checked={ofd}
                                                    onChange={()=>{if(profile.add&&['admin', 'superadmin'].includes(profile.role))setOfd(!ofd)}}
                                                    color='primary'
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </div>
                                            <a href={'https://cloud.salyk.kg/#/sign-in'} target='_blank' className={classes.value} style={{marginLeft: 10, marginBottom: 0, marginTop: 10}}>
                                                Зарегестировать в облачном фискальном модуле
                                            </a>
                                            <TextField
                                                error={!inn}
                                                label='ИНН'
                                                type='number'
                                                value={inn}
                                                className={classes.input}
                                                onChange={(event)=>{
                                                    if(router.query.id==='new'&&event.target.value.length<15)
                                                        setInn(event.target.value)
                                                }}
                                                InputProps={{
                                                    endAdornment: inn.length===14?
                                                        <InputAdornment position='end'>
                                                            <IconButton aria-label='checkINN' onClick={async () => {
                                                                if(inn.length===14) {
                                                                    await showLoad(true)
                                                                    let _inn = await geTtpDataByINNforBusinessActivity(inn)
                                                                    if(!_inn.message){
                                                                        setName(_inn.companyName)
                                                                        setAddress(_inn.legalAddress)
                                                                        setVatPayer_v2(_inn.vatPayer)
                                                                        setUgnsCode_v2(_inn.taxAuthorityDepartment)
                                                                        handleUgns(_inn.taxAuthorityDepartment)
                                                                        taxpayerType_v2 = taxpayerTypes[_inn.type]
                                                                        setTaxpayerType_v2(taxpayerType_v2)
                                                                    }
                                                                    else {
                                                                        setName('')
                                                                        setAddress('')
                                                                        setVatPayer_v2(false)
                                                                        setUgnsCode_v2(null)
                                                                        handleUgns(null)
                                                                        setTaxpayerType_v2('')
                                                                        showSnackBar(_inn.message, 'error')
                                                                    }
                                                                    await showLoad(false)
                                                                }
                                                                else
                                                                    showSnackBar('Неверный ИНН', 'error')
                                                            }}>
                                                                <Check/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                        :
                                                        null
                                                }}
                                            />
                                            <TextField
                                                error={!name}
                                                label='Название'
                                                value={name}
                                                className={classes.input}
                                                inputProps = {{
                                                    readOnly: true
                                                }}
                                            />
                                            <TextField
                                                error={!ugnsName_v2}
                                                label='Налоговый орган'
                                                value={ugnsName_v2}
                                                className={classes.input}
                                            />
                                            <TextField
                                                error={!taxpayerType_v2}
                                                label='Тип налогоплательщика'
                                                value={taxpayerType_v2}
                                                className={classes.input}
                                                inputProps = {{
                                                    readOnly: true
                                                }}
                                            />
                                            <TextField
                                                error={!address}
                                                label='Адрес'
                                                value={address}
                                                className={classes.input}
                                                inputProps = {{
                                                    readOnly: true
                                                }}
                                            />
                                            {phone?phone.map((element, idx)=>
                                                <FormControl key={`phone${idx}`} className={classes.input}>
                                                    <InputLabel error={!validPhone1(element)}>Телефон</InputLabel>
                                                    <Input
                                                        error={!validPhone1(element)}
                                                        placeholder='Телефон'
                                                        value={element}
                                                        className={classes.input}
                                                        onChange={(event)=>{editPhone(event, idx)}}
                                                        endAdornment={
                                                            <InputAdornment position='end'>
                                                                <IconButton
                                                                    onClick={()=>{
                                                                        deletePhone(idx)
                                                                    }}
                                                                    aria-label='toggle password visibility'
                                                                >
                                                                    <Remove/>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        startAdornment={<InputAdornment position='start'>+996</InputAdornment>}
                                                    />
                                                </FormControl>
                                            ): null}
                                            <Button onClick={async()=>{
                                                addPhone()
                                            }} color={phone?'primary':'secondary'}>
                                                Добавить телефон
                                            </Button>
                                            {email?email.map((element, idx)=>
                                                <FormControl key={`email${idx}`} className={classes.input}>
                                                    <InputLabel error={!validMail(element)}>Email</InputLabel>
                                                    <Input
                                                        error={!validMail(element)}
                                                        placeholder='Email'
                                                        value={element}
                                                        className={classes.input}
                                                        onChange={(event)=>{editEmail(event, idx)}}
                                                        endAdornment={
                                                            <InputAdornment position='end'>
                                                                <IconButton
                                                                    onClick={()=>{
                                                                        deleteEmail(idx)
                                                                    }}
                                                                    aria-label='toggle password visibility'
                                                                >
                                                                    <Remove/>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            ): null}
                                            <Button onClick={async()=>{
                                                addEmail()
                                            }} color='primary'>
                                                Добавить email
                                            </Button>
                                            <TextField
                                                error={!responsiblePerson}
                                                label='Контактное лицо'
                                                value={responsiblePerson}
                                                className={classes.input}
                                                onChange={(event)=>{setResponsiblePerson(event.target.value)}}
                                            />
                                            <TextField
                                                inputProps = {{readOnly: true}}
                                                error={!taxSystemName_v2}
                                                label='Налоговый режим'
                                                value={taxSystemName_v2?`${taxSystemName_v2}`:''}
                                                className={classes.input}
                                                onClick={handleTaxSystem_v2}
                                            />
                                            <div className={classes.row} style={{alignItems: 'flex-end'}}>
                                                <div className={classes.nameField}>Плательщик НДС:&nbsp;</div>
                                                <Checkbox
                                                    color='primary'
                                                    checked={vatPayer_v2}
                                                    onChange={()=>setVatPayer_v2(!vatPayer_v2)}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </div>
                                            <TextField
                                                inputProps = {{readOnly: true}}
                                                error={ndsTypeRate_v2==undefined}
                                                label='Ставка НДС'
                                                value={ndsTypeRate_v2!=undefined?`${ndsTypeRate_v2}%`:''}
                                                className={classes.input}
                                                onClick={handleNdsType_v2}
                                            />
                                            <TextField
                                                inputProps = {{readOnly: true}}
                                                error={nspTypeRate_v2==undefined}
                                                label='Ставка НСП'
                                                value={nspTypeRate_v2!=undefined?`${nspTypeRate_v2}%`:''}
                                                className={classes.input}
                                                onClick={handleNspType_v2}
                                            />
                                            <AutocomplectOnline
                                                defaultValue={agent}
                                                className={classes.input}
                                                setElement={setAgent}
                                                getElements={async (search)=>{return await getUsers({
                                                    search, role: 'агент'
                                                })}}
                                                label={'агента'}
                                            />
                                        </>
                                        :
                                        <>
                                            {
                                                ['admin', 'оператор'].includes(profile.role)?
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
                                                    ИНН:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {inn}
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
                                                    Телефон:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {phone.map((element, idx)=><div key={`Телефон${idx}`}>+996{element}</div>)}
                                                </div>
                                            </div>
                                            {
                                                email?
                                                    <div className={classes.row}>
                                                        <div className={classes.nameField}>
                                                            Email:&nbsp;
                                                        </div>
                                                        <div>
                                                            {email.map((element, idx)=><div key={`Email${idx}`}>{element}</div>)}
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Контактное лицо:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {responsiblePerson}
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Налоговый режим:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {taxSystemName_v2}
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    НДС:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {ndsTypeRate_v2}%
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    НСП:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {nspTypeRate_v2}%
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Налоговый орган:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {ugnsName_v2}
                                                </div>
                                            </div>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    Тип налогоплательщика:&nbsp;
                                                </div>
                                                <div className={classes.value}>
                                                    {taxpayerType_v2}
                                                </div>
                                            </div>
                                        </>
                                }
                                <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                                    {
                                        ['admin', 'superadmin', 'оператор'].includes(profile.role)&&profile.add?
                                            !data.object.del?
                                                <>
                                                    {
                                                        router.query.id === 'new' ?
                                                            <Button color='primary' onClick={()=>{
                                                                let checkPhone = phone&&validPhones1(phone)
                                                                let checkMail = !email||validMails(email)
                                                                if (ndsTypeCode_v2!=undefined&&nspTypeCode_v2!=undefined&&taxSystemName_v2&&name&&inn&&address&&checkPhone&&checkMail&&taxpayerType_v2&&ugnsName_v2&&responsiblePerson) {
                                                                    const action = async() => {
                                                                        let res = await addLegalObject({
                                                                            agent: agent?agent._id:undefined,
                                                                            taxSystemName_v2,
                                                                            taxSystemCode_v2,
                                                                            name,
                                                                            inn,
                                                                            ofd,
                                                                            address,
                                                                            ndsTypeCode_v2: ndsTypeCode_v2,
                                                                            ndsTypeRate_v2: parseInt(ndsTypeRate_v2),
                                                                            nspTypeCode_v2: nspTypeCode_v2,
                                                                            nspTypeRate_v2: parseInt(nspTypeRate_v2),
                                                                            phone,
                                                                            email,
                                                                            vatPayer_v2,
                                                                            ugns_v2: ugnsCode_v2,
                                                                            taxpayerType_v2: taxpayerTypesReverse[taxpayerType_v2],
                                                                            responsiblePerson
                                                                        })
                                                                        if(res!=='ERROR') {
                                                                            Router.push(`/legalobject/${res}`)
                                                                            showSnackBar('Успешно', 'success')
                                                                        }
                                                                        else
                                                                            showSnackBar('Ошибка', 'error')
                                                                    }
                                                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                                    showMiniDialog(true)
                                                                } else
                                                                    showSnackBar('Заполните все поля')
                                                            }}>
                                                                Добавить
                                                            </Button>
                                                            :
                                                            <Button color='primary' onClick={()=>{
                                                                let checkPhone = phone&&validPhones1(phone)
                                                                let checkMail = !email||validMails(email)
                                                                if (ndsTypeCode_v2!=undefined&&nspTypeCode_v2!=undefined&&taxSystemName_v2&&name&&inn&&address&&checkPhone&&checkMail&&taxpayerType_v2&&ugnsName_v2&&responsiblePerson) {
                                                                    const action = async() => {
                                                                        let element = {_id: router.query.id, agent: agent?agent._id:undefined}
                                                                        if (nspTypeCode_v2!==data.object.nspTypeCode_v2) element.nspTypeCode_v2 = nspTypeCode_v2
                                                                        if (nspTypeRate_v2!==data.object.nspTypeRate_v2) element.nspTypeRate_v2 = parseInt(nspTypeRate_v2)
                                                                        if (ndsTypeCode_v2!==data.object.ndsTypeCode_v2) element.ndsTypeCode_v2 = ndsTypeCode_v2
                                                                        if (ndsTypeRate_v2!==data.object.ndsTypeRate_v2) element.ndsTypeRate_v2 = parseInt(ndsTypeRate_v2)
                                                                        if (name!==data.object.name) element.name = name
                                                                        if (address!==data.object.address) element.address = address
                                                                        if (taxSystemName_v2!==data.object.taxSystemName_v2) element.taxSystemName_v2 = taxSystemName_v2
                                                                        if (taxSystemCode_v2!==data.object.taxSystemCode_v2) element.taxSystemCode_v2 = taxSystemCode_v2
                                                                        if (ugnsCode_v2!==data.object.ugns_v2) element.ugns_v2 = ugnsCode_v2
                                                                        if (taxpayerType_v2!==data.object.taxpayerType_v2) element.taxpayerType_v2 = taxpayerTypesReverse[taxpayerType_v2]
                                                                        if (vatPayer_v2!==data.object.vatPayer_v2) element.vatPayer_v2 = vatPayer_v2
                                                                        if (ofd!==data.object.ofd&&profile.add) element.ofd = ofd
                                                                        if (responsiblePerson!==data.object.responsiblePerson) element.responsiblePerson = responsiblePerson
                                                                        if (JSON.stringify(phone)!==JSON.stringify(data.object.phone)) element.phone = phone
                                                                        if (JSON.stringify(email)!==JSON.stringify(data.object.email)) element.email = email
                                                                        const res = await setLegalObject(element)
                                                                        if(res==='OK')
                                                                            Router.reload()
                                                                        else if(res==='ERROR')
                                                                            showSnackBar('Ошибка', 'error')
                                                                        else if(res==='USED_WORKSHIFT')
                                                                            showSnackBar('Закройте смены', 'error')
                                                                    }
                                                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                                    showMiniDialog(true)
                                                                } else
                                                                    showSnackBar('Заполните все поля')
                                                            }}>
                                                                Сохранить
                                                            </Button>
                                                    }
                                                    {
                                                        ['admin', 'superadmin'].includes(profile.role)&&router.query.id!=='new'?
                                                            <>
                                                                <Button color={status==='active'?'primary':'secondary'} onClick={()=>{
                                                                    const action = async() => {
                                                                        await onoffLegalObject(router.query.id)
                                                                        setStatus(status==='active'?'deactive':'active')
                                                                    }
                                                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                                    showMiniDialog(true)
                                                                }}>
                                                                    {status==='active'?'Отключить':'Включить'}
                                                                </Button>
                                                                <Button color='secondary' onClick={()=>{
                                                                    const action = async() => {
                                                                        await deleteLegalObject(router.query.id)
                                                                        Router.push(`/legalobjects`)
                                                                    }
                                                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                                                    showMiniDialog(true)
                                                                }}>
                                                                    Удалить
                                                                </Button>
                                                            </>
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

LegalObject.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', 'управляющий', 'оператор'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            object:ctx.query.id!=='new'?
                await getLegalObject({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)
                :
                {
                    ofd: true,
                    name: '',
                    inn: '',
                    address: '',
                    phone: [],
                    responsiblePerson: ''
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
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LegalObject);