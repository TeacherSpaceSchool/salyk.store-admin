import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getHistory = async({where}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {where},
                query: gql`
                    query ($where: String!) {
                        history(where: $where) {
                            _id
                            who {_id name role}
                            where
                            what
                            createdAt
                          }
                    }`,
            })
        return res.data.history
    } catch(err){
        console.error(err)
    }
}
