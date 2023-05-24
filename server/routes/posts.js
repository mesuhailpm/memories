import express from 'express'
const router = express.Router()
import authorize from '../middleware/auth.js'



import { getPosts,createPost,deletePost,likePost,updatePost,searchPosts } from '../controllers/posts.js'

router.get('/',getPosts)
router.get('/search',searchPosts)
router.post('/',authorize,createPost)
router.delete('/:id',authorize,deletePost)
router.patch('/:id/',authorize,updatePost)
router.patch('/:id/likePost',authorize,likePost)

export default router
