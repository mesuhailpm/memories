import useStyles from "./styles"
import{Card,CardActions,CardContent,CardMedia,Button,Typography,} from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch} from 'react-redux'
import{updatePost,deletePost,likePost,getPosts} from '../../../actions/posts'
import moment from 'moment'
export default function Post({post,currentId,setCurrentId}){

    const classes =useStyles()
    const dispatch=useDispatch()
    const handleSelect= () => setCurrentId(post._id)
    const handleDelete = async(e)=>{
        e.stopPropagation()
        dispatch(deletePost(post._id))
    }

    const handleLike= async()=>{
        await dispatch(likePost(post._id))
        dispatch(getPosts())
    }

    return(
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'> {post.creator}</Typography>
                    <Typography variant="body2"> {moment(post.createdAt).fromNow()}  </Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{color:'white'}} size='small' onClick={handleSelect} ><MoreHorizIcon fontSize="default" /></Button>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={handleLike}> <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
                    <Button size="small" color="primary" onClick={handleDelete}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </Card>
        </div>
    )
}
