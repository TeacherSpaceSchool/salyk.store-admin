import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import App from '../layouts/App';
import { connect } from 'react-redux'
import { getApplicationToConnects, getApplicationToConnectsCount } from '../src/gql/connectionApplication'
import { getContact } from '../src/gql/contact'
import pageListStyle from '../src/styleMUI/list'
import CardConnectionApplications from '../components/CardConnectionApplication'
import { urlMain } from '../redux/constants/other'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import CardPlaceholder from '../components/CardPlaceholder'
import { getClientGqlSsr } from '../src/getClientGQL'
import initialApp from '../src/initialApp'
import Router from 'next/router'
const height = 113
const filters = [
    {
        name: 'Все',
        value: ''
    },
    {
        name: 'Обработка',
        value: 'обработка'
    }
]

const ConnectionApplications = React.memo((props) => {
    const classes = pageListStyle();
    const { profile } = props.user;
    const { data } = props;
    let [list, setList] = useState(data.list);
    const { filter } = props.app;
    let [count, setCount] = useState(data.count);
    let paginationWork = useRef(true);
    const checkPagination = async()=>{
        if(paginationWork.current){
            let addedList = await getApplicationToConnects({filter: filter, skip: list.length})
            if(addedList.length>0)
                setList([...list, ...addedList])
            else
                paginationWork.current = false
        }
    }
    const getList = async()=>{
        setList(await getApplicationToConnects({filter: filter, skip: 0}))
        setCount(await getApplicationToConnectsCount({filter: filter}));
        (document.getElementsByClassName('App-body'))[0].scroll({top: 0, left: 0, behavior: 'instant' });
        forceCheck()
        paginationWork.current = true
    }
    useEffect(()=>{
        (async () => {
            await getList()
        })()
    },[filter])
    return (
        <App checkPagination={checkPagination} setList={setList} list={list} filters={['admin', 'superadmin'].includes(profile.role)?filters:undefined} pageName='Заявка на подключение'>
            <Head>
                <title>Заявка на подключение</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Заявка на подключение' />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/connectionapplications`} />
                <link rel='canonical' href={`${urlMain}/connectionapplications`}/>
            </Head>
            <div className={classes.page}>
                {
                    !profile.role&&!list.length?
                        <CardConnectionApplications list={list} setList={setList}/>
                        :
                        null
                }
                {
                    list?list.map((element, idx)=> {
                            return(
                                <LazyLoad scrollContainer={'.App-body'} key={element._id} height={height} offset={[height, 0]} debounce={0} once={true}  placeholder={<CardPlaceholder height={height}/>}>
                                    <CardConnectionApplications list={list} idx={idx} element={element} setList={setList}/>
                                </LazyLoad>
                            )}
                    ):null
                }
                {
                    ['admin', 'superadmin', 'оператор'].includes(profile.role)?
                        <div className='count'>
                            {
                                `Всего: ${count}`
                            }
                        </div>
                        :
                        null
                }
            </div>
        </App>
    )
})

ConnectionApplications.getInitialProps = async function(ctx) {
    await initialApp(ctx)

    if(!ctx.store.getState().user.profile.role) {
        let contact = await getContact(ctx.req?await getClientGqlSsr(ctx.req):undefined)
        if(contact.connectionApplicationPhone)
            if (ctx.res) {
                ctx.res.writeHead(302, {
                    Location: `https://wa.me/+996${contact.connectionApplicationPhone}?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C%D1%81%D1%8F%20%D0%BA%20SALYK.STORE`
                })
                ctx.res.end()
            } else
                await Router.push(`https://wa.me/+996${contact.connectionApplicationPhone}?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C%D1%81%D1%8F%20%D0%BA%20SALYK.STORE`)
    }
    else if(ctx.store.getState().user.profile.role&&!['superadmin','admin', 'оператор'].includes(ctx.store.getState().user.profile.role))
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')

    return {
        data: {
            list: await getApplicationToConnects({skip: 0, filter: ''}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
            count: await getApplicationToConnectsCount({filter: ''}, ctx.req?await getClientGqlSsr(ctx.req):undefined),
        }
    };
};

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user,
    }
}

export default connect(mapStateToProps)(ConnectionApplications);