import React from "react"
import { useSelector } from "react-redux"
import { COMMENT } from "../../actionTypes"

const Comments = () => {
    const {post} = useSelector((state)=>state.posts)

    if (!post.comments) return null


    return (
        <>
        {post.comments.map((comment)=>(
            <p>{comment}</p>
        ))}

        </>

    )
}
export default Comments
