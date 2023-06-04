import React, { useState } from "react";
import {Typography,Grow,Grid ,Paper,TextField, Button,AppBar,CircularProgress,Box} from '@mui/material'
import {MuiChipsInput} from 'mui-chips-input'
import { Navigate,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Paginate from "../paginate/Paginate";
import useStyles from './styles'


export default function Home({user,currentId,setCurrentId, page, setPage}){
    console.log('rendering home component')
    const [keyword,setKeyword] = useState('')
    const [tags,setTags] = useState([])
    const totalPagesCount = useSelector( (state) => state.posts.totalPagesCount )
    const loading = useSelector( (state) => state.posts.isLoading ? true : false )

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()

    const searchMemories = () =>{
      if (keyword.trim() || tags) {
      dispatch(getPostsBySearch({ keyword, tags: tags.join(',') }));
      navigate(`/posts/search?query=${keyword || 'none'}&tags=${tags.join(',')}`);
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
        <Grid container flexDirection="row" className={`classes.gridContainer`} spacing={2}>


            {loading ? <Box className={classes.loadingContainer} ><CircularProgress size="7rem" /></Box>
                      :
              <Grid item xs = {12} md = {12}  lg = {9}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} user={user}/>


            </Grid>}
            <Grid item xs={12} md={3} lg ={3} >
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
                    totalPagesCount={totalPagesCount}
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
