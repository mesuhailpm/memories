import React, {useEffect, useState} from "react";
import { Card, Typography,Divider, CircularProgress, TextField, Button, Grid } from "@mui/material";
import moment from 'moment'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation,useParams } from "react-router-dom";


import Recommended from '../Recommended/Recommended'
import useStyles from './styles'
import { getPostsBySearch, fetchPost} from "../../actions/posts";
import Comments from "./Comments";
import { commentPost } from "../../actions/posts";
import {SETUSER} from "../../actionTypes"


export default function PostDetails(){
    const location = useLocation()
    const {id} = useParams()
    const dispatch = useDispatch()
    const classes = useStyles()
    const { posts,post,isLoading } = useSelector((state)=> state.posts)
    // const user =  useSelector ((state)=> state.user ? state.user?.authData?.name: JSON.parse(localStorage.getItem()).name)
    const user =  useSelector ((state)=> state.user?.authData?.name)
    console.log(post)

    const [comment,setComment] = useState('');
    const handleChange = async(e) =>{
        setComment(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (comment.length < 1)
        { return;}
        else
        {const formattedComment = `${user}: ${comment}`
        dispatch(commentPost(post._id, formattedComment))
        setComment('')}

    }
    useEffect(()=>{
        dispatch( {type: SETUSER})
    },[])

    useEffect(()=>{
        dispatch( fetchPost (id))
    },[id])


    useEffect(()=>{
        if(post){
        dispatch( getPostsBySearch ( { keyword:'', tags: post.tags?.join(',') }) )
        }

    },[post] )

    if(!post) return null;




    return  (

        <Card className={classes.card}>
        {isLoading ? <CircularProgress size={5} />:
         <div>
            <div className={classes.postDetails}>
                <div className={classes.section}>
                    <Typography variant="h2" className={classes.test} component='h3'>{post.title}</Typography>
                    <Typography gutterBottom>{post.tags?.join('#')}</Typography>
                    <Typography variant="h4" > By: {post.creator}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{moment(post.createdAt).fromNow()}</Typography>
                    <Typography variant="h5" gutterBottom>{post.message}</Typography>
                    <Typography variant="h6"> {post.likes?.length ? `${post.likes.length} ${post.length > 1 ? 'likes':'like' }`:'No likes'}</Typography>
                </div>

                <div className={classes.imageSection}>
                    <img src={post.selectedFile || 'https://yt3.ggpht.com/W1-I0q4z7rc5WpmgvyMV5w2upc1CsZ1kJrRdG9tbiQFisIMneRrxMPZL-xZ1mCID4dKu_rZ78PI=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'} className={classes.image}/>
                </div>

            </div>
            <Divider/>
            <Grid container className={classes.commentsOuterContainer} >
                <Comments />
                <Grid item xs ={12} md={4}>
                <Typography margin="1rem">{user && 'Write a comment'}</Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField value={comment} onChange={handleChange} multiline maxRows="4" helperText="minimum 3 characters"/>
                    <Button variant="contained" color = "primary" type="submit" disabled={!user || (comment.length <3)}>Comment</Button>

                </form>
                </Grid>
            </Grid >
            <Divider/>

            <div className={classes.recommended}>
                <Typography  variant="h6">You may also like</Typography>
                <Recommended
                    post = {post}
                    posts ={posts}
                    recommendedPosts={posts.filter((item)=>item._id !== post._id)}
                />

            </div>

         </div>

        }
        </Card>


    )

}
