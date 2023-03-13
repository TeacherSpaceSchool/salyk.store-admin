import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getCashboxes = async({search, skip, legalObject, branch, filter, all}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, skip, legalObject, branch, filter, all},
                query: gql`
                    query ($skip: Int, $search: String, $legalObject: ID, $branch: ID, $filter: String, $all: Boolean) {
                        cashboxes(skip: $skip, search: $search, legalObject: $legalObject, branch: $branch, filter: $filter, all: $all) {
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
                            paidWork
                            fnWork
                        }
                    }`,
            })
        return res.data.cashboxes
    } catch(err){
        console.error(err)
    }
}

export const getCashboxesCount = async({search, legalObject, branch, filter}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, legalObject, branch, filter},
                query: gql`
                    query ($search: String, $legalObject: ID, $branch: ID, $filter: String) {
                        cashboxesCount(search: $search, legalObject: $legalObject, branch: $branch, filter: $filter)
                    }`,
            })
        return res.data.cashboxesCount
    } catch(err){
        console.error(err)
    }
}

export const getCashboxesTrash = async({search, skip}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, skip},
                query: gql`
                    query ($skip: Int, $search: String) {
                        cashboxesTrash(skip: $skip, search: $search) {
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
        return res.data.cashboxesTrash
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
                            legalObject {name _id inn taxSystemName_v2 vatPayer_v2}
                            branch {name _id businessActivityName_v2 entrepreneurshipObjectName_v2 ugnsName_v2 calcItemAttributeName_v2 address}
                            presentCashier {name _id role}
                            endPayment
                            cash
                            del
                            sync
                            syncMsg
                            syncData
                            paidWork
                            fnWork
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