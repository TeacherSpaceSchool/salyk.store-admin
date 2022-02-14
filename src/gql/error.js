import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getErrors = async(skip, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {skip},
                query: gql`
                    query($skip: Int) {
                        errors(skip: $skip) {
                            _id
                            createdAt
                            err
                            path
                          }
                    }`,
            })
        return res.data.errors
    } catch(err){
        console.error(err)
    }
}

export const getErrorsCount = async(client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        errorsCount
                    }`,
            })
        return res.data.errorsCount
    } catch(err){
        console.error(err)
    }
}

export const clearAllErrors = async()=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            mutation : gql`
                    mutation {
                        clearAllErrors
                    }`})
    } catch(err){
        console.error(err)
    }
}