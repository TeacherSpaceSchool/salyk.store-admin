import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import cardLegalObjectStyle from '../src/styleMUI/card'
import { connect } from 'react-redux'
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import { onoffLegalObject, restoreLegalObject } from '../src/gql/legalObject'
import Confirmation from '../components/dialog/Confirmation'
import { pdDDMMYYHHMM } from '../src/lib'
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';

const CardLegalObject = React.memo((props) => {
    const classes = cardLegalObjectStyle();
    const { element, setList, list, idx, link, query } = props;
    const { isMobileApp } = props.app;
    const { profile } = props.user;
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    let [status, setStatus] = useState(element!==undefined?element.status:'');
    let [linkAs, setLinkAs] = useState(`/${link}/${element._id}`);
    useEffect(()=>{
        if(query){
            const keys = Object.keys(query)
            for(let i = 0; i<keys.length; i++) {
                linkAs+=`${!i?'?':''}${keys[i]}=${query[keys[i]]}${i!==(keys.length-1)?'&':''}`
            }
            setLinkAs(linkAs)
        }
    },[])
    return (
        <Card className={isMobileApp?classes.cardM:classes.cardD}>
            {
                ['admin', 'superadmin', 'оператор'].includes(profile.role)?
                    element.sync?
                        <SyncOn color='primary' className={classes.sync}/>
                        :
                        <SyncOff color='secondary' className={classes.sync}/>
                    :
                    null
            }
            <Link href={{pathname: `/${link}/[id]`, query}} as={linkAs}>
                <CardActionArea>
                    <CardContent>
                        <h3>
                            {element.name}
                        </h3>
                        {
                            element._id!=='super'?
                                <>
                                <br/>
                                {
                                    list?
                                        <>
                                        <div className={classes.row}>
                                            <div className={classes.nameField}>
                                                Регистрация:&nbsp;
                                            </div>
                                            <div className={classes.value}>
                                                {pdDDMMYYHHMM(element.createdAt)}
                                            </div>
                                        </div>
                                        <div className={classes.row}>
                                            <div className={classes.nameField}>
                                                ИНН:&nbsp;
                                            </div>
                                            <div className={classes.value}>
                                                {element.inn}
                                            </div>
                                        </div>
                                        <div className={classes.row}>
                                            <div className={classes.nameField}>
                                                Адрес:&nbsp;
                                            </div>
                                            <div className={classes.value}>
                                                {element.address}
                                            </div>
                                        </div>
                                        {
                                            element.phone.length?
                                                <div className={classes.row}>
                                                    <div className={classes.nameField}>
                                                        Телефон:&nbsp;
                                                    </div>
                                                    <div>
                                                        {element.phone.map((phone, idx)=>
                                                            idx<4?
                                                                <div key={`phone${idx}`} className={classes.value}>
                                                                    +996{phone}
                                                                </div>
                                                                :
                                                                idx===4?
                                                                    '...'
                                                                    :
                                                                    null
                                                        )}
                                                    </div>
                                                </div>
                                                :
                                                null
                                        }
                                        </>
                                        :
                                        <div className={classes.row}>
                                            <div className={classes.nameField}>
                                                ИНН:&nbsp;
                                            </div>
                                            <div className={classes.value}>
                                                {element.inn}
                                            </div>
                                        </div>

                                }
                                </>
                                :
                                null
                        }
                    </CardContent>
                </CardActionArea>
            </Link>
            {
                list&&['admin', 'superadmin'].includes(profile.role)&&profile.add?
                    <CardActions>
                        {
                            !element.del?
                                <Button onClick={async()=>{
                                    const action = async() => {
                                        await onoffLegalObject(element._id)
                                        setStatus(status==='active'?'deactive':'active')
                                    }
                                    setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                    showMiniDialog(true)
                                }} color={status==='active'?'primary':'secondary'}>
                                    {status==='active'?'Отключить':'Включить'}
                                </Button>
                                :
                                null
                        }
                    </CardActions>
                    :
                    null
            }
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLegalObject)