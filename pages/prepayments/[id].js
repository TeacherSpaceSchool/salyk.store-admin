import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { getPrepayments, getPrepaymentsCount } from '../../src/gql/prepayment'
import pageListStyle from '../../src/styleMUI/list'
import CardPrepayment from '../../components/CardPrepayment'
import { urlMain } from '../../redux/constants/other'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import CardPrepaymentPlaceholder from '../../components/CardPlaceholder'
import { getClientGqlSsr } from '../../src/getClientGQL'
import initialApp from '../../src/initialApp'
import Router from 'next/router'
import { useRouter } from 'next/router'
const height = 146

const Prepayment = React.memo((props) => {
    const classes = pageListStyle();
    const { data } = props;
    let [list, setList] = useState(data.list);
    let [count, setCount] = useState(data.count);
    const router = useRouter()
    const { search } = props.app;
    let searchTimeOut = useRef(null);
    const initialRender = useRef(true);
    const getList = async ()=>{
        setList(await getPrepayments({legalObject: router.query.id, skip: 0, search}))
        setCount(await getPrepaymentsCount({legalObject: router.query.id, search}));
        (document.getElementsByClassName('App-body'))[0].scroll({top: 0, left: 0, behavior: 'instant' });
        forceCheck();
        paginationWork.current = true
    }
    useEffect(()=>{
        (async()=>{
            if(initialRender.current) {
                initialRender.current = false;
            } else {
                if(searchTimeOut.current)
                    clearTimeout(searchTimeOut.current)
                searchTimeOut.current = setTimeout(async()=>{
                    await getList()
                }, 500)

            }
        })()
    },[ search])
    let paginationWork = useRef(true);
    const checkPagination = async()=>{
        if(paginationWork.current){
            let addedList = await getPrepayments({skip: list.length, search, legalObject: router.query.id})
            if(addedList.length>0)
                setList([...list, ...addedList])
            else
                paginationWork.current = false
        }
    }
    return (
        <App checkPagination={checkPagination} searchShow={true} pageName='Аванс'>
            <Head>
                <title>Аванс</title>
                <meta name='description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Аванс' />
                <meta property='og:description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/prepayments/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/prepayments/${router.query.id}`}/>
            </Head>
            <div className='count'>
                {`Всего: ${count}`}
            </div>
            <div className={classes.page}>
                {list?list.map((element, idx)=>
                    <LazyLoad scrollContainer={'.App-body'} key={element._id} height={height} offset={[height, 0]} debounce={0} once={true}  placeholder={<CardPrepaymentPlaceholder height={height}/>}>
                        <CardPrepayment list={list} key={element._id} setList={setList} element={element} idx={idx}/>
                    </LazyLoad>
                ):null}
            </div>
        </App>
    )
})

Prepayment.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', 'управляющий', 'супервайзер', 'кассир'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            list: await getPrepayments({skip: 0, legalObject: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
            count: await getPrepaymentsCount({legalObject: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
        }
    };
};

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app,
    }
}

export default connect(mapStateToProps)(Prepayment);