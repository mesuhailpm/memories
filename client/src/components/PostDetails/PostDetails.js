import React, {useEffect, useState} from "react";
import { Card, Typography,Divider, CircularProgress, TextField, Button, Grid,IconButton } from "@mui/material";
import moment from 'moment'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useLocation,useNavigate,useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import Recommended from '../Recommended/Recommended'
import useStyles from './styles'
import { getPostsBySearch, fetchPost, getPostsByPage} from "../../actions/posts";
import Comments from "./Comments";
import { commentPost } from "../../actions/posts";
import {SETUSER} from "../../actionTypes"
import { Box } from "@mui/system";


export default function PostDetails(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const { posts,post,isLoading,page } = useSelector((state)=> state.posts)
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
                <IconButton className={classes.backIcon} color="primary" onClick={()=>{dispatch( getPostsByPage(page));navigate(`/posts?page=${page}`)}}>
                    <ArrowBackIcon fontSize="large" color="secondary"/>
                </IconButton>

                    <Typography variant="h2" className={classes.test} component='h3'>{post.title}</Typography>
                    <Typography gutterBottom>{post.tags.map((tag)=>`#${tag} `)}</Typography>
                    <Typography variant="h4" > By: {post.creator}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{moment(post.createdAt).fromNow()}</Typography>
                    <Typography variant="h5" gutterBottom>{post.message}</Typography>
                    <Typography variant="h6"> {post.likes?.length ? `${post.likes.length} ${post.length > 1 ? 'likes':'like' }`:'No likes'}</Typography>
                </div>

                <div className={classes.imageSection}>
                    <img src={post.selectedFile || 'https://placehold.co/400'} className={classes.image}/>
                </div>

            </div>
            <Divider/>
            <Box className={classes.commentsOuterContainer} >
                <Box  xs= {12} md={8} className={classes.commentsInnerContainer}>
                    <Typography variant="h4" color="primary" margin="1rem" >Comments</Typography>
                    <Comments />
                </Box>
                <Box  xs ={12} md={8}>
                    <Typography margin="1rem">{user && 'Write a comment'}</Typography>
                    <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField value={comment} onChange={handleChange} multiline maxRows="4" helperText="minimum 3 characters"/>
                    <Button variant="contained" color = "primary" type="submit" disabled={!user || (comment.length <3)}>Comment</Button>

                </form>
                </Box>
            </Box >
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
