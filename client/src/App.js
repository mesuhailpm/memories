//imports
import {Container, Box } from '@mui/material'
import Nav from './components/Nav/Nav'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import {useLocation} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles'
import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {getPosts} from './actions/posts'
import { Routes,Route } from 'react-router-dom';

function App() {
  const navigate =useNavigate()
  const [currentId, setCurrentId] = useState(0);
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  console.log(user, ' is the user state; this is from App')


  const [home,setHome] = useState(true) //home is the landing page data available for all(i,e no authentication)

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts());
    console.log('useEffect ran inside App.js')
  }, [dispatch,currentId]);

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')))
    console.log('useEffect ran', 'with ',user)


  },[location,home])

  useEffect(()=>{
    try {
      const token = user?.token
      const decoded = jwtDecode(token)
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
      <Container display='flex' maxwidth='lg'>
        <Nav user={user} setUser={setUser} home={home} setHome={setHome} />

        <Routes>
          <Route path="/auth" element={ <Box sx={{display:'flex', justifyContent: 'center'}}>
                                 <Auth />
                                </Box>}/>
          <Route path ="/" element ={ <Home user={user} currentId={currentId} setCurrentId={setCurrentId} />
              }/>
        </Routes>


          {/* <Box sx={{display:'flex', justifyContent: 'center'}}>
            {!home && <Auth signUp={signUp} setSignUp={setSignUp}/>} */}

            {/* {home && <Home currentId={currentId} setCurrentId={setCurrentId} />} */}
            {/* </Box> */}

      </Container>

  );
}

export default App;
