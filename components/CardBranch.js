import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import cardBranchStyle from '../src/styleMUI/card'
import { connect } from 'react-redux'
import Link from 'next/link';
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import { pdDDMMYYHHMM } from '../src/lib'
import SyncOn from '@material-ui/icons/Sync';
import SyncOff from '@material-ui/icons/SyncDisabled';
import { bTypes, pTypes } from '../src/const'

const CardBranch = React.memo((props) => {
    const classes = cardBranchStyle();
    const { element, list } = props;
    const { isMobileApp } = props.app;
    const { profile } = props.user;
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
            <Link href={list?'/branch/[id]':'#'} as={list?`/branch/${element._id}`:'#'}>
                <CardActionArea>
                    <CardContent>
                        <h3>
                            {element.name}
                        </h3>
                        <br/>
                        {
                            ['admin', 'superadmin'].includes(profile.role)?
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
                                        Налогоплательщик:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.legalObject.name}
                                    </div>
                                </div>
                                </>
                                :
                                null
                        }
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Тип:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.pType_v2?pTypes[element.pType_v2]:element.pType}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Деятельность:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.bType_v2?bTypes[element.bType_v2]:element.bType}
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
                    </CardContent>
                </CardActionArea>
            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardBranch)