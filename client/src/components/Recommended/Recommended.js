import React, { useEffect, useState } from 'react'
import {FETCH_POSTS_BY_SEARCH} from '../../actionTypes'
import {getPostsBySearch} from '../../actions/posts'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { Grid } from '@mui/material'
export default function RecommendedPost () {

    const dispatch = useDispatch()
    const classes = useStyles()

    const currentPost = useSelector((state)=>state.posts.post)
    const state = useSelector ((state)=>state)

    // console.log(currentPost || 'loading',' is currentPost')//test
    // console.log(state || 'loading',' is state')// test
    useEffect(()=>{
        dispatch( getPostsBySearch({keyword:'',tags:currentPost.tags?.join(',')}))
    },[currentPost])


    return(
        <div className={classes.container}>
        {state.posts.posts.map(post=>(
            <Grid className={classes.grid}>
                <p>{post.title}</p>
                <p>by {post.creator}</p>
                <img src={post.selectedFile} />
            </Grid>

        ))}
        </div>
    )
}
