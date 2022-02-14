import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const scanner = async(img)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {img},
                query: gql`
                    query ($img: String) {
                        scanner(img: $img)
                    }`,
            })
        return res.data.scanner
    } catch(err){
        console.error(err)
    }
}
