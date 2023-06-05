import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    creatorId:String,
    tags:[String],
    selectedFile:String,
    comments:{
        type:Array,
        default:[]
    },
    likes:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Number,
        default:new Date()
    }
})

const PostMessage = mongoose.model('PostMessage',postSchema)
export default PostMessage
