import React, { useEffect, useState } from 'react'
import {FETCH_POSTS_BY_SEARCH} from '../../actionTypes'
import {getPostsBySearch} from '../../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { Grid } from '@mui/material'
export default function RecommendedPost ({post,recommendedPosts}) {

    const classes = useStyles()
    const navigate = useNavigate()


    // const currentPost = useSelector((state)=>state.posts.post)
    // const state = useSelector ((state)=>state)

    // console.log(currentPost || 'loading',' is currentPost')//test
    // console.log(state || 'loading',' is state')// test
    // useEffect(()=>{
    //     dispatch( getPostsBySearch({keyword:'',tags:currentPost.tags?.join(',')}));
    //     console.log('useEffect ran inside the recommended')//test
    // },[])


    return(
        <div className={classes.container}>

            {recommendedPosts.length ?
            recommendedPosts.map(post=>(
            <Grid className={classes.grid} key={post._id} onClick={()=>navigate(`/posts/${post._id}`)}>
                <p>{post.title}</p>
                <p>by {post.creator}</p>
                <img src={post.selectedFile} />
            </Grid>

            )):
            <>No posts as of now</>}
        </div>
    )
}
