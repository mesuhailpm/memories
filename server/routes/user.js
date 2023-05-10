import express from 'express'
import {signin,signup,generatetoken} from '../controllers/user.js'
const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/token', generatetoken)

export default router
