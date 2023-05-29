import React, {useEffect} from "react";
import { Card, Typography,Divider, CircularProgress } from "@mui/material";
import moment from 'moment'
import {useParams}  from 'react-router-dom'
import { useSelector } from "react-redux";

import Recommended from '../Recommended/Recommended'
import useStyles from './styles'


export default function PostDetails(){
    const classes = useStyles()
    const {post,isLoading} = useSelector((state)=> state.posts)
    console.log(post)


    return  (

        <Card className={classes.card}>
        {isLoading ?<CircularProgress size={5} />:
         <div>
            <div className={classes.postDetails}>
                <div className={classes.section}>
                    <Typography variant="h2" className={classes.test} component='h3'>{post.title}</Typography>
                    <Typography gutterBottom>{post.tags?.join('#')}</Typography>
                    <Typography variant="h4" > By: {post.creator}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{moment(post.createdAt).fromNow()}</Typography>
                    <Typography variant="h5" gutterBottom>{post.message}</Typography>
                    <Typography variant="h6"> {post.likes?.length ? `${post.likes.length} ${post.length > 1 ? 'likes':'like' }`:'No likes'}</Typography>
                    <Divider/>
                    <Typography>Comments coming soon...</Typography>
                </div>

                <div className={classes.imageSection}>
                    <img src={post.selectedFile || 'https://yt3.ggpht.com/W1-I0q4z7rc5WpmgvyMV5w2upc1CsZ1kJrRdG9tbiQFisIMneRrxMPZL-xZ1mCID4dKu_rZ78PI=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'} className={classes.image}/>
                </div>

            </div>
            <Divider/>

            <div className={classes.recommended}>
                <Typography>You may also like</Typography>
                <Recommended/>

            </div>

         </div>

        }
        </Card>


    )

}
