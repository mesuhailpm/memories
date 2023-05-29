import * as api from '../api/index'
import { FETCH_ALL,FETCH_POSTS_BY_PAGE,CREATE,UPDATE,DELETE,LIKE,START_LOADING,STOP_LOADING ,FETCH_SINGLE_POST } from '../actionTypes'

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
export const fetchPost = (id,navigate) => async(dispatch) => {

    try {
        dispatch ({type: START_LOADING})
        const {data} = await api.fetchPost(id)

        dispatch ( {type: FETCH_SINGLE_POST, payload: data} )
        dispatch ( {type: STOP_LOADING})
        navigate(`/posts/${id}`)

    } catch (error) {
        console.log(error)
    }
}

export const getPostsByPage = (page) => async (dispatch) => {
    try {
        dispatch ( {type:START_LOADING })
        const {data} = await api.fetchPostsByPage(page)

        dispatch ( { type:FETCH_POSTS_BY_PAGE, payload: data } )
        dispatch ( { type:STOP_LOADING })

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
