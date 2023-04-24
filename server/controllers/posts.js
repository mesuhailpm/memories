import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"
export const getPosts = async (req,res)=>{
    try {
        // res.send('This Worked')
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
        console.log('request is made on ',req.url,'req type: ',req.method)
    } catch (error) {
        console.log(error)

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
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    await PostMessage.findByIdAndRemove(id)
    //logging into console
    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body,'id to delete is ',id)
    res.json({ message: "Post deleted successfully." });

}
export const updatePost=async(req,res)=>{
    const {id}= req.params
    const updatedPost = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    const updatedPosts = await PostMessage.findByIdAndUpdate(id,updatedPost)
    res.json(updatedPosts)

}
export const likePost =async(req,res) => {
    const {id} = req.params
    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body)

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

    let post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount:post.likeCount+1},{new:true})
    console.log(updatedPost)
    res.json(updatedPost)
}
