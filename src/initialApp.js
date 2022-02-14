import { getProfile } from '../redux/actions/user'
import { setDevice } from './gql/user'
import { getJWT, checkMobile } from './lib'
import uaParserJs from 'ua-parser-js';
import { getClientGqlSsr } from './getClientGQL'

const initialApp = async (ctx)=>{
    let ua
    if (ctx.req) {
        ua = uaParserJs(ctx.req.headers['user-agent'])
        ctx.store.getState().app.isMobileApp = ['mobile', 'tablet'].includes(ua.device.type)||checkMobile(ua.ua)||ctx.req.headers['sec-ch-ua-mobile']==='?1'
        ctx.store.getState().user.authenticated = getJWT(ctx.req.headers.cookie)
        if (ctx.store.getState().user.authenticated) {
            ctx.store.getState().user.profile = await getProfile(await getClientGqlSsr(ctx.req))
            if (ctx.store.getState().user.profile) {
                let deviceModel
                if(ua.device.model)
                    deviceModel = ua.device.model
                else if(ua.ua){
                    deviceModel = ua.ua.split(' (')
                    if(deviceModel[1]) {
                        deviceModel = deviceModel[1].split('; ')
                        if (deviceModel[2]) {
                            deviceModel = deviceModel[2].split(') ')
                            if (deviceModel[0])
                                deviceModel = deviceModel[0]
                            else
                                deviceModel = ''
                        }
                    }
                }
                setDevice(`${ua.device.vendor ? `${ua.device.vendor}-` : ''}${deviceModel} | ${ua.os.name ? `${ua.os.name}-` : ''}${ua.os.version ? ua.os.version : ''} | ${ua.browser.name ? `${ua.browser.name}-` : ''}${ua.browser.version ? ua.browser.version : ''}`, await getClientGqlSsr(ctx.req))
            }
        }
        else {
            ctx.store.getState().user.profile = {}
        }
    }
    ctx.store.getState().app.search = ''
    ctx.store.getState().app.sort = '-createdAt'
    ctx.store.getState().app.filter = ''
    ctx.store.getState().app.date = undefined
    ctx.store.getState().app.load = false
    ctx.store.getState().app.drawer = false
    ctx.store.getState().mini_dialog.show = false
    ctx.store.getState().mini_dialog.showFull = false
    return { ua }

}

export default initialApp