import React from "react";
import {Typography,Grow,Grid ,Paper} from '@mui/material'
import Form from "../Form/Form";
import Posts from "../Posts/Posts";


export default function Home({user,currentId,setCurrentId}){
    console.log('rendering hoem component')

    return(
    <Grow in>
        <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} user={user}/>


            </Grid>
            <Grid item xs={12} sm={4}>
              {user? <Form user={user} currentId={currentId} setCurrentId={setCurrentId}/>
                    :
                    <Paper>
                      <Typography p={3} >
                        Sign in using credentials to create or update memories
                      </Typography>

                    </Paper>}
            </Grid>

        </Grid>
    </Grow>


    )
}
