import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { getDistricts, getDistrictsCount } from '../../src/gql/district'
import pageListStyle from '../../src/styleMUI/list'
import CardDistrict from '../../components/CardDistrict'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import { urlMain } from '../../redux/constants/other'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import CardDistrictPlaceholder from '../../components/CardPlaceholder'
import { getClientGqlSsr } from '../../src/getClientGQL'
import initialApp from '../../src/initialApp'
import Router from 'next/router'
import { useRouter } from 'next/router'
const height = 146

const District = React.memo((props) => {
    const classes = pageListStyle();
    const { data } = props;
    let [list, setList] = useState(data.list);
    let [count, setCount] = useState(data.count);
    const router = useRouter()
    const { search } = props.app;
    const { profile } = props.user;
    let searchTimeOut = useRef(null);
    const initialRender = useRef(true);
    const getList = async ()=>{
        setList(await getDistricts({legalObject: router.query.id, skip: 0, search}))
        setCount(await getDistrictsCount({legalObject: router.query.id, search}));
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
            let addedList = await getDistricts({skip: list.length, search, legalObject: router.query.id})
            if(addedList.length>0)
                setList([...list, ...addedList])
            else
                paginationWork.current = false
        }
    }
    return (
        <App checkPagination={checkPagination} searchShow={true} pageName='Районы'>
            <Head>
                <title>Районы</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Районы' />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/districts/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/districts/${router.query.id}`}/>
            </Head>
            <div className='count'>
                {`Всего: ${count}`}
            </div>
            <div className={classes.page}>
                {list?list.map((element, idx)=>
                    <LazyLoad scrollContainer={'.App-body'} key={element._id} height={height} offset={[height, 0]} debounce={0} once={true}  placeholder={<CardDistrictPlaceholder height={height}/>}>
                        <CardDistrict list={list} key={element._id} setList={setList} element={element} idx={idx}/>
                    </LazyLoad>
                ):null}
            </div>
            {
                ['admin', 'superadmin', 'управляющий'].includes(profile.role)&&profile.add?
                    <Link href='/district/[id]' as={`/district/new`}>
                        <Fab color='primary' aria-label='add' className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </Link>
                    :
                    null
            }
        </App>
    )
})

District.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', 'управляющий', 'супервайзер'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            list: await getDistricts({skip: 0, legalObject: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
            count: await getDistrictsCount({legalObject: ctx.query.id}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
        }
    };
};

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app,
    }
}

export default connect(mapStateToProps)(District);