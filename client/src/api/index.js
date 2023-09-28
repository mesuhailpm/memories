import axios from 'axios'

const API = axios.create({baseURL:'https://memories-dun.vercel.app'});
API.interceptors.request.use((req)=>{
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  return req
}
)


API.interceptors.request.use((req)=>{
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
  return req
}
)


//posts
export const fetchPosts =()=> API.get('/posts')
export const fetchPost = (id) => API.get(`posts/${id}`)
export const fetchPostsByPage = (page) => API.get(`posts?page=${page}`)
export const searchPosts =(searchQuery)=> API.get(`/posts/search?query=${searchQuery.keyword||'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts',newPost)
export const commentPost = (id,comment) => API.post(`/posts/${id}`,{comment})
export const updatePost = (id,post)=>API.patch(`/posts/${id}/`,post)
export const deletePost = (id)=> API.delete(`posts/${id}`)
export const likePost = (id)=> API.patch(`posts/${id}/likepost`)

//auths

export const signUp = (credentials)=>API.post('/user/signup',credentials)
export const signIn = (credentials)=>API.post('/user/signin',credentials)
export const generateToken =(credentials)=>API.post('/user/token',credentials)
