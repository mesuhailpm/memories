import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"
export const getPosts = async (req,res)=>{
    console.log(req)
    try {
        // res.send('This Worked')
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
        console.log('request is made on ',req.url,'req type: ',req.method)
    } catch (error) {
        console.log(error)

    }

}
export const fetchPost = async (req,res) => {
        const {id} = req.params
    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)

    } catch (error) {
        console.log(error)
    }

}

export const getPostsByPage = async (req,res) => {

    try {
        const page = req.query.page || 1
        console.log(page, ' is page')
        const postsCount = await PostMessage.count()
        const limit = 8 //might be dynamical
        const indexToSkip = (page - 1) * limit
        console.log(indexToSkip, 'will be skipped')
        const posts = await PostMessage.find().skip(indexToSkip).limit(limit)
        console.log(posts)
        res.status(200).json({page,posts, totalPagesCount:Math.ceil(postsCount/limit)})

    } catch (error) {
        console.log(error)

    }

}

export const searchPosts =async (req,res) => {
    const {query,tags} = req.query
    const title = new RegExp(query, "i");

    try {
        console.log(req.query)
        console.log(tags.split(','), title)
        // const posts = await PostMessage.find( { $or: [ { title }, {tags: {$in: tags.split(',')}}] } )
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        console.log(posts,'  are posts after search')

        res.status(201).json({data:posts})



    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const createPost = async(req,res)=>{
    console.log('Creating a post')
    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body)
        const post = req.body
        const newPost = new PostMessage(post)
        try {
            await newPost.save()
            res.status(201).json(newPost);

        } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error)
        }
}

export const deletePost = async(req,res)=>{
    const userId = req.userId
    const id = req.params.id //postID
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    const currentPost = await PostMessage.findById(id)
    if(currentPost.creatorId !== userId ) return res.status(404).send('Unable to delete other\'s post')
    await PostMessage.findByIdAndRemove(id)
    //logging into console
    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body,'id to delete is ',id)
    res.json({ message: "Post deleted successfully." });

}
export const updatePost = async (req,res)=>{
    const {id}= req.params //postID
    const userId = req.userId
    const updatedPost = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    const currentPost = await PostMessage.findById(id)
    if (currentPost.creatorId !== userId) return res.status(404).send('Only owner can update the post')
    const updatedPosts = await PostMessage.findByIdAndUpdate(id,updatedPost,{new:true})
    res.json(updatedPosts)

}
export const commentPost = async (req,res) => {
    console.log('hello ',req.body.comment)

    // try{

        const {id} = req.params //postID
        const userId = req.userId
        const {comment} = req.body

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

        const post = await PostMessage.findById(id)
        if (!post) return res.status(404).send('No post found');


        post.comments.push(comment)

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(201).json(updatedPost.comments)
    // }
    // catch(error){
    //     res.status(401).json({message:'something went wrong'})
    // }




}
export const likePost =async(req,res) => {
    const {id} = req.params//postID
    if (!req.userId)    return res.json({ message: "Unauthenticated" });
    let userId  = req.userId

    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body)

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    let post = await PostMessage.findById(id)
    const index = post.likes.indexOf(userId)
    if (index === -1) {
        post.likes.push(userId)
        } else {
        post.likes = post.likes.filter((id)=>id !== userId)}
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})

    console.log(updatedPost)
    res.json(updatedPost)
}
