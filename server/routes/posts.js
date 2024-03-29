import express from 'express'
const router = express.Router()
import authorize from '../middleware/auth.js'



import { getPosts,getPostsByPage,createPost,deletePost,likePost,updatePost,searchPosts,fetchPost,commentPost } from '../controllers/posts.js'

router.get('/search',searchPosts)
router.get('/:id',fetchPost)
router.get('/',getPostsByPage)
router.post('/:id',authorize,commentPost)
router.post('/',authorize,createPost)
router.delete('/:id',authorize,deletePost)
router.patch('/:id/likePost',authorize,likePost)
router.patch('/:id/',authorize,updatePost)

export default router
