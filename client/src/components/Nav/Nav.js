import React from "react";
import { AppBar,Typography, Button, Toolbar, Avatar } from '@mui/material'
import useStyles from'./styles'
import icon from '../../images/album.png'
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../actionTypes";
import { useNavigate,Link } from "react-router-dom";

export default function Nav({user,setUser,home,setHome}){
  console.log(user,'is user')
    const classes = useStyles()
    const dispatch=useDispatch()
    const navigate =useNavigate()

    console.log(user, 'from nav component')




    return(

            <AppBar className={classes.appBar} id ='flex-container' position="static" color="inherit">

              <div className={classes.brandContainer} >

                <Typography  className={classes.heading} variant="h2" align="center" onClick={()=>{setHome(true)}} component={Link} to="/">Memories</Typography>
                <img src={icon} className={classes.image}  alt="icon" height='60' />

              </div>

              <Toolbar className={classes.toolbar}>
                  {user ?
                  (<div className={classes.profile}>
                    <Avatar className={classes.purple} alt= {user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                    <Button variant="contained" color='secondary' onClick={()=>{dispatch({type:LOGOUT});navigate('/'); setHome(true)  }} >Logout</Button>
                  </div>)
                  :
                  (home && <Button variant="contained" color='secondary' onClick={()=>{setHome(false)}} component={Link} to="/auth" >Sign in</Button>)
                  }
              </Toolbar>
            </AppBar>

          )
}
