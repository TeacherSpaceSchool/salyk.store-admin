import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, { useState } from 'react';
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
import dynamic from 'next/dynamic'
const Geo = dynamic(import('../../components/dialog/Geo'), { ssr: false });
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { ugnsTypes, bTypes, pTypes } from '../../src/const'
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

const Branch = React.memo((props) => {
    const { profile } = props.user;
    const classes = branchStyle();
    const { data } = props;
    const { isMobileApp } = props.app;
    const { showSnackBar } = props.snackbarActions;
    const { setBranch } = props.appActions;
    let [name, setName] = useState(data.object?data.object.name:'');
    let [address, setAddress] = useState(data.object?data.object.address:'');
    let [geo, setGeo] = useState(data.object&&data.object.geo?cloneObject(data.object.geo):undefined);
    let [ugns, setUgns] = useState(data.object?data.object.ugns:'');
    let [bType, setBType] = useState(data.object?data.object.bType:'');
    let [pType, setPType] = useState(data.object?data.object.pType:'');
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
    return (
        <App pageName={data.object!==null?router.query.id==='new'?'????????????????':data.object.name:'???????????? ???? ??????????????'}>
            <Head>
                <title>{data.object!==null?router.query.id==='new'?'????????????????':data.object.name:'???????????? ???? ??????????????'}</title>
                <meta name='description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:title' content={data.object!==null?router.query.id==='new'?'????????????????':data.object.name:'???????????? ???? ??????????????'} />
                <meta property='og:description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/branch/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/branch/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                <div className={classes.status}>
                    {
                        router.query.id!=='new'&&profile.role!=='????????????????'?
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
                                        ????????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/cashboxes/[id]' as={`/cashboxes/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        ??????????
                                    </MenuItem>
                                </Link>
                                <Link href='/workshifts/[id]' as={`/workshifts/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        ??????????
                                    </MenuItem>
                                </Link>
                                <Link href='/sales/[id]' as={`/sales/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        ????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/deposithistorys/[id]' as={`/deposithistorys/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        ????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/withdrawhistorys/[id]' as={`/withdrawhistorys/${legalObject._id}`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        ??????????????
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'X'}}} as={`/reports/${legalObject._id}?type=X`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        X-??????????
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'Z'}}} as={`/reports/${legalObject._id}?type=Z`}>
                                    <MenuItem onClick={()=>{setBranch({_id: router.query.id, name})}}>
                                        Z-??????????
                                    </MenuItem>
                                </Link>
                            </Menu>
                            <Button onClick={handleMenuQuick} color='primary'>
                                ??????????????
                            </Button>
                            </>
                            :
                            null
                    }
                    {
                        ['admin', 'superadmin', '????????????????'].includes(profile.role)&&profile.statistic&&data.object&&data.object._id?
                            <>
                            {
                                data.object.sync?
                                    <SyncOn color='primary' onClick={async()=>{
                                        setMiniDialog('??????????????????????????', <ViewText text={data.object.syncMsg}/>)
                                        showMiniDialog(true)
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
                                        if(profile.statistic) {
                                            setMiniDialog('??????????????', <History where={data.object._id}/>)
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
                        {['superadmin', 'admin', '????????????????'].includes(profile.role)&&profile.add?
                            <>
                            {
                                router.query.id!=='new'?
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
                            {
                                router.query.id!=='new'?
                                    <Link href='/legalobject/[id]' as={`/legalobject/${data.object.legalObject._id}`}>
                                        <a>
                                            <div className={classes.row}>
                                                <div className={classes.nameField}>
                                                    ????????????????????????????????:&nbsp;
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
                                        label={'??????????????????????????????????'}
                                    />
                            }
                            <TextField
                                label='????????????????'
                                error={!name}
                                value={name}
                                className={classes.input}
                                onChange={(event)=>{setName(event.target.value)}}
                            />
                            <Autocomplete
                                className={classes.input}
                                options={Object.keys(ugnsTypes)}
                                value={ugns}
                                getOptionLabel={option => option}
                                noOptionsText='???????????? ???? ??????????????'
                                onChange={(event, newValue) => {
                                    setUgns(newValue)
                                }}
                                renderInput={(params) => <TextField error={!ugns} {...params} label='?????????????????? ??????????' variant='standard' />}
                            />
                            <Autocomplete
                                className={classes.input}
                                options={pTypes}
                                value={pType}
                                getOptionLabel={option => option}
                                noOptionsText='???????????? ???? ??????????????'
                                onChange={(event, newValue) => {
                                    setPType(newValue)
                                }}
                                renderInput={(params) => <TextField error={!pType} {...params} label='??????' variant='standard' />}
                            />
                            <Autocomplete
                                className={classes.input}
                                options={bTypes}
                                value={bType}
                                getOptionLabel={option => option}
                                noOptionsText='???????????? ???? ??????????????'
                                onChange={(event, newValue) => {
                                    setBType(newValue)
                                }}
                                renderInput={(params) => <TextField error={!bType} {...params} label='?????? ??????????????' variant='standard' />}
                            />
                            <TextField
                                error={!address}
                                label='??????????'
                                value={address}
                                className={classes.input}
                                onChange={(event)=>{setAddress(event.target.value)}}
                            />
                            <div className={classes.geo} style={{color: geo?'#10183D':'red'}} onClick={()=>{
                                setFullDialog('????????????????????', <Geo change={true} geo={geo} setAddressGeo={setGeo}/>)
                                showFullDialog(true)
                            }}>
                                {
                                    geo?
                                        '???????????????? ????????????????????'
                                        :
                                        '?????????????? ????????????????????'
                                }
                            </div>
                            </>
                            :
                            ['??????????????????????', '??????????????????????', 'admin', '????????????????'].includes(profile.role)?
                                <>
                                {
                                    ['admin', '????????????????'].includes(profile.role)?
                                        <>
                                        <div className={classes.row}>
                                            <div className={classes.nameField}>
                                                ??????????????????????:&nbsp;
                                            </div>
                                            <div className={classes.value}>
                                                {pdDDMMYYHHMM(data.object.createdAt)}
                                            </div>
                                        </div>
                                        <Link href='/legalobject/[id]' as={`/legalobject/${data.object.legalObject._id}`}>
                                            <a>
                                                <div className={classes.row}>
                                                    <div className={classes.nameField}>
                                                        ????????????????????????????????:&nbsp;
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
                                        ????????????????:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {name}
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
                                <div className={classes.geo} style={{color: geo?'#10183D':'red'}} onClick={()=>{
                                    setFullDialog('????????????????????', <Geo geo={geo}/>)
                                    showFullDialog(true)
                                }}>
                                    ?????????????????????? ????????????????????
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        ?????????????????? ??????????:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {ugns}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        ?????? ??????????????????????:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {data.object.regType}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        ??????:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {pType}
                                    </div>
                                </div>
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        ?????? ??????????????:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {bType}
                                    </div>
                                </div>
                                </>
                                :
                                '???????????? ???? ??????????????'
                        }
                        <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                            {
                                ['admin', 'superadmin', '????????????????'].includes(profile.role)&&profile.add?
                                    !data.object.del?
                                        <>
                                        <Button color='primary' onClick={()=>{
                                            if (legalObject&&name.length&&address.length&&pType.length&&bType.length&&ugns.length) {
                                                const action = async() => {
                                                    if(router.query.id==='new') {
                                                        let res = await addBranch({legalObject: legalObject._id, bType, pType, ugns, name, address, geo})
                                                        Router.push(`/branch/${res}`)
                                                        showSnackBar('??????????????', 'success')
                                                    }
                                                    else {
                                                        let element = {_id: router.query.id}
                                                        if (JSON.stringify(geo)!==JSON.stringify(data.object.geo)) element.geo = geo
                                                        if (name!==data.object.name) element.name = name
                                                        if (address!==data.object.address) element.address = address
                                                        if (ugns!==data.object.ugns) element.ugns = ugns
                                                        if (bType!==data.object.bType) element.bType = bType
                                                        if (pType!==data.object.pType) element.pType = pType
                                                        await _setBranch(element)
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
                                            profile.role!=='????????????????'?
                                                <Button color='secondary' onClick={()=>{
                                                    const action = async() => {
                                                        await deleteBranch(router.query.id)
                                                        Router.push(`/branchs/${legalObject._id}`)
                                                    }
                                                    setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                                    showMiniDialog(true)
                                                }}>
                                                    ??????????????
                                                </Button>
                                                :
                                                null
                                        }
                                            </>
                                        :
                                        <Button color='primary' onClick={()=>{
                                            const action = async() => {
                                                await restoreBranch(router.query.id)
                                                Router.push(`/branchs/${legalObject._id}`)
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

Branch.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', '??????????????????????', '??????????????????????', '????????????????'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            object:ctx.query.id!=='new'?await getBranch({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined):{legalObject: undefined, bType: '', pType: '', ugns: '', name: '', address: '', geo: undefined}
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