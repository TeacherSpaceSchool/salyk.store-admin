import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const geTtpDataByINNforBusinessActivity = async(inn)=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {inn},
                query: gql`
                    query($inn: String!) {
                        tpDataByINNforBusinessActivity(inn: $inn) {
                            inn
                            companyName
                            type
                            legalAddress
                            taxAuthorityDepartment
                            activityCode
                            vatPayer
                        }
                    }`,
            })
        return res.data.tpDataByINNforBusinessActivity
    } catch(err){
        console.error(err)
    }
}

export const getFns = async(_id)=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query($_id: ID!) {
                        fns(_id: $_id) {
                            number
                            status
                        }
                    }`,
            })
        return res.data.fns
    } catch(err){
        console.error(err)
    }
}

export const getTaxSystems = async()=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        taxSystems {
                            code
                            name
                        }
                    }`,
            })
        return res.data.taxSystems
    } catch(err){
        console.error(err)
    }
}

export const getNspTypes = async()=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        nspTypes {
                            code
                            name
                        }
                    }`,
            })
        return res.data.nspTypes
    } catch(err){
        console.error(err)
    }
}

export const getNdsTypes = async()=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        ndsTypes {
                            code
                            name
                        }
                    }`,
            })
        return res.data.ndsTypes
    } catch(err){
        console.error(err)
    }
}

export const deleteFn = async({_id, fn})=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id, fn},
            mutation : gql`
                    mutation ($_id: ID!, $fn: String!) {
                        deleteFn(_id: $_id, fn: $fn)
                    }`})
        return res.data.deleteFn
    } catch(err){
        console.error(err)
    }
}

export const reserveFn = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        reserveFn(_id: $_id) {
                            number
                            status
                        }
                    }`})
        return res.data.reserveFn
    } catch(err){
        console.error(err)
    }
}

export const getBusinessActivities = async()=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        businessActivities {
                            code
                            name
                        }
                    }`,
            })
        return res.data.businessActivities
    } catch(err){
        console.error(err)
    }
}

export const getEntrepreneurshipObjects = async()=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        entrepreneurshipObjects {
                            code
                            name
                        }
                    }`,
            })
        return res.data.entrepreneurshipObjects
    } catch(err){
        console.error(err)
    }
}

export const getTaxAuthorityDepartments = async()=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        taxAuthorityDepartments {
                            code
                            name
                        }
                    }`,
            })
        return res.data.taxAuthorityDepartments
    } catch(err){
        console.error(err)
    }
}

export const getCalcItemAttributes = async()=>{
    try{
        let client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        calcItemAttributes {
                            code
                            name
                        }
                    }`,
            })
        return res.data.calcItemAttributes
    } catch(err){
        console.error(err)
    }
}
