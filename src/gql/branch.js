import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getBranchs = async({search, skip, legalObject}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, skip, legalObject},
                query: gql`
                    query ($skip: Int, $search: String, $legalObject: ID) {
                        branchs(skip: $skip, search: $search, legalObject: $legalObject) {
                            _id
                            createdAt
                            legalObject {name _id}
                            
                            bType
                            pType
                            ugns
                            
                            businessActivityCode_v2
                            businessActivityName_v2
                            entrepreneurshipObjectCode_v2
                            entrepreneurshipObjectName_v2
                            ugnsCode_v2
                            ugnsName_v2
                            calcItemAttributeCode_v2
                            calcItemAttributeName_v2
                            administrativeArea_v2
                            
                            name
                            address
                            locality
                            postalCode
                            route
                            streetNumber
                            geo
                            sync
                            del
                        }
                    }`,
            })
        return res.data.branchs
    } catch(err){
        console.error(err)
    }
}

export const getBranchsCount = async({search, legalObject}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, legalObject},
                query: gql`
                    query ($search: String, $legalObject: ID) {
                        branchsCount(search: $search, legalObject: $legalObject)
                    }`,
            })
        return res.data.branchsCount
    } catch(err){
        console.error(err)
    }
}

export const getBranchsTrash = async({search, skip}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, skip},
                query: gql`
                    query ($skip: Int, $search: String) {
                        branchsTrash(skip: $skip, search: $search) {
                            _id
                            createdAt
                            legalObject {name _id}
                            
                            bType
                            pType
                            ugns
                            
                            businessActivityCode_v2
                            businessActivityName_v2
                            entrepreneurshipObjectCode_v2
                            entrepreneurshipObjectName_v2
                            ugnsCode_v2
                            ugnsName_v2
                            calcItemAttributeCode_v2
                            calcItemAttributeName_v2
                            administrativeArea_v2
                            
                            name
                            address
                            locality
                            postalCode
                            route
                            streetNumber
                            geo
                            sync
                            del
                        }
                    }`,
            })
        return res.data.branchsTrash
    } catch(err){
        console.error(err)
    }
}

export const getBranch = async({_id}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        branch(_id: $_id) {
                            _id
                            createdAt
                            legalObject {name _id}
                            
                            bType
                            pType
                            ugns
                            
                            businessActivityCode_v2
                            businessActivityName_v2
                            entrepreneurshipObjectCode_v2
                            entrepreneurshipObjectName_v2
                            ugnsCode_v2
                            ugnsName_v2
                            calcItemAttributeCode_v2
                            calcItemAttributeName_v2
                            administrativeArea_v2
                            
                            name
                            address
                            locality
                            postalCode
                            route
                            streetNumber
                            geo
                            sync
                            syncMsg
                            del
                        }
                    }`,
            })
        return res.data.branch
    } catch(err){
        console.error(err)
    }
}

export const deleteBranch = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteBranch(_id: $_id)
                    }`})
        return res.data.deleteBranch
    } catch(err){
        console.error(err)
    }
}

export const restoreBranch = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation($_id: ID!) {
                        restoreBranch(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addBranch = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($legalObject: ID!, $businessActivityCode_v2: Int!, $businessActivityName_v2: String!, $entrepreneurshipObjectCode_v2: Int!, $entrepreneurshipObjectName_v2: String!, $ugnsCode_v2: Int!, $ugnsName_v2: String!, $calcItemAttributeCode_v2: Int!, $calcItemAttributeName_v2: String!, $administrativeArea_v2: String!, $address: String!, $name: String!, $locality: String!, $postalCode: String!, $route: String!, $streetNumber: String!, $geo: [Float]) {
                        addBranch(legalObject: $legalObject, businessActivityCode_v2: $businessActivityCode_v2, businessActivityName_v2: $businessActivityName_v2, entrepreneurshipObjectCode_v2: $entrepreneurshipObjectCode_v2, entrepreneurshipObjectName_v2: $entrepreneurshipObjectName_v2, ugnsCode_v2: $ugnsCode_v2, ugnsName_v2: $ugnsName_v2, calcItemAttributeCode_v2: $calcItemAttributeCode_v2, calcItemAttributeName_v2: $calcItemAttributeName_v2, administrativeArea_v2: $administrativeArea_v2, address: $address, name: $name, locality: $locality, postalCode: $postalCode, route: $route, streetNumber: $streetNumber, geo: $geo)
                    }`})
        return res.data.addBranch
    } catch(err){
        console.error(err)
    }
}

export const _setBranch = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $businessActivityCode_v2: Int, $businessActivityName_v2: String, $entrepreneurshipObjectCode_v2: Int, $entrepreneurshipObjectName_v2: String, $ugnsCode_v2: Int, $ugnsName_v2: String, $calcItemAttributeCode_v2: Int, $calcItemAttributeName_v2: String, $administrativeArea_v2: String, $name: String, $address: String, $locality: String, $postalCode: String, $route: String, $streetNumber: String, $geo: [Float]) {
                        setBranch(_id: $_id, businessActivityCode_v2: $businessActivityCode_v2, businessActivityName_v2: $businessActivityName_v2, entrepreneurshipObjectCode_v2: $entrepreneurshipObjectCode_v2, entrepreneurshipObjectName_v2: $entrepreneurshipObjectName_v2, ugnsCode_v2: $ugnsCode_v2, ugnsName_v2: $ugnsName_v2, calcItemAttributeCode_v2: $calcItemAttributeCode_v2, calcItemAttributeName_v2: $calcItemAttributeName_v2, administrativeArea_v2: $administrativeArea_v2, name: $name, address: $address, locality: $locality, postalCode: $postalCode, route: $route, streetNumber: $streetNumber, geo: $geo)
                    }`})
        return res.data.setBranch
    } catch(err){
        console.error(err)
    }
}