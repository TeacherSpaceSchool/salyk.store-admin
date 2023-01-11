import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getShortLink = async(_id, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {_id},
                query: gql`
                    query ($_id: ID!) {
                        shortLink(_id: $_id)
                    }`,
            })
        return res.data.shortLink
    } catch(err){
        console.error(err)
    }
}
