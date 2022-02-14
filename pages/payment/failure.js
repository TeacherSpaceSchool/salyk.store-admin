import Head from 'next/head';
import React from 'react';
import { urlMain } from '../../redux/constants/other'
import Router from 'next/router'
import initialApp from '../../src/initialApp'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Button from '@material-ui/core/Button';

const CheckIntegrity = React.memo(() => {
    return (
        <>
            <Head>
                <title>Ошибка платежа</title>
                <meta name='description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Ошибка платежа' />
                <meta property='og:description' content='SALYK.STORE(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/payment/failure`} />
                <link rel='canonical' href={`${urlMain}/payment/failure`}/>
            </Head>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <CancelOutlinedIcon style={{color: 'red', fontSize: '80px',}}/>
                <h2 style={{marginBottom: 15, marginTop: 15}}>
                    Ошибка платежа
                </h2>
                <Button variant='contained' color='primary' onClick={()=>window.close()}>
                    Вернуться
                </Button>
            </div>
        </>
    )
})

CheckIntegrity.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!ctx.store.getState().user.profile.role)
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        }
        else {
            Router.push('/')
        }
    return {
        data: {}
    };
};

export default CheckIntegrity;