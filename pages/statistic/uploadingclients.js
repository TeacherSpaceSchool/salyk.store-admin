import Head from 'next/head';
import React, { useState, useRef } from 'react';
import App from '../../layouts/App';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import pageListStyle from '../../src/styleMUI/list'
import * as userActions from '../../redux/actions/user'
import * as snackbarActions from '../../redux/actions/snackbar'
import { urlMain } from '../../redux/constants/other'
import initialApp from '../../src/initialApp'
import Router from 'next/router'
import { uploadingClients } from '../../src/gql/statistic'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import Confirmation from '../../components/dialog/Confirmation'

const UploadingClients = React.memo((props) => {
    const classes = pageListStyle();
    const { setMiniDialog, showMiniDialog } = props.mini_dialogActions;
    const { legalObject, isMobileApp } = props.app;
    const { showSnackBar } = props.snackbarActions;
    let [document, setDocument] = useState(undefined);
    let documentRef = useRef(null);
    let handleChangeDocument = ((event) => {
        if(event.target.files[0].size/1024/1024<50){
            setDocument(event.target.files[0])
        } else {
            showSnackBar('Файл слишком большой')
        }
    })
    return (
        <App cityShow pageName='Загрузка клиентов' filterShow={{legalObject: true}}>
            <Head>
                <title>Загрузка клиентов</title>
                <meta name='description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:title' content='Загрузка клиентов' />
                <meta property='og:description' content='SuperKassa(Онлайн ККМ) - это кроссплатформенный виртуальный кассовый аппарат, который представляет собой программное обеспечение скачиваемое в PlayMarket и Appstore и возможностью входа через сайт с браузера (персональный/переносной компьютер, мобильный телефон и другие аналогичные аппараты), принадлежащие субъекту предпринимательства, с помощью которого будут проводится кассовые операции.' />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={`${urlMain}/static/512x512.png`} />
                <meta property='og:url' content={`${urlMain}/statistic/uploadingclients`} />
                <link rel='canonical' href={`${urlMain}/statistic/uploadingclients`}/>
            </Head>
            <Card className={classes.page}>
                <CardContent className={classes.column} style={isMobileApp?{}:{justifyContent: 'start', alignItems: 'flex-start'}}>
                    <div className={classes.row}>
                        Формат xlsx: ФИО клиента, ИНН клиента, телефон клиента, адрес клиента, email клиента, UUID клиента.
                    </div>
                    <Button color='primary' onClick={()=>{documentRef.current.click()}}>
                        {document?document.name:'Прикрепить файл'}
                    </Button>
                    <br/>
                    {
                        legalObject&&legalObject._id&&document?
                            <Button variant='contained' color='primary' onClick={async()=>{
                                const action = async() => {
                                    let res = await uploadingClients({
                                        legalObject: legalObject._id,
                                        document
                                    });
                                    if(res==='OK')
                                        showSnackBar('Все данные загруженны', 'success')
                                }
                                setMiniDialog('Вы уверены?', <Confirmation action={action}/>)
                                showMiniDialog(true)
                            }}>
                                Загрузить
                            </Button>
                            :
                            null
                    }
                </CardContent>
            </Card>
            <input
                ref={documentRef}
                accept='*/*'
                style={{ display: 'none' }}
                id='contained-button-file'
                type='file'
                onChange={handleChangeDocument}
            />
        </App>
    )
})

UploadingClients.getInitialProps = async function(ctx) {
    await initialApp(ctx)
    if(!['admin', 'superadmin'].includes(ctx.store.getState().user.profile.role)||!ctx.store.getState().user.profile.add)
        if(ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/'
            })
            ctx.res.end()
        } else
            Router.push('/')
    ctx.store.getState().app.legalObject = undefined
    return {
        data: { }
    }
};

function mapStateToProps (state) {
    return {
        user: state.user,
        app: state.app,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        snackbarActions: bindActionCreators(snackbarActions, dispatch),
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadingClients);