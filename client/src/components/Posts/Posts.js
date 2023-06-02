import Post from "./Post/Post"
import useStyles from "./styles"
import {useSelector} from "react-redux";
import {Grid,CircularProgress} from '@mui/material'

export default function Posts({user,currentId,setCurrentId}){
    const classes = useStyles()

    const posts = useSelector((state)=> state.posts.posts || []);
    const postsReducer = useSelector((state)=> state.posts || [])
    console.log(postsReducer,' are full posts inside the reducer I am from posts component')
    console.log(posts,' are posts inside the reducer I am from posts component')
    return(
        <div className={classes.mainContainer}>
        {!posts.length ?
            <CircularProgress />
            :<Grid container   alignItems='stretch' spacing ={3}>
                {posts.map((post)=>(
                    <Grid item key={post._id} xs={12} sm ={6} md={6} lg = {3} raised elevation={6} >
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
