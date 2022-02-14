import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getApplicationToConnects = async(element, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: element,
                query: gql`
                    query ($skip: Int, $filter: String) {
                        applicationToConnects(skip: $skip, filter: $filter) {
                            _id
                            createdAt
                            name
                            phone
                            address
                            whereKnow
                            taken
                            who {_id name role}
                        }
                    }`,
            })
        return res.data.applicationToConnects
    } catch(err){
        console.error(err)
    }
}

export const getApplicationToConnectsCount = async(element, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: element,
                query: gql`
                    query ($filter: String) {
                        applicationToConnectsCount(filter: $filter) 
                    }`,
            })
        return res.data.applicationToConnectsCount
    } catch(err){
        console.error(err)
    }
}

export const addApplicationToConnect = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($name: String!, $phone: String!, $address: String!, $whereKnow: String!) {
                        addApplicationToConnect(name: $name, phone: $phone, address: $address, whereKnow: $whereKnow)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const acceptApplicationToConnect = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!) {
                        acceptApplicationToConnect(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const deleteApplicationToConnect = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteApplicationToConnect(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}