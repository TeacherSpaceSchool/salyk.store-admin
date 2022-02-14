import React from 'react';
import App  from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import withRedux from 'next-redux-wrapper';
import configureStore from '../redux/configureStore'
import { Provider } from 'react-redux';
import { SingletonApolloClient } from '../src/singleton/client'
import { SingletonStore } from '../src/singleton/store'
import { register, checkDisableSubscribe } from '../src/subscribe'
import { getClientGqlSsr } from '../src/getClientGQL'
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head'
import 'react-awesome-lightbox/build/style.css';
import '../scss/app.scss'
import '../scss/ticket.scss'

class MyApp extends App {
    static componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        new SingletonStore(store)
        if(process.browser){
            checkDisableSubscribe()
            register(true)
        }
        let client = process.browser?new SingletonApolloClient().getClient():getClientGqlSsr()

        return (
            <React.Fragment>
                <Head>
                    <meta
                        name='viewport'
                        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
                    />
                </Head>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Provider store={store}>
                            <Component {...pageProps} />
                        </Provider>
                    </ThemeProvider>
                </ApolloProvider>
            </React.Fragment>
        );
    }
}

export default withRedux(configureStore, { debug: false })(MyApp)
