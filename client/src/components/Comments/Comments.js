import React from "react"
import { useSelector } from "react-redux"
import { COMMENT } from "../../actionTypes"

const Comments = () => {
    const {post} = useSelector((state)=>state.posts)
    console.log('this is form comments components, ',post.comments)

    if (!post.comments) return null


    return (
        <>
        {post.comments.map((comment,i)=>(
            <p key={i}>{comment}{i}</p>
        ))}

        </>

    )
}
export default Comments
