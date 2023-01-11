import Head from 'next/head';
import React from 'react';
import {getShortLink} from '../../src/gql/shortLink'
import { getClientGqlSsr } from '../../src/getClientGQL'

const ShortLink = React.memo(() => {
    return (
        <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: 24, color: 'red'}}>
            <Head>
                <title>Ничего не найдено</title>
            </Head>
            Ничего не найдено
        </div>
    )
})

ShortLink.getInitialProps = async function(ctx) {
    let shortLink = await getShortLink(ctx.query.id, ctx.req?await getClientGqlSsr(ctx.req):undefined)
    if(shortLink!=='ERROR')
        if(ctx.res) {
            ctx.res.writeHead(301, {
                Location: shortLink
            })
            ctx.res.end()
        } else
            window.location.replace(shortLink);
    else
        return {};
};

export default ShortLink