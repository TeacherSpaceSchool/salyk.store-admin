import initialApp from '../../src/initialApp'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import {getWorkShift, _setWorkShift, endWorkShift} from '../../src/gql/workShift'
import workShiftStyle from '../../src/styleMUI/list'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as appActions from '../../redux/actions/app'
import { useRouter } from 'next/router'
import Router from 'next/router'
import * as userActions from '../../redux/actions/user'
import * as snackbarActions from '../../redux/actions/snackbar'
import Confirmation from '../../components/dialog/Confirmation'
import SetFloat from '../../components/dialog/SetFloat'
import { urlMain } from '../../redux/constants/other'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { pdDDMMYYHHMM, checkFloat } from '../../src/lib'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import {generateReportX} from '../../src/gql/report'
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import ViewText from '../../components/dialog/ViewText';

const WorkShift = React.memo((props) => {
    const { profile } = props.user;
    const classes = workShiftStyle();
    const { data} = props;
    const { isMobileApp } = props.app;
    let [deposit, setDeposit] = useState(data.object?data.object.deposit:0);
    let [withdraw, setWithdraw] = useState(data.object?data.object.withdraw:0);
    let [cashEnd, setCashEnd] = useState(data.object?data.object.cashEnd:0);
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { setWorkShift } = props.appActions;
    const { showSnackBar } = props.snackbarActions;
    const router = useRouter()
    const [anchorElQuick, setAnchorElQuick] = useState(null);
    const openQuick = Boolean(anchorElQuick);
    let handleMenuQuick = (event) => {
        setAnchorElQuick(event.currentTarget);
    }
    let handleCloseQuick = () => {
        setAnchorElQuick(null);
    }
    let [expired, setExpired] = useState(false);
    useEffect(()=>{
        if(!data.object.end){
            setExpired(((new Date()-data.object.start)/1000/60/60)>24)
        }
    }, []);
    return (
        <App pageName={data.object?router.query.id==='new'?'????????????????':`?????????? ???${data.object.number}`:'???????????? ???? ??????????????'}>
            <Head>
                <title>{data.object?router.query.id==='new'?'????????????????':`?????????? ???${data.object.number}`:'???????????? ???? ??????????????'}</title>
                <meta name='description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:title' content={data.object?router.query.id==='new'?'????????????????':`?????????? ???${data.object.number}`:'???????????? ???? ??????????????'} />
                <meta property='og:description' content='SALYK.STORE(???????????? ??????) - ?????? ???????????????????????????????????? ?????????????????????? ???????????????? ??????????????, ?????????????? ???????????????????????? ?????????? ?????????????????????? ?????????????????????? ?????????????????????? ?? PlayMarket ?? Appstore ?? ???????????????????????? ?????????? ?????????? ???????? ?? ???????????????? (????????????????????????/???????????????????? ??????????????????, ?????????????????? ?????????????? ?? ???????????? ?????????????????????? ????????????????), ?????????????????????????? ???????????????? ??????????????????????????????????????, ?? ?????????????? ???????????????? ?????????? ???????????????????? ???????????????? ????????????????.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/workshift/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/workshift/${router.query.id}`}/>
            </Head>
            <Card className={classes.page}>
                <div className={classes.status}>
                    {
                        '????????????????'!==profile.role?
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
                                <Link href='/sales/[id]' as={`/sales/${data.object.legalObject._id}`}>
                                    <MenuItem onClick={()=>{setWorkShift({_id: router.query.id, number: data.object.number})}}>
                                        ????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/deposithistorys/[id]' as={`/deposithistorys/${data.object.legalObject._id}`}>
                                    <MenuItem onClick={()=>{setWorkShift({_id: router.query.id, number: data.object.number})}}>
                                        ????????????????
                                    </MenuItem>
                                </Link>
                                <Link href='/withdrawhistorys/[id]' as={`/withdrawhistorys/${data.object.legalObject._id}`}>
                                    <MenuItem onClick={()=>{setWorkShift({_id: router.query.id, number: data.object.number})}}>
                                        ??????????????
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'X'}}} as={`/reports/${data.object.legalObject._id}?type=X`}>
                                    <MenuItem onClick={()=>{setWorkShift({_id: router.query.id, number: data.object.number})}}>
                                        X-??????????
                                    </MenuItem>
                                </Link>
                                <Link href={{pathname: '/reports/[id]', query: {type: 'Z'}}} as={`/reports/${data.object.legalObject._id}?type=Z`}>
                                    <MenuItem onClick={()=>{setWorkShift({_id: router.query.id, number: data.object.number})}}>
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
                    }
                    {
                        ['admin', 'superadmin', '????????????????'].includes(profile.role)&&data.object&&data.object._id?
                            data.object.sync?
                                <SyncOn color={data.object.syncMsg==='???????????????????? ?????????? ????????????????'?'secondary':'primary'} onClick={async()=>{
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
                        :
                        null
                    }
                </div>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignWorkShifts: 'flex-start'}}>
                    <br/>
                    {
                    data.object!==null?
                       <>
                       {
                           !data.object.end?
                               <div className={classes.nameField} style={{color: expired?'red':'green'}}>{expired?'C???????? ????????????????????':'????????????????'}</div>
                               :
                               null
                       }
                       <div className={classes.row}>
                           <div className={classes.nameField}>
                               ??????????:&nbsp;
                           </div>
                           <div className={classes.value}>
                               {data.object.number}
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
                       <Link href='/branch/[id]' as={`/branch/${data.object.branch._id}`}>
                           <a>
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.branch.name}
                                   </div>
                               </div>
                           </a>
                       </Link>
                       <Link href='/cashbox/[id]' as={`/cashbox/${data.object.cashbox._id}`}>
                           <a>
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.cashbox.name}
                                   </div>
                               </div>
                           </a>
                       </Link>
                       <Link href='/user/[id]' as={`/user/${data.object.cashier._id}`}>
                           <a>
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.cashier.name}
                                   </div>
                               </div>
                           </a>
                       </Link>
                       <div className={classes.row}>
                           <div className={classes.nameField}>
                               ????????????:&nbsp;
                           </div>
                           <div className={classes.value}>
                               {pdDDMMYYHHMM(data.object.start)}
                           </div>
                       </div>
                       {
                           data.object.end?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {pdDDMMYYHHMM(data.object.end)}
                                   </div>
                               </div>
                               :
                               null
                       }
                       <div className={classes.row}>
                           <div className={classes.nameField}>
                               ???????????????? ???? ????????????:&nbsp;
                           </div>
                           <div className={classes.value}>
                               {data.object.cashStart} ??????
                           </div>
                       </div>
                       {
                           cashEnd!=undefined?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ???????????????? ???? ??????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {cashEnd} ??????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           deposit?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {deposit} ??????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           withdraw?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {withdraw} ??????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.cash?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.cash} ??????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.cashless ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ????????????????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.cashless} ??????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.discount ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.discount} ??????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.extra ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.extra} ??????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.sale||data.object.saleCount ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.sale} ?????? | {data.object.saleCount} ????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.returnedCount||data.object.returned ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.returned} ?????? | {data.object.returnedCount} ????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.consignationCount||data.object.consignation?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.consignation} ?????? | {data.object.consignationCount} ????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.paidConsignationCount||data.object.paidConsignation?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ?????????????????? ??????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.paidConsignation} ?????? | {data.object.paidConsignationCount} ????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.prepaymentCount||data.object.prepayment ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.prepayment} ?????? | {data.object.prepaymentCount} ????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.buy||data.object.buyCount ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ??????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.buy} ?????? | {data.object.buyCount} ????
                                   </div>
                               </div>
                               :
                               null
                       }
                       {
                           data.object.returnedBuy||data.object.returnedBuyCount ?
                               <div className={classes.row}>
                                   <div className={classes.nameField}>
                                       ?????????????? ??????????????:&nbsp;
                                   </div>
                                   <div className={classes.value}>
                                       {data.object.returnedBuy} ?????? | {data.object.returnedBuyCount} ????
                                   </div>
                               </div>
                               :
                               null
                       }
                       <div className={isMobileApp?classes.bottomDivM:classes.bottomDivD}>
                           {
                               !data.object.end?
                                   <>
                                   {
                                       !expired?
                                           <>
                                           {
                                               '????????????'===profile.role?
                                                   <>
                                                   <Button color='primary' onClick={()=>{
                                                       setMiniDialog('????????????', <SetFloat action={async (float, comment)=>{
                                                           if(float>0) {
                                                               let res = await _setWorkShift({deposit: checkFloat(float), withdraw: 0, comment})
                                                               if(res==='OK') {
                                                                   setDeposit(deposit + float)
                                                                   setCashEnd(cashEnd + float)
                                                               }
                                                           }
                                                           else
                                                               showSnackBar('?????????? ?????????????? ????????')
                                                       }}/>)
                                                       showMiniDialog(true)
                                                   }}>
                                                       ????????????
                                                   </Button>
                                                   {
                                                       cashEnd>0?
                                                           <Button color='primary' onClick={()=>{
                                                               setMiniDialog('????????????', <SetFloat action={async (float, comment)=>{
                                                                   if(float<=cashEnd&&float>0) {
                                                                       let res = await _setWorkShift({deposit: 0, withdraw: checkFloat(float), comment})
                                                                       if(res==='OK') {
                                                                           setWithdraw(withdraw + float)
                                                                           setCashEnd(cashEnd - float)
                                                                       }
                                                                   }
                                                                   else if(float<1)
                                                                       showSnackBar('?????????? ?????????????? ????????')
                                                                   else
                                                                       showSnackBar('?????????? ?????????????? ????????????')
                                                               }}/>)
                                                               showMiniDialog(true)
                                                           }}>
                                                               ????????????
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
                                                       Router.push(`/report/${await generateReportX({cashbox: data.object.cashbox._id})}?type=X`)
                                                       /*const action = async() => {
                                                       }
                                                       setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                                       showMiniDialog(true)*/
                                                   }}>
                                                       X-??????????
                                                   </Button>
                                                   :
                                                   null
                                           }
                                           </>
                                           :
                                           null
                                   }
                                   {
                                       profile.role!=='admin'||profile.add||expired?
                                           <Button color='secondary' onClick={()=>{
                                               const action = async() => {
                                                   let report = await endWorkShift(...['??????????????????????', '??????????????????????', 'admin', 'superadmin'].includes(profile.role)?[router.query.id]:[])
                                                   Router.push(`/report/${report}?type=Z`)
                                               }
                                               setMiniDialog('???? ???????????????', <Confirmation action={action}/>)
                                               showMiniDialog(true)
                                           }}>
                                               ?????????????? ??????????
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
                        '???????????? ???? ??????????????'
                }
                </CardContent>
            </Card>
        </App>
    )
})

WorkShift.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', '??????????????????????', '????????????', '??????????????????????'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            object: await getWorkShift({_id: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined)
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkShift);