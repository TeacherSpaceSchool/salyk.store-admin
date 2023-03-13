import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getWorkShifts = async({skip, legalObject, branch, cashier, filter, date, cashbox}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {skip, legalObject, branch, cashier, filter, date, cashbox},
                query: gql`
                    query ($skip: Int, $legalObject: ID, $branch: ID, $cashbox: ID, $cashier: ID, $filter: String, $date: Date) {
                        workShifts(skip: $skip, legalObject: $legalObject, cashbox: $cashbox, branch: $branch, cashier: $cashier, filter: $filter, date: $date) {
                            _id
                            createdAt
                            number
                            legalObject {_id name}
                            branch {_id name}
                            cashier {_id name role}
                            cashbox {_id name}
                            consignation
                            paidConsignation
                            prepayment
                            returned
                            cashless
                            cash
                            sale
                            cashEnd
                            deposit
                            withdraw
                            discount
                            expired
                            start
                            extra
                            end
                            consignationCount
                            saleCount
                            paidConsignationCount
                            prepaymentCount
                            returnedCount
                            buy
                            buyCount
                            returnedBuy
                            returnedBuyCount
                            sync
                            syncMsg
                        }
                    }`,
            })
        return res.data.workShifts
    } catch(err){
        console.error(err)
    }
}

export const getWorkShift = async({_id}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        workShift(_id: $_id) {
                            _id
                            createdAt
                            number
                            legalObject {_id name inn rateTaxe taxSystemName_v2}
                            branch {_id name address}
                            cashier {_id name role}
                            cashbox {_id name rnmNumber fn registrationNumber}
                            consignation
                            paidConsignation
                            prepayment
                            returned
                            expired
                            cashless
                            cash
                            sale
                            cashEnd
                            deposit
                            withdraw
                            discount
                            extra
                            start
                            end
                            consignationCount
                            saleCount
                            paidConsignationCount
                            prepaymentCount
                            returnedCount
                            buy
                            buyCount
                            returnedBuy
                            returnedBuyCount
                            sync
                            syncMsg
                            syncData
                        }
                    }`,
            })
        return res.data.workShift
    } catch(err){
        console.error(err)
    }
}

export const getWorkShiftsCount = async({legalObject, branch, cashier, filter, date, cashbox}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {legalObject, branch, cashier, filter, date, cashbox},
                query: gql`
                    query ($legalObject: ID, $branch: ID, $cashbox: ID, $cashier: ID, $filter: String, $date: Date) {
                        workShiftsCount(legalObject: $legalObject, cashbox: $cashbox, branch: $branch, cashier: $cashier, filter: $filter, date: $date)
                    }`,
            })
        return res.data.workShiftsCount
    } catch(err){
        console.error(err)
    }
}

export const startWorkShift = async({cashbox})=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {cashbox},
            mutation : gql`
                    mutation ($cashbox: ID!) {
                        startWorkShift(cashbox: $cashbox) {
                            _id
                            createdAt
                            number
                            legalObject {_id name}
                            branch {_id name}
                            cashier {_id name role}
                            cashbox {_id name}
                            consignation
                            paidConsignation
                            prepayment
                            returned
                            cashless
                            cash
                            sale
                            cashEnd
                            deposit
                            withdraw
                            discount
                            start
                            end
                            consignationCount
                            saleCount
                            paidConsignationCount
                            prepaymentCount
                            returnedCount
                            buy
                            buyCount
                            returnedBuy
                            returnedBuyCount
                            sync
                            syncMsg
                        }
                    }`})
        return res.data.startWorkShift
    } catch(err){
        console.error(err)
    }
}

export const _setWorkShift = async({_id, deposit, withdraw, comment})=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id, deposit, withdraw, comment},
            mutation : gql`
                    mutation ($_id: ID, $deposit: Float, $withdraw: Float, $comment: String) {
                        setWorkShift(_id: $_id, deposit: $deposit, withdraw: $withdraw, comment: $comment) 
                    }`})
        return res.data.setWorkShift
    } catch(err){
        console.error(err)
    }
}

export const endWorkShift = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID){
                        endWorkShift(_id: $_id)
                    }`})
        return res.data.endWorkShift
    } catch(err){
        console.error(err)
    }
}