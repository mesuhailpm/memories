import React from "react"
import { useSelector } from "react-redux"
import { COMMENT } from "../../actionTypes"
import { Box, Grid, Typography } from "@mui/material"
import useStyles from './styles'

const Comments = () => {
    const {post} = useSelector((state)=>state.posts)
    console.log('this is form comments components, ',post.comments)

    const classes = useStyles()

    if (!post.comments) return null


    return (
        <>
            {post.comments.map((comment,i)=>(
                <Typography key={i} variant="body1" borderBottom="0.1px solid gray"><strong>{comment.split(':')[0]}</strong>:{comment.split(':')[1]}</Typography>
        ))}
        </>

    )
}
export default Comments
