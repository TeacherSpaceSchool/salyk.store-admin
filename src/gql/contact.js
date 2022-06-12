import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getContact = async(client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                query: gql`
                    query {
                        contact {
                            name
                            addresses {address geo}
                            email
                            phone
                            connectionApplicationPhone
                            info
                            whatsapp
                            social
                            _id
                          }
                    }`,
            })
        return res.data.contact
    } catch(err){
        console.error(err)
    }
}

export const setContact = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($connectionApplicationPhone: String!, $whatsapp: [Boolean]!, $name: String!, $addresses: [AddressInput]!, $info: String!, $email: [String]!, $phone: [String]!, $social: [String]!) {
                        setContact(connectionApplicationPhone: $connectionApplicationPhone, name: $name, whatsapp: $whatsapp, addresses: $addresses, email: $email, info: $info, phone: $phone, social: $social)
                    }`})
    } catch(err){
        console.error(err)
    }
}