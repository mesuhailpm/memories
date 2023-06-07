//imports
import {Container, Box } from '@mui/material'
import Nav from './components/Nav/Nav'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import {useLocation} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { useNavigate,Navigate } from 'react-router-dom';

import useStyles from './styles'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPosts,getPostsByPage} from './actions/posts'
import { Routes,Route } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails'

function App() {
  const navigate =useNavigate()
  const [currentId, setCurrentId] = useState(0);
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) || {name:''});

  console.log(user, ' is the user state; this is from App')


  const [home,setHome] = useState(true) //home is the landing page data available for all(i,e no authentication)

  // const [page,setPage] = useState(1)

  const classes = useStyles()
  const dispatch = useDispatch()

  const page = useSelector((state)=> state.posts.page || Number(JSON.parse(localStorage.getItem('page'))) || 1)
  const setPage = (number) => {dispatch(getPostsByPage(number))}

  useEffect(() => {
    dispatch(getPostsByPage(page));
    console.log('useEffect ran inside App.js')
  }, [dispatch,page]);

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')))
    console.log('useEffect ran', 'with ',user) //test 


  },[location,home])

  useEffect(()=>{
    try {
      const token = user?.token
      const decoded = jwtDecode(token)
      console.log('usEffect ran around token') //test
      console.log(decoded)
      console.log((decoded.exp * 1000) > new Date())

      if (decoded.exp * 1000 < new Date()){
        console.log('token expired')
        dispatch({type:'LOGOUT'})
          navigate('/auth')
          setUser(null)
      }

    } catch (error) {
      console.log(error)

    }


    },
    [location,dispatch]
    )


//Component
  return (
      <Container className={classes.app} display='flex' maxwidth='lg'>
        <Nav user={user} setUser={setUser} home={home} setHome={setHome} />

        <Routes>
          <Route path = '/' element={<Navigate to ='/posts'/>}/>
          <Route path = '/posts'         element ={ <Home user={user} currentId={currentId} setCurrentId={setCurrentId} page={page} setPage={setPage} />}/>
          <Route path = '/posts/search'  element ={ <Home user={user} currentId={currentId} setCurrentId = {setCurrentId}/>}/>
          <Route path = '/posts/:id' element = { <PostDetails /> } />
          <Route path = '/auth' element={ !user?<Auth />: <Navigate to = '/'/> }/>
        </Routes>


      </Container>

  );
}

export default App;
