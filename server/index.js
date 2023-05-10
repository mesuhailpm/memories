import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express()


app.use(bodyParser.json({ limit:'30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use('/posts',postRoutes)
app.use('/user',userRoutes)

const PORT = process.env.PORT || 3001

const dbURI='mongodb+srv://mernAppUser:mernAppPassword@cluster0.2gygs7q.mongodb.net/mernApp?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=> console.log(`Server is listening on port ${PORT}`)))
    .catch(error=>console.log('mongoose failed to connect with error: ',error))
