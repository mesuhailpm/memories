import useStyles from "./styles"
import{Card,CardActions,CardContent,CardMedia,Button,Typography, useRadioGroup,} from '@mui/material'
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import {ThumbUpAlt,ThumbUpAltOutlined,Delete,MoreHoriz} from '@mui/icons-material'
// import DeleteIcon from '@mui/icons-material/Delete'
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch} from 'react-redux'
import{deletePost,likePost,getPosts} from '../../../actions/posts'
import moment from 'moment'
export default function Post({post,currentId,setCurrentId,user}){

    const classes =useStyles()
    const dispatch=useDispatch()
    const handleSelect= () => setCurrentId(post._id)
    const handleDelete = async(e)=>{
        e.stopPropagation()
        dispatch(deletePost(post._id))
    }

    const handleLike= async()=>{
        dispatch(likePost(post._id))
    }
    const likeComponent =  post.likes.length
                ?
                    post.likes.find(userId=> userId === user?.id )
                    ?
                        <Button size="small" color="primary" onClick={handleLike} disabled={!user}> <ThumbUpAlt fontSize="small" />&nbsp;
                        {post.likes.length > 2
                                            ?
                                    `You and ${post.likes.length-1} others`
                                    : post.likes.length ===1 ? `${post.likes.length} like`:`${post.likes.length} likes`}
                                    {/* this user liked */}

                        </Button>

                    :
                        <Button size="small" color="primary" onClick={handleLike} disabled={!user}> <ThumbUpAltOutlined fontSize="small" />&nbsp;
                        {`${ post.likes.length } ${post.likes > 1? 'Likes' : 'Like' }`}
                        </Button>
                :<Button size="small" color="primary" onClick={handleLike} disabled={!user}> <ThumbUpAltOutlined fontSize="small" />&nbsp;
                Like
                </Button>


// console.log(post?.creator,' is creator')
console.log(user?.id,' is userId is logged in')
console.log(post.likes ,' is users who liked')


    return(
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'> {post.creator}</Typography>
                    <Typography variant="body2"> {moment(post.createdAt).fromNow()}  </Typography>
                </div>
                <div className={classes.overlay2}>
                    {user && <Button style={{color:'white'}} size='small' onClick={handleSelect}><MoreHoriz fontSize="default" /></Button>}
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    {likeComponent}
                    <Button size="small" color="primary" onClick={handleDelete}disabled={user && user.id === post.creatorId ? false : true }><Delete fontSize="small" disabled /> Delete</Button>
                </CardActions>
            </Card>
        </div>
    )
}
