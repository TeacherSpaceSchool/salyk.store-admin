import Head from 'next/head';
import React, { useEffect, useState, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import pageListStyle from '../../src/styleMUI/list'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Router from 'next/router'
import { urlMain } from '../../redux/constants/other'
import initialApp from '../../src/initialApp'
import Table from '../../components/app/Table'
import { getClientGqlSsr } from '../../src/getClientGQL'
import { getStatisticSale } from '../../src/gql/statistic'
import { pdDatePicker } from '../../src/lib'
import { bindActionCreators } from 'redux'
import * as appActions from '../../redux/actions/app'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
const dateTypes = ['День', 'Неделя', 'Месяц', 'Год']
const types = ['Налогоплательщик', 'Объект', 'Кассир']

const StatisticSale = React.memo((props) => {
    const classes = pageListStyle();
    const { data } = props;
    const [statistic, setStatistic] = useState(data);
    const { isMobileApp, legalObject, branch } = props.app;
    const initialRender = useRef(true);
    let [dateStart, setDateStart] = useState(pdDatePicker(new Date()));
    let [dateType, setDateType] = useState('День');
    let [show, setShow] = useState(false);
    let handleDateType = (event) => {
        setDateType(event.target.value)
    };
    let [type, setType] = useState('Налогоплательщик');
    let handleType =  (event) => {
        setType(event.target.value)
    };
    useEffect(()=>{
        if(process.browser){
            let appBody = document.getElementsByClassName('App-body')
            appBody[0].style.paddingBottom = '0px'
        }
    },[process.browser])
    useEffect(()=>{
        (async()=>{
            if(initialRender.current) {
                initialRender.current = false;
            } else {
                setStatistic(await getStatisticSale({dateType, type, dateStart, ...legalObject?{legalObject: legalObject._id}:{}, ...branch?{branch: branch._id}:{}}))
            }
        })()
    },[dateStart, dateType, legalObject, branch, type])
    return (
        <App pageName='Статистика операций' filterShow={{branch: true, legalObject: true}}>
            <Head>
                <title>Статистика операций</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Статистика операций' />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/statistic/statisticsale`} />
                <link rel='canonical' href={`${urlMain}/statistic/statisticsale`}/>
            </Head>
            <Card className={classes.page}>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                    {
                        statistic?
                            <>
                            <div className={classes.row}>
                                <FormControl className={classes.input}>
                                    <InputLabel>Тип данных</InputLabel>
                                    <Select value={type} onChange={handleType}>
                                        {types.map((element)=>
                                            <MenuItem key={element} value={element}>{element}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.input}>
                                    <InputLabel>Тип даты</InputLabel>
                                    <Select value={dateType} onChange={handleDateType}>
                                        {dateTypes.map((element)=>
                                            <MenuItem key={element} value={element}>{element}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                                <TextField
                                    className={classes.input}
                                    label='Дата начала'
                                    type='date'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={dateStart}
                                    onChange={ event => setDateStart(event.target.value) }
                                />
                            </div>
                            <Table row={(statistic.row).slice(1)} columns={statistic.columns}/>
                            <div className='count' onClick={()=>{setShow(!show)}}>
                                <div className={classes.rowStatic}>{`Продажи: ${statistic.row[0].data[0]}`}</div>
                                {
                                    show?
                                        <>
                                        <div className={classes.rowStatic}>{`Возвраты: ${statistic.row[0].data[1]}`}</div>
                                        <div className={classes.rowStatic}>{`Авансы: ${statistic.row[0].data[2]}`}</div>
                                        <div className={classes.rowStatic}>{`Кредиты: ${statistic.row[0].data[3]}`}</div>
                                        <div className={classes.rowStatic}>{`Погашение кредита: ${statistic.row[0].data[4]}`}</div>
                                        <div className={classes.rowStatic}>{`Покупка: ${statistic.row[0].data[5]}`}</div>
                                        <div className={classes.rowStatic}>{`Возвраты покупок: ${statistic.row[0].data[6]}`}</div>
                                        </>
                                        :
                                        null
                                }
                            </div>
                            </>
                            :
                            null
                    }
                </CardContent>
            </Card>
        </App>
    )
})

StatisticSale.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    ctx.store.getState().app.filter = false
    if(!['admin', 'superadmin', 'управляющий'].includes(ctx.store.getState().user.profile.role)||!ctx.store.getState().user.profile.statistic)
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    if(ctx.store.getState().user.profile.legalObject)
        ctx.store.getState().app.legalObject = {_id: ctx.store.getState().user.profile.legalObject}
    else
        ctx.store.getState().app.legalObject = undefined
    return {
        data: await getStatisticSale({
            dateType: 'День',
            type: 'Налогоплательщик',
            ...ctx.store.getState().user.profile.legalObject?{legalObject: ctx.store.getState().user.profile.legalObject}:{},
        }, ctx.req?await getClientGqlSsr(ctx.req):undefined)
    };
};

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {

        appActions: bindActionCreators(appActions, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticSale);