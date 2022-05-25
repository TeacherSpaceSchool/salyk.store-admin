import {
    UNAUTHENTICATED,
    SET_PROFILE,
    SET_AUTH,
    ERROR_AUTHENTICATED,
    CLEAR_ERROR
} from '../constants/user'
import {
    SHOW_MINI_DIALOG
} from '../constants/mini_dialog'
import {
    SHOW_LOAD
} from '../constants/app'
import Cookies from 'js-cookie';
import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../../src/singleton/client';
import { unregister, register } from '../../src/subscribe';
import Router from 'next/router';

export function signin(payload) {
    return async (dispatch) => {
        await dispatch({
            type: SHOW_LOAD,
            payload: true
        })
        try {
            const client = new SingletonApolloClient().getClient();
            let result = await client.mutate({
                variables: payload,
                mutation : gql`
                    mutation ($login: String!, $password: String!) {
                        signinuser(login: $login, password: $password) {
                           _id
                            role
                            status
                            login
                            legalObject
                            branch
                            statistic
                            add
                            credit
                            payment
                            error
                        }
                    }`})
            if(result.data.signinuser.error) {
                await dispatch({
                    type: ERROR_AUTHENTICATED,
                    payload: result.data.signinuser.error
                })
                await dispatch({
                    type: SHOW_LOAD,
                    payload: false
                })
            }
            else {
                await dispatch({
                    type: SHOW_MINI_DIALOG,
                    payload: false
                })
                let reloadTimeout = setTimeout(()=>window.location.reload(), 30000)
                await register(true)
                clearInterval(reloadTimeout)
                window.location.reload()
            }
        } catch(error) {
            await dispatch({
                type: SHOW_LOAD,
                payload: false
            })
            await dispatch({
                type: ERROR_AUTHENTICATED,
                payload: true
            })
        }
    };
}

export function setAuthenticated(auth) {
    return {
        type: SET_AUTH,
        payload: auth
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

export function logout(reload) {
    return async (dispatch) => {
        await dispatch({
            type: SHOW_LOAD,
            payload: true
        })
        const client = new SingletonApolloClient().getClient();
        await client.mutate({
            mutation : gql`
                    mutation {
                        logoutuser 
                    }`})
        await dispatch({
            type: UNAUTHENTICATED,
        })
        await Cookies.remove('jwt');
        await dispatch({
            type: SET_PROFILE,
            payload: {}
        })
        if(reload) {
            await unregister()
            await Router.push('/')
            window.location.reload()
        }
        else
            await dispatch({
                type: SHOW_LOAD,
                payload: false
            })
    }
}

export function setProfile() {
    return async (dispatch) => {
        try {
            const client = new SingletonApolloClient().getClient()
            let result = await client
                .query({
                    query: gql`
                    query {
                        getStatus {
                           _id
                            role
                            status
                            login
                            legalObject
                            branch
                            statistic
                            add
                            credit
                            payment
                        }
                    }`
                })

            await dispatch({
                type: SET_PROFILE,
                payload: result.data.getStatus
            })
        } catch(error) {
            console.error(error)
        }
    };
}

export async function getProfile(client) {
    try {
        client = client? client : new SingletonApolloClient().getClient()
        let result = await client
            .query({
                query: gql`
                   query {
                       getStatus {
                          _id
                          role
                          status
                          login
                          legalObject
                          branch
                          statistic
                          add
                          credit
                          payment
                       }
                   }`
            })
        return result.data.getStatus
    } catch(error) {
        console.error(error)
    }
}