import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../layouts/App';
import { connect } from 'react-redux'
import { getLegalObjects, getLegalObjectsCount } from '../src/gql/legalObject'
import pageListStyle from '../src/styleMUI/list'
import CardLegalObject from '../components/CardLegalObject'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import { urlMain } from '../redux/constants/other'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import CardLegalObjectPlaceholder from '../components/CardPlaceholder'
import { getClientGqlSsr } from '../src/getClientGQL'
import initialApp from '../src/initialApp'
import Router from 'next/router'
const height = 92

const Users = React.memo((props) => {
    const classes = pageListStyle();
    const { data } = props;
    let [list, setList] = useState(data.list);
    let [count, setCount] = useState(data.count);
    const { search } = props.app;
    const { profile } = props.user;
    let searchTimeOut = useRef(null);
    const initialRender = useRef(true);
    const getList = async ()=>{
        setList(await getLegalObjects({skip: 0, search}))
        setCount(await getLegalObjectsCount({search}));
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
            let addedList = await getLegalObjects({skip: list.length, search, })
            if(addedList.length>0)
                setList([...list, ...addedList])
            else
                paginationWork.current = false
        }
    }
    return (
        <App checkPagination={checkPagination} searchShow={true} pageName='Пользователи'>
            <Head>
                <title>Пользователи</title>
                <meta name='description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Пользователи' />
                <meta property='og:description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/users`} />
                <link rel='canonical' href={`${urlMain}/users`}/>
            </Head>
            <div className='count'>
                {`Всего: ${count}`}
            </div>
            <div className={classes.page}>
                {
                    ['admin', 'superadmin'].includes(profile.role)?
                        <CardLegalObject link='users' element={{name: 'SuperKassa', _id: 'super'}}/>
                        :
                        null
                }
                {list?list.map((element)=>
                    <LazyLoad scrollContainer={'.App-body'} key={element._id} height={height} offset={[height, 0]} debounce={0} once={true}  placeholder={<CardLegalObjectPlaceholder height={height}/>}>
                        <CardLegalObject link='users' element={element}/>
                    </LazyLoad>
                ):null}
            </div>
            {
                ['admin', 'superadmin', 'оператор'].includes(profile.role)&&profile.add?
                    <Link href='/user/[id]' as={`/user/new`}>
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

Users.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin', 'оператор'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    return {
        data: {
            list: await getLegalObjects({skip: 0}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
            count: await getLegalObjectsCount({}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
        }
    };
};

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app,
    }
}

export default connect(mapStateToProps)(Users);