import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getCashboxes = async({search, skip, del, legalObject, branch, filter, all}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, skip, legalObject, del, branch, filter, all},
                query: gql`
                    query ($skip: Int, $search: String, $del: Boolean, $legalObject: ID, $branch: ID, $filter: String, $all: Boolean) {
                        cashboxes(skip: $skip, search: $search, del: $del, legalObject: $legalObject, branch: $branch, filter: $filter, all: $all) {
                            _id
                            createdAt
                            rnmNumber
                            registrationNumber
                            fn
                            fnExpiresAt
                            name
                            legalObject {name _id}
                            branch {name _id}
                            presentCashier {name _id role}
                            cash
                            endPayment
                            del
                            sync
                        }
                    }`,
            })
        return res.data.cashboxes
    } catch(err){
        console.error(err)
    }
}

export const getCashboxesCount = async({search, legalObject, del, branch, filter}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, legalObject, branch, del, filter},
                query: gql`
                    query ($search: String, $legalObject: ID, $del: Boolean, $branch: ID, $filter: String) {
                        cashboxesCount(search: $search, legalObject: $legalObject, del: $del, branch: $branch, filter: $filter)
                    }`,
            })
        return res.data.cashboxesCount
    } catch(err){
        console.error(err)
    }
}

export const getCashbox = async({_id}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        cashbox(_id: $_id) {
                            _id
                            createdAt
                            rnmNumber
                            registrationNumber
                            fn
                            fnExpiresAt
                            name
                            legalObject {name _id inn taxSystem_v2 vatPayer_v2}
                            branch {name _id bType_v2 pType_v2 ugns_v2 calcItemAttribute address}
                            presentCashier {name _id role}
                            endPayment
                            cash
                            del
                            sync
                            syncMsg
                            syncData
                        }
                    }`,
            })
        return res.data.cashbox
    } catch(err){
        console.error(err)
    }
}

export const deleteCashbox = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteCashbox(_id: $_id)
                    }`})
        return res.data.deleteCashbox
    } catch(err){
        console.error(err)
    }
}

export const clearCashbox = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        clearCashbox(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const restoreCashbox = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        restoreCashbox(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addCashbox = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($legalObject: ID!, $fn: String!, $name: String!, $branch: ID!) {
                        addCashbox(legalObject: $legalObject, fn: $fn, name: $name, branch: $branch)
                    }`})
        return res.data.addCashbox
    } catch(err){
        console.error(err)
    }
}

export const _setCashbox = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $name: String, $branch: ID) {
                        setCashbox(_id: $_id, name: $name, branch: $branch)
                    }`})
    } catch(err){
        console.error(err)
    }
}