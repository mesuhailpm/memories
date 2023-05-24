import React, { useState } from "react";
import {Typography,Grow,Grid ,Paper,TextField, Button,AppBar} from '@mui/material'
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Paginate from "../paginate/Paginate";
import {MuiChipsInput} from 'mui-chips-input'
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import useStyles from './styles'


export default function Home({user,currentId,setCurrentId}){
    console.log('rendering home component')
    const [keyword,setKeyword] = useState('')
    const [tags,setTags]= useState([])
    const [page,setPage] = useState(1)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()

    const searchMemories =()=>{
      if (keyword.trim() || tags) {
      dispatch(getPostsBySearch({ keyword : keyword, tags: tags.join(',') }));
      navigate(`/posts/search?query=${keyword ||'none'}&tags=${tags.join(',')}`)
    }else{
      navigate('/')
    }
  }
    const handleKeyPress =(e)=>{
      if(e.keyCode===13)
        searchMemories()
    }

    const handleAddChip=(tag)=>setTags([...tags, tag])
    const handleDeleteChip=(tag)=>{setTags(tags.filter((item)=> item !== tag))}

    return(
    <Grow in>
        <Grid container flexDirection="row" className={classes.gridContainer} spacing={2}>


            <Grid item sx={12} md={9}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} user={user}/>


            </Grid>
            <Grid item sx={12} md={3}>
              <AppBar position="static" className={classes.appBarSearch} >
                <TextField variant="filled" color="primary" fullWidth label="Search Memories" value={keyword} onChange={(e)=>setKeyword(e.target.value)} onKeyDown={handleKeyPress}/>
                <MuiChipsInput
                  label = "Search tags"
                  onAddChip={(chip)=>{handleAddChip(chip)}}
                  onDeleteChip={(chip)=>{handleDeleteChip(chip)}}
                  value={tags}
                  fullWidth
                  variant="filled"
                />
                <Button className={classes.searchButton} variant ="contained" color="primary" onClick={searchMemories} > Search</Button>

                <Paper className={classes.paginate} elevation = {6} sx={{marginBottom:'5px}'}}>
                  <Paginate
                    page={page}
                    setPage={setPage}
                  />
                </Paper>
                {user? <Form user={user} currentId={currentId} setCurrentId={setCurrentId}/>
                      :
                      <Paper>
                        <Typography p={3} >
                          Sign in using credentials to create or update memories
                        </Typography>

                      </Paper>}
              </AppBar>
            </Grid>


        </Grid>
    </Grow>


    )
}
