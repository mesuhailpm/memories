import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { Grid } from '@mui/material'
export default function RecommendedPost ({post,recommendedPosts}) {

    const classes = useStyles()
    const navigate = useNavigate()


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
