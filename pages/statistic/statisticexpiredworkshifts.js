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
import { getStatisticExpiredWorkShifts } from '../../src/gql/statistic'
import { bindActionCreators } from 'redux'
import * as appActions from '../../redux/actions/app'

const StatisticExpiredWorkShifts = React.memo((props) => {
    const classes = pageListStyle();
    const { data } = props;
    const { isMobileApp } = props.app;
    useEffect(()=>{
        if(process.browser){
            let appBody = document.getElementsByClassName('App-body')
            appBody[0].style.paddingBottom = '0px'
        }
    },[process.browser])
    return (
        <App pageName='Просроченные смены'>
            <Head>
                <title>Просроченные смены</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Просроченные смены' />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/statistic/statisticexpiredworkshifts`} />
                <link rel='canonical' href={`${urlMain}/statistic/statisticexpiredworkshifts`}/>
            </Head>
            <Card className={classes.page}>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                    {
                        data?
                            <>
                            <Table row={(data.row).slice(1)} columns={data.columns} click={3}/>
                            <div className='count'>
                                <div className={classes.rowStatic}>{`Всего: ${data.row[0].data[0]}`}</div>
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

StatisticExpiredWorkShifts.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    ctx.store.getState().app.filter = false
    if(!['admin', 'superadmin'].includes(ctx.store.getState().user.profile.role)||!ctx.store.getState().user.profile.statistic)
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: await getStatisticExpiredWorkShifts(ctx.req?await getClientGqlSsr(ctx.req):undefined)
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

export default connect(mapStateToProps, mapDispatchToProps)(StatisticExpiredWorkShifts);