import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getFullDeleteLegalObjects = async({skip}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: {skip},
            mutation : gql`
                    query ($skip: Int) {
                        fullDeleteLegalObjects(skip: $skip) {
                            _id
                            createdAt
                            legalObject
                            status
                            end
                        }
                    }`})
        return res.data.fullDeleteLegalObjects
    } catch(err) {
        console.error(err)
    }
}

export const getLegalObjects = async({skip, search}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {skip, search},
                query: gql`
                    query($skip: Int, $search: String) {
                        legalObjects(skip: $skip, search: $search) {
                            _id
                            createdAt
                            name 
                            inn 
                            address 
                            email
                            phone 
                            status 
                            _id 
                            del
                            sync
                        }
                    }`,
            })
        return res.data.legalObjects
    } catch(err){
        console.error(err)
    }
}

export const getLegalObjectsCount = async({search}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search},
                query: gql`
                    query($search: String) {
                        legalObjectsCount(search: $search) 
                    }`,
            })
        return res.data.legalObjectsCount
    } catch(err){
        console.error(err)
    }
}

export const getLegalObjectsTrash = async({skip, search}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {skip, search},
                query: gql`
                    query($skip: Int, $search: String) {
                        legalObjectsTrash(skip: $skip, search: $search) {
                            _id
                            createdAt
                            name 
                            inn 
                            address 
                            phone 
                            status 
                            email
                            sync
                            _id 
                            del
                        }
                    }`,
            })
        return res.data.legalObjectsTrash
    } catch(err){
        console.error(err)
    }
}


export const getLegalObject = async({_id}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        legalObject(_id: $_id) {
                            _id
                            createdAt
                            name
                            inn
                            address
                            phone
                            status
                            email
                            responsiblePerson
                            del
                            ofd
                            syncMsg
                            sync
                            agent {_id name}
                            taxSystemName_v2
                            taxSystemCode_v2
                            ndsTypeCode_v2
                            ndsTypeRate_v2
                            nspTypeCode_v2
                            nspTypeRate_v2
                            ugns_v2
                            vatPayer_v2
                            taxpayerType_v2
                        }
                    }`,
            })
        return res.data.legalObject
    } catch(err){
        console.error(err)
    }
}

export const deleteLegalObject = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteLegalObject(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const onoffLegalObject = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        onoffLegalObject(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const restoreLegalObject = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        restoreLegalObject(_id: $_id)
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const fullDeleteLegalObject = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!) {
                        fullDeleteLegalObject(_id: $_id)
                    }`})
        return res.data.fullDeleteLegalObject
    } catch(err){
        console.error(err)
    }
}

export const addLegalObject = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($agent: ID, $taxSystemName_v2: String!, $taxSystemCode_v2: Int!, $ndsTypeCode_v2: Int!, $ndsTypeRate_v2: Int!, $nspTypeCode_v2: Int!, $nspTypeRate_v2: Int!, $ugns_v2: Int!, $vatPayer_v2: Boolean!, $taxpayerType_v2: String!, $name: String!, $ofd: Boolean!, $inn: String!, $email: [String]!, $address: String!, $phone: [String]!, $responsiblePerson: String!) {
                        addLegalObject(agent: $agent, taxSystemName_v2: $taxSystemName_v2, taxSystemCode_v2: $taxSystemCode_v2, ndsTypeCode_v2: $ndsTypeCode_v2, ndsTypeRate_v2: $ndsTypeRate_v2, nspTypeCode_v2: $nspTypeCode_v2, nspTypeRate_v2: $nspTypeRate_v2, ugns_v2: $ugns_v2, taxpayerType_v2: $taxpayerType_v2, vatPayer_v2: $vatPayer_v2, name: $name, ofd: $ofd, inn: $inn, email: $email, address: $address, phone: $phone, responsiblePerson: $responsiblePerson)
                    }`})
        return res.data.addLegalObject
    } catch(err){
        console.error(err)
    }
}

export const setLegalObject = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($agent: ID, $_id: ID!, $name: String, $ofd: Boolean, $email: [String], $address: String, $phone: [String], $responsiblePerson: String, $taxpayerType_v2: String, $taxSystemName_v2: String, $taxSystemCode_v2: Int, $ndsTypeRate_v2: Int, $ndsTypeCode_v2: Int, $nspTypeRate_v2: Int, $nspTypeCode_v2: Int, $ugns_v2: Int, $vatPayer_v2: Boolean) {
                        setLegalObject(agent: $agent, _id: $_id, ofd: $ofd, name: $name, email: $email, address: $address, phone: $phone, responsiblePerson: $responsiblePerson, taxpayerType_v2: $taxpayerType_v2, taxSystemName_v2: $taxSystemName_v2, taxSystemCode_v2: $taxSystemCode_v2, ndsTypeCode_v2: $ndsTypeCode_v2, ndsTypeRate_v2: $ndsTypeRate_v2, nspTypeCode_v2: $nspTypeCode_v2, nspTypeRate_v2: $nspTypeRate_v2, ugns_v2: $ugns_v2, vatPayer_v2: $vatPayer_v2)
                    }`})
        return res.data.setLegalObject
    } catch(err){
        console.error(err)
    }
}