import Post from "./Post/Post"
import useStyles from "./styles"
import {useSelector} from "react-redux";
import {Grid,CircularProgress} from '@mui/material'

export default function Posts({user,currentId,setCurrentId}){
    const classes = useStyles()

    const posts = useSelector((state)=> state.posts);
    console.log(posts,' are posts from posts component')
    return(
        <div className={classes.mainContainer}>
        {!posts.length ?
            <CircularProgress />
            :<Grid className={classes.container} container  alignItems='stretch' spacing ={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item xs={12} sm ={4} md={3} raised elevation={6} >
                        <Post
                        post={post}
                        setCurrentId={setCurrentId}
                        user={user}
                        />
                    </Grid>

                ))}
            </Grid>
        }        </div>
    )
}
