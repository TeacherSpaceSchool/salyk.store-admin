import { gql } from 'apollo-boost';
import { SingletonApolloClient } from '../singleton/client';

export const getBlogs = async({search, skip}, client)=>{
    try{
        client = client? client : new SingletonApolloClient().getClient()
        let res = await client
            .query({
                variables: {search, skip},
                query: gql`
                    query ($skip: Int, $search: String) {
                        blogs(skip: $skip, search: $search) {
                            _id
                            image
                            text
                            name
                            createdAt
                          }
                    }`,
            })
        return res.data.blogs
    } catch(err){
        console.error(err)
    }
}

export const deleteBlog = async(_id)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: {_id},
            mutation : gql`
                    mutation ($_id: ID!) {
                        deleteBlog(_id: $_id) 
                    }`})
    } catch(err){
        console.error(err)
    }
}

export const addBlog = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        let res = await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($image: Upload!, $text: String!, $name: String!) {
                        addBlog(image: $image, text: $text, name: $name) {
                            _id
                            image
                            text
                            name
                            createdAt
                        }
                    }`})
        return res.data.addBlog
    } catch(err){
        console.error(err)
    }
}

export const setBlog = async(element)=>{
    try{
        const client = new SingletonApolloClient().getClient()
        await client.mutate({
            variables: element,
            mutation : gql`
                    mutation ($_id: ID!, $image: Upload, $text: String, $name: String) {
                        setBlog(_id: $_id, image: $image, text: $text, name: $name) 
                    }`})
    } catch(err){
        console.error(err)
    }
}