import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as userActions from '../../redux/actions/user'
import * as appActions from '../../redux/actions/app'
import appbarStyle from '../../src/styleMUI/appbar'
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Paper from '@material-ui/core/Paper';
import Cancel from '@material-ui/icons/Cancel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/SearchRounded';
import Sort from '@material-ui/icons/SortRounded';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FilterList from '@material-ui/icons/FilterListRounded';
import DateRange from '@material-ui/icons/DateRange';
import StoreIcon from '@material-ui/icons/Store';
import AccessTimeIcon from '@material-ui/icons/Timelapse';
import CashierIcon from '../../icons/cashier.svg';
import PointofsaleIcon from '../../icons/pointofsale.svg';
import PermIdentity from '../../icons/manageaccount.svg';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import Sign from '../dialog/Sign'
import Confirmation from '../dialog/Confirmation'
import SetDate from '../dialog/SetDate'
import SetBranch from '../dialog/SetBranch'
import SetCashbox from '../dialog/SetCashbox'
import SetCashier from '../dialog/SetCashier'
import SetClient from '../dialog/SetClient'
import SetLegalObject from '../dialog/SetLegalObject'
import {pdDDMMYY} from '../../src/lib';
import Router from 'next/router'

const MyAppBar = React.memo((props) => {
    //props
    const initialRender = useRef(true);
    const classes = appbarStyle();
    const { filters, sorts, pageName, dates, searchShow, unread, defaultOpenSearch, filterShow} = props
    const { drawer, search, filter, sort, isMobileApp, date, legalObject, branch, cashbox, client, cashier, workShift } = props.app;
    const { showDrawer, setSearch, setFilter, setSort, setDate, setLegalObject, setBranch, setCashbox, setClient, setCashier, setWorkShift } = props.appActions;
    const { authenticated, profile } = props.user;
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { logout } = props.userActions;
    //state
    const [anchorElMobileMenu, setAnchorElMobileMenu] = React.useState(null);
    const openMobileMenu = Boolean(anchorElMobileMenu);
    let handleMobileMenu = (event) => {
        setAnchorElMobileMenu(event.currentTarget);
    }
    let handleCloseMobileMenu = () => {
        setAnchorElMobileMenu(null);
    }
    const [anchorElSort, setAnchorElSort] = useState(null);
    const openSort = Boolean(anchorElSort);
    let handleMenuSort = (event) => {
        setAnchorElSort(event.currentTarget);
    }
    let handleCloseSort = () => {
        setAnchorElSort(null);
    }
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const openProfile = Boolean(anchorElProfile);
    let handleMenuProfile = (event) => {
        setAnchorElProfile(event.currentTarget);
    }
    let handleCloseProfile = () => {
        setAnchorElProfile(null);
    }
    const [anchorElFilter, setAnchorElFilter] = useState(null);
    const openFilter = Boolean(anchorElFilter);
    let handleMenuFilter = (event) => {
        setAnchorElFilter(event.currentTarget);
    }
    let handleCloseFilter = () => {
        setAnchorElFilter(null);
    }
    const [anchorElDate, setAnchorElDate] = useState(null);
    const openDate = Boolean(anchorElDate);
    let handleMenuDate = (event) => {
        setAnchorElDate(event.currentTarget);
    }
    let handleCloseDate = () => {
        setAnchorElDate(null);
    }
    const [anchorElBranch, setAnchorElBranch] = useState(null);
    const openBranch = Boolean(anchorElBranch);
    let handleMenuBranch = (event) => {
        setAnchorElBranch(event.currentTarget);
    }
    let handleCloseBranch = () => {
        setAnchorElBranch(null);
    }
    const [anchorElLegalObject, setAnchorElLegalObject] = useState(null);
    const openLegalObject = Boolean(anchorElLegalObject);
    let handleMenuLegalObject = (event) => {
        setAnchorElLegalObject(event.currentTarget);
    }
    let handleCloseLegalObject = () => {
        setAnchorElLegalObject(null);
    }
    const [anchorElCashbox, setAnchorElCashbox] = useState(null);
    const openCashbox = Boolean(anchorElCashbox);
    let handleMenuCashbox = (event) => {
        setAnchorElCashbox(event.currentTarget);
    }
    let handleCloseCashbox = () => {
        setAnchorElCashbox(null);
    }
    const [anchorElClient, setAnchorElClient] = useState(null);
    const openClient = Boolean(anchorElClient);
    let handleMenuClient = (event) => {
        setAnchorElClient(event.currentTarget);
    }
    let handleCloseClient = () => {
        setAnchorElClient(null);
    }
    const [anchorElWorkShift, setAnchorElWorkShift] = useState(null);
    const openWorkShift = Boolean(anchorElWorkShift);
    let handleMenuWorkShift = (event) => {
        setAnchorElWorkShift(event.currentTarget);
    }
    let handleCloseWorkShift = () => {
        setAnchorElWorkShift(null);
    }
    const [anchorElCashier, setAnchorElCashier] = useState(null);
    const openCashier = Boolean(anchorElCashier);
    let handleMenuCashier = (event) => {
        setAnchorElCashier(event.currentTarget);
    }
    let handleCloseCashier = () => {
        setAnchorElCashier(null);
    }
    const [openSearch, setOpenSearch] = useState(defaultOpenSearch);
    let handleSearch = (event) => {
        setSearch(event.target.value)
    };
    useEffect(()=>{
        if(initialRender.current) {
            initialRender.current = false;
        } else {
            if (document.getElementById('search'))
                document.getElementById('search').focus();
        }
    },[openSearch])
    return (
        <div className={classes.root}>
            <AppBar position='fixed' className='appBar'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        aria-owns='menu-appbar'
                        aria-haspopup='true'
                        onClick={() => {showDrawer(!drawer)}}
                        color='inherit'
                    >
                        <Badge variant='dot' invisible={openSearch||!isMobileApp||!unread.orders&&!unread.returneds} color='secondary'>
                            <MenuIcon/>
                        </Badge>
                    </IconButton>
                    <Typography onClick={() => {showDrawer(!drawer)}} variant='h6' className={classes.title}>
                        {pageName}
                    </Typography>
                    {isMobileApp?
                        openSearch?
                            <Paper className={classes.searchM}>
                                <Input className={classes.searchField}
                                       type={'login'}
                                       value={search}
                                       onChange={handleSearch}
                                       endAdornment={
                                           <InputAdornment position='end'>
                                               <IconButton aria-label='Search' onClick={()=>{setSearch('');setOpenSearch(false)}}>
                                                   <Cancel />
                                               </IconButton>
                                           </InputAdornment>
                                       }/>
                            </Paper>
                            :
                            <>
                            {
                                (filterShow&&(filterShow.legalObject||filterShow.cashbox||filterShow.branch||filterShow.cashier||filterShow.client))||dates||searchShow||filters||sorts?
                                    <IconButton
                                        style={{background: filterShow&&(filterShow.legalObject&&legalObject||filterShow.cashbox&&cashbox||filterShow.branch&&branch||filterShow.cashier&&cashier||filterShow.client&&client)||date||filter?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-owns={openMobileMenu ? 'menu-appbar' : undefined}
                                        aria-haspopup='true'
                                        onClick={handleMobileMenu}
                                        color='inherit'
                                    >
                                        <Search />
                                    </IconButton>
                                    :
                                    null
                            }
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElMobileMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                open={openMobileMenu}
                                onClose={handleCloseMobileMenu}
                            >
                                {
                                    searchShow?
                                        <MenuItem key='search' onClick={()=>{
                                            setOpenSearch(true);handleCloseMobileMenu()
                                        }}>
                                            <div style={{display: 'flex'}}>
                                                <Search/>&nbsp;??????????
                                            </div>
                                        </MenuItem>
                                        :
                                        null
                                }
                                {filters&&filters.length>0?
                                    [
                                        <MenuItem key='filterMenu' style={{background: filter?'rgba(0, 0, 0, 0.1)':'transparent'}} onClick={handleMenuFilter}>
                                            <div style={{display: 'flex'}}>
                                                <FilterList/>&nbsp;{filter?filter:'????????????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='filter'
                                            id='menu-appbar'
                                            anchorEl={anchorElFilter}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openFilter}
                                            onClose={handleCloseFilter}
                                        >
                                            {filters.map((elem, idx)=><MenuItem key={'filter'+idx} style={{background: filter===elem.value?'rgba(0, 0, 0, 0.1)': '#fff'}}  onClick={()=>{setFilter(elem.value);handleCloseFilter();handleCloseMobileMenu();}}>{elem.name}</MenuItem>)}
                                        </Menu>
                                    ]
                                    :null
                                }
                                {sorts&&sorts.length>0?
                                    [
                                        <MenuItem key='sortMenu' onClick={handleMenuSort}>
                                            <div style={{display: 'flex'}}>
                                                <Sort/>&nbsp;????????????????????
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='sort'
                                            id='menu-appbar'
                                            anchorEl={anchorElSort}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            open={openSort}
                                            onClose={handleCloseSort}
                                        >
                                            {sorts.map((elem, idx)=><MenuItem key={'sort'+idx} onClick={()=>{sort===`-${elem.field}`?setSort(elem.field):setSort(`-${elem.field}`);handleCloseSort();handleCloseMobileMenu()}}>{sort===`-${elem.field}`?<ArrowDownward />:sort===elem.field?<ArrowUpward />:<div style={{width: '24px'}}/>}{elem.name}</MenuItem>)}
                                        </Menu>
                                    ]
                                    :null
                                }
                                {dates?
                                    [
                                        <MenuItem key='dateMenu' onClick={handleMenuDate} style={{background: date?'rgba(0, 0, 0, 0.1)':'transparent'}}>
                                            <div style={{display: 'flex'}}>
                                                <DateRange/>&nbsp;{date?pdDDMMYY(date):'????????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='date'
                                            id='menu-appbar'
                                            anchorEl={anchorElDate}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openDate}
                                            onClose={handleCloseDate}
                                        >
                                            <MenuItem key='onDate' style={{background: date?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setMiniDialog('????????', <SetDate/>);showMiniDialog(true);handleCloseDate();handleCloseMobileMenu();}}>
                                                ???? ????????
                                            </MenuItem>
                                            <MenuItem key='allDate' style={{background: !date?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setDate(undefined);handleCloseDate();handleCloseMobileMenu();}}>
                                                ??????
                                            </MenuItem>
                                        </Menu>
                                    ]
                                    :null
                                }
                                {filterShow&&filterShow.legalObject&&['superadmin', 'admin', '????????????????'].includes(profile.role)?
                                    [
                                        <MenuItem key='LegalObjectMenu' onClick={handleMenuLegalObject} style={{background: legalObject?'rgba(0, 0, 0, 0.1)':'transparent'}}>
                                            <div style={{display: 'flex'}}>
                                                <BusinessCenterIcon/>&nbsp;{legalObject?legalObject.name:'????????????????????????????????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='LegalObject'
                                            id='menu-appbar'
                                            anchorEl={anchorElLegalObject}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openLegalObject}
                                            onClose={handleCloseLegalObject}
                                        >
                                            <MenuItem key='onLegalObject' style={{background: legalObject?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????????????????????????', <SetLegalObject/>);showMiniDialog(true);handleCloseLegalObject();handleCloseMobileMenu();}}>
                                                ???? ??????????????????????????????????
                                            </MenuItem>
                                            <MenuItem key='allLegalObject' style={{background: !legalObject?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setLegalObject(undefined);handleCloseLegalObject();handleCloseMobileMenu();}}>
                                                ??????
                                            </MenuItem>
                                        </Menu>
                                    ]
                                    :null
                                }
                                {legalObject&&filterShow&&filterShow.branch&&['superadmin', 'admin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                    [
                                        <MenuItem key='BranchMenu' onClick={handleMenuBranch} style={{background: branch?'rgba(0, 0, 0, 0.1)':'transparent'}}>
                                            <div style={{display: 'flex'}}>
                                                <StoreIcon/>&nbsp;{branch?branch.name:'????????????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='Branch'
                                            id='menu-appbar'
                                            anchorEl={anchorElBranch}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openBranch}
                                            onClose={handleCloseBranch}
                                        >
                                            <MenuItem key='onBranch' style={{background: branch?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????', <SetBranch/>);showMiniDialog(true);handleCloseBranch();handleCloseMobileMenu();}}>
                                                ???? ??????????????
                                            </MenuItem>
                                            <MenuItem key='allBranch' style={{background: !branch?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setBranch(undefined);handleCloseBranch();handleCloseMobileMenu();}}>
                                                ??????
                                            </MenuItem>
                                        </Menu>
                                    ]
                                    :null
                                }
                                {legalObject&&filterShow&&filterShow.cashbox&&['superadmin', 'admin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                    [
                                        <MenuItem key='CashboxMenu' onClick={handleMenuCashbox} style={{background: cashbox?'rgba(0, 0, 0, 0.1)':'transparent'}}>
                                            <div style={{display: 'flex'}}>
                                                <PointofsaleIcon/>&nbsp;{cashbox?cashbox.name:'??????????/??????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='Cashbox'
                                            id='menu-appbar'
                                            anchorEl={anchorElCashbox}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openCashbox}
                                            onClose={handleCloseCashbox}
                                        >
                                            <MenuItem key='onCashbox' style={{background: cashbox?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????', <SetCashbox/>);showMiniDialog(true);handleCloseCashbox();handleCloseMobileMenu();}}>
                                                ???? ??????????/??????
                                            </MenuItem>
                                            <MenuItem key='allCashbox' style={{background: !cashbox?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setCashbox(undefined);handleCloseCashbox();handleCloseMobileMenu();}}>
                                                ??????
                                            </MenuItem>
                                        </Menu>
                                    ]
                                    :null
                                }
                                {legalObject&&filterShow&&filterShow.workShift&&['superadmin', 'admin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                    [
                                        <MenuItem key='WorkShiftMenu' onClick={handleMenuWorkShift} style={{background: workShift?'rgba(0, 0, 0, 0.1)':'transparent'}}>
                                            <div style={{display: 'flex'}}>
                                                <AccessTimeIcon/>&nbsp;{workShift?workShift.number:'??????????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='WorkShift'
                                            id='menu-appbar'
                                            anchorEl={anchorElWorkShift}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openWorkShift}
                                            onClose={handleCloseWorkShift}
                                        >
                                            <MenuItem key='allWorkShift' style={{background: !workShift?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setWorkShift(undefined);handleCloseWorkShift();handleCloseMobileMenu();}}>
                                                ??????
                                            </MenuItem>
                                        </Menu>
                                    ]
                                    :null
                                }
                                {legalObject&&filterShow&&filterShow.cashier&&['superadmin', 'admin', '??????????????????????', '??????????????????????'].includes(profile.role)?
                                    [
                                        <MenuItem key='CashierMenu' onClick={handleMenuCashier} style={{background: cashier?'rgba(0, 0, 0, 0.1)':'transparent'}}>
                                            <div style={{display: 'flex'}}>
                                                <CashierIcon/>&nbsp;{cashier?cashier.name:'????????????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='Cashier'
                                            id='menu-appbar'
                                            anchorEl={anchorElCashier}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openCashier}
                                            onClose={handleCloseCashier}
                                        >
                                            <MenuItem key='onCashier' style={{background: cashier?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????', <SetCashier/>);showMiniDialog(true);handleCloseCashier();handleCloseMobileMenu();}}>
                                                ???? ??????????????
                                            </MenuItem>
                                            <MenuItem key='allCashier' style={{background: !cashier?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setCashier(undefined);handleCloseCashier();handleCloseMobileMenu();}}>
                                                ??????
                                            </MenuItem>
                                        </Menu>
                                    ]
                                    :null
                                }
                                {legalObject&&filterShow&&filterShow.client&&['superadmin', 'admin', '??????????????????????', '????????????', '??????????????????????'].includes(profile.role)?
                                    [
                                        <MenuItem key='ClientMenu' onClick={handleMenuClient} style={{background: client?'rgba(0, 0, 0, 0.1)':'transparent'}}>
                                            <div style={{display: 'flex'}}>
                                                <AssignmentIndIcon/>&nbsp;{client?client.name:'????????????'}
                                            </div>
                                        </MenuItem>,
                                        <Menu
                                            key='Client'
                                            id='menu-appbar'
                                            anchorEl={anchorElClient}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openClient}
                                            onClose={handleCloseClient}
                                        >
                                            <MenuItem key='onClient' style={{background: client?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????', <SetClient/>);showMiniDialog(true);handleCloseClient();handleCloseMobileMenu();}}>
                                                ???? ??????????????
                                            </MenuItem>
                                            <MenuItem key='allClient' style={{background: !client?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setClient(undefined);handleCloseClient();handleCloseMobileMenu();}}>
                                                ??????
                                            </MenuItem>
                                        </Menu>
                                    ]
                                    :null
                                }
                            </Menu>
                            <Tooltip title='??????????????'>
                                <IconButton
                                    aria-owns='menu-appbar'
                                    aria-haspopup='true'
                                    color='inherit'
                                    onClick={handleMenuProfile}
                                >
                                    <PermIdentity/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElProfile}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={openProfile}
                                onClose={handleCloseProfile}
                            >
                                {
                                    authenticated?
                                        [
                                            profile.role!=='superadmin'?
                                                <MenuItem key='profile' onClick={async()=>{
                                                    Router.push(`/user/${profile._id}`)
                                                    Router.reload()
                                                }}>
                                                    ??????????????
                                                </MenuItem>
                                                :
                                                null,
                                            <MenuItem key='outProfile' onClick={()=>{
                                                handleCloseProfile()
                                                const action = async() => {
                                                    logout(true)
                                                }
                                                setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                                showMiniDialog(true)
                                            }}>
                                                ??????????
                                            </MenuItem>
                                        ]
                                        :
                                        <MenuItem key='enterProfile' onClick={()=>{
                                            handleCloseProfile()
                                            setMiniDialog('????????', <Sign isMobileApp={isMobileApp}/>)
                                            showMiniDialog(true)
                                        }}>
                                            ??????????
                                        </MenuItem>
                                }
                            </Menu>
                            </>
                        :
                        openSearch?
                            <Paper className={classes.searchD}>
                                <Input className={classes.searchField}
                                       type={'login'}
                                       value={search}
                                       onChange={handleSearch}
                                       endAdornment={
                                           <InputAdornment position='end'>
                                               <IconButton aria-label='Search' onClick={()=>{setSearch('');setOpenSearch(false)}}>
                                                   <Cancel />
                                               </IconButton>
                                           </InputAdornment>
                                       }/>
                            </Paper>
                            :
                            <>
                            {filterShow&&filterShow.legalObject&&['superadmin', 'admin', '????????????????'].includes(profile.role)?
                                <>
                                <Tooltip title='????????????????????????????????'>
                                    <IconButton
                                        style={{background: legalObject?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-owns={openLegalObject ? 'menu-appbar' : undefined}
                                        aria-haspopup='true'
                                        onClick={handleMenuLegalObject}
                                        color='inherit'
                                    >
                                        <BusinessCenterIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    key='LegalObject'
                                    id='menu-appbar'
                                    anchorEl={anchorElLegalObject}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openLegalObject}
                                    onClose={handleCloseLegalObject}
                                >
                                    <MenuItem style={{background: legalObject?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????????????????????????', <SetLegalObject/>);showMiniDialog(true);handleCloseLegalObject();}}>
                                        {legalObject?legalObject.name:'???? ??????????????????????????????????'}
                                    </MenuItem>
                                    <MenuItem style={{background: !legalObject?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setLegalObject(undefined);handleCloseLegalObject();}}>
                                        ??????
                                    </MenuItem>
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {legalObject&&filterShow&&filterShow.branch&&['superadmin', 'admin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                <>
                                <Tooltip title='????????????'>
                                    <IconButton
                                        style={{background: branch?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-owns={openBranch ? 'menu-appbar' : undefined}
                                        aria-haspopup='true'
                                        onClick={handleMenuBranch}
                                        color='inherit'
                                    >
                                        <StoreIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    key='Branch'
                                    id='menu-appbar'
                                    anchorEl={anchorElBranch}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openBranch}
                                    onClose={handleCloseBranch}
                                >
                                    <MenuItem style={{background: branch?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????', <SetBranch/>);showMiniDialog(true);handleCloseBranch();}}>
                                        {branch?branch.name:'???? ??????????????'}
                                    </MenuItem>
                                    <MenuItem style={{background: !branch?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setBranch(undefined);handleCloseBranch();}}>
                                        ??????
                                    </MenuItem>
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {legalObject&&filterShow&&filterShow.cashbox&&['superadmin', 'admin', '??????????????????????', '??????????????????????', '????????????????'].includes(profile.role)?
                                <>
                                <Tooltip title='??????????/??????'>
                                    <IconButton
                                        style={{background: cashbox?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-owns={openCashbox ? 'menu-appbar' : undefined}
                                        aria-haspopup='true'
                                        onClick={handleMenuCashbox}
                                        color='inherit'
                                    >
                                        <PointofsaleIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    key='Cashbox'
                                    id='menu-appbar'
                                    anchorEl={anchorElCashbox}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openCashbox}
                                    onClose={handleCloseCashbox}
                                >
                                    <MenuItem style={{background: cashbox?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????', <SetCashbox/>);showMiniDialog(true);handleCloseCashbox();}}>
                                        {cashbox?cashbox.name:'???? ??????????/??????'}
                                    </MenuItem>
                                    <MenuItem style={{background: !cashbox?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setCashbox(undefined);handleCloseCashbox();}}>
                                        ??????
                                    </MenuItem>
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {legalObject&&filterShow&&filterShow.workShift&&['superadmin', 'admin', '??????????????????????', '??????????????????????'].includes(profile.role)?
                                <>
                                <Tooltip title='??????????'>
                                    <IconButton
                                        style={{background: workShift?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-owns={openWorkShift?'menu-appbar' : undefined}
                                        aria-haspopup='true'
                                        onClick={handleMenuWorkShift}
                                        color='inherit'
                                    >
                                        <AccessTimeIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    key='WorkShift'
                                    id='menu-appbar'
                                    anchorEl={anchorElWorkShift}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openWorkShift}
                                    onClose={handleCloseWorkShift}
                                >
                                    {
                                        workShift?
                                            <MenuItem style={{background: workShift?'rgba(0, 0, 0, 0.1)': '#fff'}}>
                                                {workShift.number}
                                            </MenuItem>
                                            :
                                            null
                                    }
                                    <MenuItem style={{background: !workShift?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setWorkShift(undefined);handleCloseWorkShift();}}>
                                        ??????
                                    </MenuItem>
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {legalObject&&filterShow&&filterShow.cashier&&['superadmin', 'admin', '??????????????????????', '??????????????????????'].includes(profile.role)?
                                <>
                                <Tooltip title='????????????'>
                                    <IconButton
                                        aria-owns={openCashier ? 'menu-appbar' : undefined}
                                        style={{background: cashier?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-haspopup='true'
                                        onClick={handleMenuCashier}
                                        color='inherit'
                                    >
                                        <CashierIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    key='Cashier'
                                    id='menu-appbar'
                                    anchorEl={anchorElCashier}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openCashier}
                                    onClose={handleCloseCashier}
                                >
                                    <MenuItem style={{background: cashier?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????', <SetCashier/>);showMiniDialog(true);handleCloseCashier();}}>
                                        {cashier?cashier.name:'???? ??????????????'}
                                    </MenuItem>
                                    <MenuItem style={{background: !cashier?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setCashier(undefined);handleCloseCashier();}}>
                                        ??????
                                    </MenuItem>
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {legalObject&&filterShow&&filterShow.client&&['superadmin', 'admin', '??????????????????????', '????????????', '??????????????????????'].includes(profile.role)?
                                <>
                                <Tooltip title='????????????'>
                                    <IconButton
                                        aria-owns={openClient ? 'menu-appbar' : undefined}
                                        style={{background: client?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-haspopup='true'
                                        onClick={handleMenuClient}
                                        color='inherit'
                                    >
                                        <AssignmentIndIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    key='Client'
                                    id='menu-appbar'
                                    anchorEl={anchorElClient}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openClient}
                                    onClose={handleCloseClient}
                                >
                                    <MenuItem style={{background: client?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={async ()=>{setMiniDialog('??????????????', <SetClient/>);showMiniDialog(true);handleCloseClient();}}>
                                        {client?client.name:'???? ??????????????'}
                                    </MenuItem>
                                    <MenuItem style={{background: !client?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setClient(undefined);handleCloseClient();}}>
                                        ??????
                                    </MenuItem>
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {dates?
                                <>
                                <Tooltip title='????????'>
                                    <IconButton
                                        aria-owns={openDate ? 'menu-appbar' : undefined}
                                        style={{background: date?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-haspopup='true'
                                        onClick={handleMenuDate}
                                        color='inherit'
                                    >
                                        <DateRange/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    key='Date'
                                    id='menu-appbar'
                                    anchorEl={anchorElDate}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openDate}
                                    onClose={handleCloseDate}
                                >
                                    <MenuItem style={{background: date?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setMiniDialog('????????', <SetDate/>);showMiniDialog(true);handleCloseDate();}}>
                                        {date?pdDDMMYY(date):'???? ????????'}
                                    </MenuItem>
                                    <MenuItem style={{background: !date?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setDate(undefined);handleCloseDate();}}>
                                        ??????
                                    </MenuItem>
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {filters&&filters.length>0?
                                <>
                                <Tooltip title='????????????'>
                                    <IconButton
                                        aria-owns={openFilter ? 'menu-appbar' : undefined}
                                        style={{background: filter?'rgba(255, 255, 255, 0.2)':'transparent'}}
                                        aria-haspopup='true'
                                        onClick={handleMenuFilter}
                                        color='inherit'
                                    >
                                        <FilterList/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id='menu-appbar'
                                    key='filter'
                                    anchorEl={anchorElFilter}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openFilter}
                                    onClose={handleCloseFilter}
                                >
                                    {filters.map((elem, idx)=><MenuItem key={'filter'+idx} style={{background: filter===elem.value?'rgba(0, 0, 0, 0.1)': '#fff'}} onClick={()=>{setFilter(elem.value);handleCloseFilter();}}>{elem.name}</MenuItem>)}
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {sorts&&sorts.length>0?
                                <>
                                <Tooltip title='????????????????????'>
                                    <IconButton
                                        aria-owns={openSort ? 'menu-appbar' : undefined}
                                        aria-haspopup='true'
                                        onClick={handleMenuSort}
                                        color='inherit'
                                    >
                                        <Sort />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id='menu-appbar'
                                    anchorEl={anchorElSort}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openSort}
                                    onClose={handleCloseSort}
                                    key='sort'
                                >
                                    {sorts.map((elem, idx)=><MenuItem key={'sort'+idx} onClick={()=>{sort===`-${elem.field}`?setSort(elem.field):setSort(`-${elem.field}`);handleCloseSort();}}>{sort===`-${elem.field}`?<ArrowDownward />:sort===elem.field?<ArrowUpward />:<div style={{width: '24px'}}/>}{elem.name}</MenuItem>)}
                                </Menu>
                                &nbsp;
                                </>
                                :null
                            }
                            {
                                searchShow?
                                    <Tooltip title='??????????'>
                                        <IconButton
                                            aria-owns={openSearch ? 'menu-appbar' : undefined}
                                            aria-haspopup='true'
                                            onClick={()=>{
                                                setOpenSearch(true)}}
                                            color='inherit'
                                        >
                                            <Search />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    null
                            }
                            <Tooltip title='??????????????'>
                                <IconButton
                                    aria-owns='menu-appbar'
                                    aria-haspopup='true'
                                    color='inherit'
                                    onClick={handleMenuProfile}
                                >
                                    <PermIdentity/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElProfile}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={openProfile}
                                onClose={handleCloseProfile}
                            >
                                {
                                    authenticated?
                                        [
                                            profile.role!=='superadmin'?
                                                <MenuItem key='profile' onClick={async()=>{
                                                    await Router.push(`/user/${profile._id}`)
                                                    await Router.reload()
                                                }}>
                                                    <div style={{display: 'flex'}}>
                                                        <PermIdentity/>&nbsp;??????????????
                                                    </div>
                                                </MenuItem>
                                            :
                                            null,
                                        <MenuItem key='logout' onClick={()=>{
                                            handleCloseProfile()
                                            const action = async() => {
                                                logout(true)
                                            }
                                            setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                            showMiniDialog(true)
                                        }}>
                                            <div style={{display: 'flex'}}>
                                                <ExitToApp/>&nbsp;??????????
                                            </div>
                                        </MenuItem>
                                        ]
                                        :
                                        <MenuItem onClick={()=>{
                                            handleCloseProfile()
                                            setMiniDialog('????????', <Sign isMobileApp={isMobileApp}/>)
                                            showMiniDialog(true)
                                        }}>
                                            <div style={{display: 'flex'}}>
                                                <ExitToApp/>&nbsp;??????????
                                            </div>
                                        </MenuItem>
                                }
                            </Menu>

                            </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
})

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar);
