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
        <Box xs={12} md={7} margin="0 1rem" className={classes.commentsInnerContainer}>
            <Typography variant="h4" color="primary" margin="1rem" >Comments</Typography> 
            {post.comments.map((comment,i)=>(
                <Typography key={i} variant="body1"><strong>{comment.split(':')[0]}</strong>:{comment.split(':')[1]}</Typography>
        ))}

        </Box>

    )
}
export default Comments
