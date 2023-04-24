//imports
// import './App.css';
import {Container, AppBar,Typography,Grow,Grid } from '@mui/material'
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './styles'
import icon from './images/album.png'
import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {getPosts} from './actions/posts'
function App() {
  const [currentId, setCurrentId] = useState(0);

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts());
    console.log('useEddect ran')
  }, [dispatch,currentId]);

//Component
  return (
    <Container maxwidth='lg'>
      <AppBar
      className={classes.appBar}
      position='static' color='inherit'>

        <Typography
        className={classes.heading}
         variant='h2' align='center'>
          Memories
        <img src={icon}
        className={classes.image}
         alt="icon" height='60' />
        </Typography>

      </AppBar>
      <Grow in>
        <Container >
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>

          </Grid>
        </Container>


      </Grow>

    </Container>
  );
}

export default App;
