import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { getUsers, getUsersCount } from '../../src/gql/user'
import pageListStyle from '../../src/styleMUI/list'
import CardUser from '../../components/CardUser'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import { urlMain } from '../../redux/constants/other'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import CardUserPlaceholder from '../../components/CardPlaceholder'
import { getClientGqlSsr } from '../../src/getClientGQL'
import initialApp from '../../src/initialApp'
import Router from 'next/router'
import { useRouter } from 'next/router'
const height = 92
const filters = [
    {
        name: 'Все',
        value: ''
    },
    {
        name: 'Управляющий',
        value: 'управляющий'
    },
    {
        name: 'Супервайзер',
        value: 'супервайзер'
    },
    {
        name: 'Кассир',
        value: 'кассир'
    }
]

const User = React.memo((props) => {
    const classes = pageListStyle();
    const { data } = props;
    let [list, setList] = useState(data.list);
    let [count, setCount] = useState(data.count);
    const router = useRouter()
    const { search, filter, branch } = props.app;
    const { profile } = props.user;
    let searchTimeOut = useRef(null);
    const initialRender = useRef(true);
    const getList = async ()=>{
        setList(await getUsers({legalObject: router.query.id, ...branch?{branch: branch._id}:{}, skip: 0, search, role: filter}))
        setCount(await getUsersCount({legalObject: router.query.id, ...branch?{branch: branch._id}:{}, search, role: filter}));
        (document.getElementsByClassName('App-body'))[0].scroll({top: 0, left: 0, behavior: 'instant' });
        forceCheck();
        paginationWork.current = true
    }
    useEffect(()=>{
        (async()=>{
            if(!initialRender.current) await getList()
        })()
    },[filter, branch])
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
            let addedList = await getUsers({skip: list.length, search, ...branch?{branch: branch._id}:{}, legalObject: router.query.id})
            if(addedList.length>0)
                setList([...list, ...addedList])
            else
                paginationWork.current = false
        }
    }
    return (
        <App filters={router.query.id!=='super'?filters:[]} checkPagination={checkPagination} filterShow={{branch: router.query.id!=='super'}} searchShow={true} pageName='Пользователи'>
            <Head>
                <title>Пользователи</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Пользователи' />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/users/${router.query.id}`} />
                <link rel='canonical' href={`${urlMain}/users/${router.query.id}`}/>
            </Head>
            <div className='count'>
                {`Всего: ${count}`}
            </div>
            <div className={classes.page}>
                {list?list.map((element, idx)=>
                    <LazyLoad scrollContainer={'.App-body'} key={element._id} height={height} offset={[height, 0]} debounce={0} once={true}  placeholder={<CardUserPlaceholder height={height}/>}>
                        <CardUser change list={list} key={element._id} setList={setList} element={element} idx={idx}/>
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

User.getInitialProps = async function(ctx) {

    await initialApp(ctx)
    if(!['admin', 'superadmin', 'управляющий', 'супервайзер', 'оператор'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    ctx.store.getState().app.legalObject = {_id: ctx.query.id}
    return {
        data: {
            list: await getUsers({skip: 0, legalObject: ctx.query.id, ...ctx.store.getState().app.branch?{branch: ctx.store.getState().app.branch._id}:{}}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
            count: await getUsersCount({legalObject: ctx.query.id, ...ctx.store.getState().app.branch?{branch: ctx.store.getState().app.branch._id}:{}}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
        }
    };
};

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app,
    }
}

export default connect(mapStateToProps)(User);