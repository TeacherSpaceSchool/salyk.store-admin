import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, { useState } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { getLegalObject, setLegalObject, onoffLegalObject, addLegalObject, deleteLegalObject, geTtpDataByINNforBusinessActivity, restoreLegalObject } from '../../src/gql/legalObject'
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
import Select from '@material-ui/core/Select';
import Router from 'next/router'
import * as userActions from '../../redux/actions/user'
import * as snackbarActions from '../../redux/actions/snackbar'
import * as appActions from '../../redux/actions/app'
import TextField from '@material-ui/core/TextField';
import Confirmation from '../../components/dialog/Confirmation'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { taxpayerTypes, ugnsTypesByNmr, rateTaxes } from '../../src/const'
import { ndsTypes, nspTypes } from '../../src/const'
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

const LegalObject = React.memo((props) => {
    const { profile } = props.user;
    const classes = legalObjectStyle();
    const { data } = props;
    const { isMobileApp } = props.app;
    const { showSnackBar } = props.snackbarActions;
    const { showLoad } = props.appActions;
    let [name, setName] = useState(data.object?data.object.name:'');
    let [inn, setInn] = useState(data.object?data.object.inn:'');
    let [rateTaxe, setRateTaxe] = useState(data.object?data.object.rateTaxe:'');
    let [responsiblePerson, setResponsiblePerson] = useState(data.object?data.object.responsiblePerson:'');
    let [address, setAddress] = useState(data.object?data.object.address:'');
    let [ofd, setOfd] = useState(data.object?data.object.ofd:true);
    let [status, setStatus] = useState(data.object?data.object.status:'active');
    let [ndsType, setNdsType] = useState(data.object?data.object.ndsType:'');
    let handleNds = (event) => {
        setNdsType(event.target.value)
    };
    let [nspType, setNspType] = useState(data.object?data.object.nspType:'');
    let handleNsp = (event) => {
        setNspType(event.target.value)
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
    let [taxpayerType, setTaxpayerType] = useState(data.object?data.object.taxpayerType:'');
    let handleTaxpayerType =  (event) => {
        setTaxpayerType(event.target.value)
    };
    let handleRateTaxe =  (event) => {
        setRateTaxe(event.target.value)
    };
    let [ugns, setUgns] = useState(data.object?data.object.ugns:'');
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
        <App pageName={data.object!==null?router.query.id==='new'?'????????????????':data.object.name:'???????????? ???? ??????????????'}>
            <Head>
                <title>{data.object!==null?router.query.id==='new'?'????????????????':data.object.name:'???????????? ???? ??????????????'}</title>
                <meta name='description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:title' content={data.object!==null?router.query.id==='new'?'????????????????':data.object.name:'???????????? ???? ??????????????'} />
                <meta property='og:description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/legalobject/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/legalobject/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                <div className={classes.status}>

                    {
                        router.query.id!=='new'&&'????????????????'!==profile.role?
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
                                    <MenuItem>
                                        ??????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/cashboxes/[id]' as={`/cashboxes/${router.query.id}`}>
                                    <MenuItem>
                                        ??????????
                                    </MenuItem>
                                </Link>
                                <Link href='/users/[id]' as={`/users/${router.query.id}`}>
                                    <MenuItem>
                                        ????????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/items/[id]' as={`/items/${router.query.id}`}>
                                    <MenuItem>
                                        ????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/districts/[id]' as={`/districts/${router.query.id}`}>
                                    <MenuItem>
                                        ????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/clients/[id]' as={`/clients/${router.query.id}`}>
                                    <MenuItem>
                                        ??????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/workshifts/[id]' as={`/workshifts/${router.query.id}`}>
                                    <MenuItem>
                                        ??????????
                                    </MenuItem>
                                </Link>
                                <Link href='/sales/[id]' as={`/sales/${router.query.id}`}>
                                    <MenuItem>
                                        ????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/deposithistorys/[id]' as={`/deposithistorys/${router.query._id}`}>
                                    <MenuItem>
                                        ????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/withdrawhistorys/[id]' as={`/withdrawhistorys/${router.query._id}`}>
                                    <MenuItem>
                                        ??????????????
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'X'}}} as={`/reports/${router.query._id}?type=X`}>
                                    <MenuItem>
                                        X-??????????
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'Z'}}} as={`/reports/${router.query._id}?type=Z`}>
                                    <MenuItem>
                                        Z-??????????
                                    </MenuItem>
                                </Link>
                            </Menu>
                            <Button onClick={handleMenuQuick} color='primary'>
                                ????????????????
                            </Button>
                            </>
                            :
                            null
                    } {
                    ['admin', 'superadmin', '????????????????'].includes(profile.role)&&data.object&&data.object._id?
                        <>
                            {
                                data.object.sync?
                                    <SyncOn color='primary' onClick={async()=>{
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
                            {
                                ['admin', 'superadmin'].includes(profile.role)&&profile.statistic?
                                    <HistoryIcon onClick={async()=>{
                                        setMiniDialog('??????????????', <History where={data.object._id}/>)
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
                        ['admin', 'superadmin', '????????????????'].includes(profile.role)&&profile.add?
                            <>
                            {
                                router.query.id!=='new'&&'????????????????'!==profile.role?
                                    <>
                                    <div className={classes.row}>
                                        <div className={classes.nameField}>
                                            ??????????????????????:&nbsp;
                                        </div>
                                        <div className={classes.value}>
                                            {pdDDMMYYHHMM(data.object.createdAt)}
                                        </div>
                                    </div>
                                    </>
                                    :
                                    null
                            }
                            <div className={classes.row} style={{alignItems: 'flex-end'}}>
                                <div className={classes.nameField}>???????????????????? ??????????:&nbsp;</div>
                                <Checkbox

                                    checked={ofd}
                                    onChange={()=>{if(profile.add&&['admin', 'superadmin'].includes(profile.role))setOfd(!ofd)}}
                                    color='primary'
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </div>
                            <TextField
                                error={!name.length}
                                label='????????????????'
                                value={name}
                                className={classes.input}
                            />
                            <TextField
                                error={!inn.length}
                                label='??????'
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
                                                        setName(_inn.fullName)
                                                        setAddress(_inn.fullAddress)
                                                        setUgns(ugnsTypesByNmr[_inn.rayonCode])
                                                    }
                                                    else
                                                        showSnackBar(_inn.message, 'error')
                                                    await showLoad(false)
                                                }
                                                else
                                                    showSnackBar('???????????????? ??????', 'error')
                                            }}>
                                                <Check/>
                                            </IconButton>
                                        </InputAdornment>
                                        :
                                        null
                                }}
                            />
                            <TextField
                                error={!address.length}
                                label='??????????'
                                value={address}
                                className={classes.input}
                            />
                            {phone?phone.map((element, idx)=>
                                    <FormControl key={`phone${idx}`} className={classes.input}>
                                        <InputLabel error={!validPhone1(element)}>??????????????</InputLabel>
                                        <Input
                                            error={!validPhone1(element)}
                                            placeholder='??????????????'
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
                            }} color={phone.length?'primary':'secondary'}>
                                ???????????????? ??????????????
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
                                ???????????????? email
                            </Button>
                            <TextField
                                error={!responsiblePerson.length}
                                label='???????????????????? ????????'
                                value={responsiblePerson}
                                className={classes.input}
                                onChange={(event)=>{setResponsiblePerson(event.target.value)}}
                            />
                            <FormControl className={classes.input}>
                                <InputLabel error={!rateTaxe}>?????????????????? ??????????</InputLabel>
                                <Select value={rateTaxe} onChange={handleRateTaxe}
                                        error={!rateTaxe}>
                                    {rateTaxes.map((element)=>
                                        <MenuItem key={element} value={element}>{element}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.input}>
                                <InputLabel error={!ndsType}>??????</InputLabel>
                                <Select value={ndsType} onChange={handleNds} error={!ndsType}>
                                    {Object.keys(ndsTypes).map((element)=>
                                        <MenuItem key={element} value={element}>{element}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.input}>
                                <InputLabel error={!nspType}>??????</InputLabel>
                                <Select value={nspType} onChange={handleNsp} error={!nspType}>
                                    {Object.keys(nspTypes).map((element)=>
                                        <MenuItem key={element} value={element}>{element}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.input}>
                                <InputLabel error={!taxpayerType}>?????? ??????????????????????????????????</InputLabel>
                                <Select value={taxpayerType} onChange={handleTaxpayerType}
                                        error={!taxpayerType}>
                                    {taxpayerTypes.map((element)=>
                                        <MenuItem key={element} value={element}>{element}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField
                                error={!ugns}
                                label='?????????????????? ??????????'
                                value={ugns}
                                className={classes.input}
                            />
                            <AutocomplectOnline
                                defaultValue={agent}
                                className={classes.input}
                                setElement={setAgent}
                                getElements={async (search)=>{return await getUsers({
                                    search, role: '??????????'
                                })}}
                                label={'????????????'}
                            />
                            </>
                            :
                            <>
                            {
                                ['admin', '????????????????'].includes(profile.role)?
                                    <div className={classes.row}>
                                        <div className={classes.nameField}>
                                            ??????????????????????:&nbsp;
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
                                    ????????????????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {name}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ??????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {inn}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ??????????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {address}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ??????????????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {phone.map((element, idx)=><div key={`??????????????${idx}`}>+996{element}</div>)}
                                </div>
                            </div>
                            {
                                email.length?
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
                                    ???????????????????? ????????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {responsiblePerson}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ?????????????????? ??????????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {rateTaxe}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ??????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {ndsType}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ??????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {nspType}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ?????? ??????????????????????????????????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {taxpayerType}
                                </div>
                            </div>
                            <div className={classes.row}>
                                <div className={classes.nameField}>
                                    ?????????????????? ??????????:&nbsp;
                                </div>
                                <div className={classes.value}>
                                    {ugns}
                                </div>
                            </div>
                            </>
                        }
                        <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                            {
                                ['admin', 'superadmin', '????????????????'].includes(profile.role)&&profile.add?
                                    !data.object.del?
                                        <>
                                        <Button color='primary' onClick={()=>{
                                            let checkPhone = phone.length&&validPhones1(phone)
                                            let checkMail = !email.length||validMails(email)
                                            if (ndsType&&nspType&&rateTaxe&&name.length&&inn.length&&address.length&&checkPhone&&checkMail&&taxpayerType.length&&ugns.length&&responsiblePerson.length) {
                                                const action = async() => {
                                                    if(router.query.id==='new') {
                                                        let res = await addLegalObject({agent: agent?agent._id:undefined, rateTaxe, name, inn, ofd, address, ndsType, nspType, phone, email, taxpayerType, ugns, responsiblePerson})
                                                        Router.push(`/legalobject/${res}`)
                                                        showSnackBar('??????????????', 'success')
                                                    }
                                                    else {
                                                        let element = {_id: router.query.id, agent: agent?agent._id:undefined}
                                                        if (nspType!==data.object.nspType) element.nspType = nspType
                                                        if (ndsType!==data.object.ndsType) element.ndsType = ndsType
                                                        if (name!==data.object.name) element.name = name
                                                        if (address!==data.object.address) element.address = address
                                                        if (rateTaxe!==data.object.rateTaxe) element.rateTaxe = rateTaxe
                                                        if (taxpayerType!==data.object.taxpayerType) element.taxpayerType = taxpayerType
                                                        if (ugns!==data.object.ugns) element.ugns = ugns
                                                        if (ofd!==data.object.ofd&&profile.add) element.ofd = ofd
                                                        if (responsiblePerson!==data.object.responsiblePerson) element.responsiblePerson = responsiblePerson
                                                        if (JSON.stringify(phone)!==JSON.stringify(data.object.phone)) element.phone = phone
                                                        if (JSON.stringify(email)!==JSON.stringify(data.object.email)) element.email = email
                                                        await setLegalObject(element)
                                                        Router.reload()
                                                    }
                                                }
                                                setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            } else
                                                showSnackBar('?????????????????? ?????? ????????')
                                        }}>
                                            ??????????????????
                                        </Button>
                                        {
                                            '????????????????'!==profile.role&&router.query.id!=='new'?
                                                <>
                                                <Button color={status==='active'?'primary':'secondary'} onClick={()=>{
                                                    const action = async() => {
                                                        await onoffLegalObject(router.query.id)
                                                        setStatus(status==='active'?'deactive':'active')
                                                    }
                                                    setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                                    showMiniDialog(true)
                                                }}>
                                                    {status==='active'?'??????????????????':'????????????????'}
                                                </Button>
                                                <Button color='secondary' onClick={()=>{
                                                    const action = async() => {
                                                        await deleteLegalObject(router.query.id)
                                                        Router.push(`/legalobjects`)
                                                    }
                                                    setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                                    showMiniDialog(true)
                                                }}>
                                                    ??????????????
                                                </Button>
                                                </>
                                                :
                                                null
                                        }
                                        </>
                                        :
                                        <Button color='primary' onClick={()=>{
                                            const action = async() => {
                                                await restoreLegalObject(router.query.id)
                                                Router.push(`/legalobjects`)
                                            }
                                            setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        }}>
                                            ????????????????????????
                                        </Button>
                                    :
                                    null
                            }
                        </div>
                        </>
                        :
                        '???????????? ???? ??????????????'
                }
                </CardContent>
            </Card>
        </App>
    )
})

LegalObject.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', '??????????????????????', '????????????????'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            object:ctx.query.id!=='new'?await getLegalObject({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined):{ofd: true, name: '', inn: '', address: '', phone: [], taxpayerType: '', ugns: '', responsiblePerson: ''}
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