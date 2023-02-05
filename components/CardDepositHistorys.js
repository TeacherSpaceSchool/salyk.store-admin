import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import cardStyle from '../src/styleMUI/card'
import { connect } from 'react-redux'
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from 'next/link';
import { pdDDMMYYHHMM } from '../src/lib'

const CardDepositHistorys = React.memo((props) => {
    const classes = cardStyle();
    const { element } = props;
    const { isMobileApp } = props.app;
    const { profile } = props.user;
    return (
        <Link href='/deposithistory/[id]' as={`/deposithistory/${element._id}`}>
            <Card className={isMobileApp?classes.cardM:classes.cardD}>
                <CardActionArea>
                    <CardContent>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Номер:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.number}
                            </div>
                        </div>
                        {
                            ['admin', 'superadmin'].includes(profile.role)?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Налогоплательщик:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.legalObject.name}
                                    </div>
                                </div>
                                :
                                null
                        }
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Объект:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.branch.name}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Смена:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.workShift.number}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Кассир:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.cashier.name}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Касса:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.cashbox.name}
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Дата:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {pdDDMMYYHHMM(element.createdAt)}
                            </div>
                        </div>
                        {
                            element.comment.length?
                                <div className={classes.row}>
                                    <div className={classes.nameField}>
                                        Обоснование:&nbsp;
                                    </div>
                                    <div className={classes.value}>
                                        {element.comment}
                                    </div>
                                </div>
                                :
                                null
                        }
                        <div className={classes.row}>
                            <div className={classes.nameField}>
                                Внесено:&nbsp;
                            </div>
                            <div className={classes.value}>
                                {element.amount.toFixed(2)} сом
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
})

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user,
    }
}

export default connect(mapStateToProps)(CardDepositHistorys)