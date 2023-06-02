import express from 'express'
const router = express.Router()
import authorize from '../middleware/auth.js'



import { getPosts,getPostsByPage,createPost,deletePost,likePost,updatePost,searchPosts,fetchPost } from '../controllers/posts.js'

router.get('/search',searchPosts)
router.get('/:id',fetchPost)
router.get('/',getPostsByPage)
router.post('/',authorize,createPost)
router.delete('/:id',authorize,deletePost)
router.patch('/:id/',authorize,updatePost)
router.patch('/:id/likePost',authorize,likePost)

export default router
