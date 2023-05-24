import * as api from '../api/index'
import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE } from '../actionTypes'

export const getPosts = () => async(dispatch)=>{
    try {
        console.log('getPost action called')
        const {data} = await api.fetchPosts();
        console.log('data is assigned to data variable; this message is from actions')
        dispatch( {type:FETCH_ALL,payload:data} )
    } catch (error) {
        console.log(error)
    }

}
export const getPostsBySearch = (searchQuery) => async (dispatch)=> {
    try {
        const {data} = await api.searchPosts(searchQuery)
        console.log(data.data)
        dispatch ( {type:FETCH_ALL, payload:data.data})

    } catch (error) {
        console.log(error)

    }
}
export const createPost = (postData) => async (dispatch)=>{
    console.log(postData,'from actions')
    try {
        const {data} = await api.createPost(postData)
        dispatch({type:CREATE,payload:data})
    } catch (error) {
        console.log(error.message)
    }
}
export const updatePost = (id,post)=>async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post)
        dispatch({type:UPDATE, payload:data})

    } catch (error) {
        console.log(error.message)

    }

}

export const likePost =(id)=> async(dispatch)=>{
    try{
        const {data} = await api.likePost(id)
        dispatch({type:LIKE, payload:data})

    }catch(error){
        console.log(error)
    }

}
export const deletePost = (idToDelete) => async(dispatch)=>{
    try {
        const {data} = await api.deletePost(idToDelete)
        console.log(data,'is the data after tried to delete')
        dispatch({type:DELETE, payload: idToDelete})
    } catch (error) {
        console.log(error)
    }
}
