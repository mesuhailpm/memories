import React,{useState} from 'react'
import {Container,Typography, Paper,Button } from '@mui/material'
import {GoogleLogin,GoogleOAuthProvider} from '@react-oauth/google'
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import useStyles from'./styles'
import Input from './Input'
import { signin,signup,generateToken } from '../../actions/auth'
import Icon from './Icon'

const initialForm={ firstName:'',lastName:'',email:'',password:'', confirmPassword:''}


export default function Auth(){
    const [signUp,setSignUp] =useState(false)
    const [formData,setFormData]= useState(initialForm)
    const [showPassword,setShowPassword] =useState(false)

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toggleShowPassword =()=>
    {setShowPassword(prevState=>!prevState)}
    const handleChange =(e)=>{
        setFormData( {...formData,[e.target.name]:e.target.value} )

    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        if(signUp){
            dispatch(signup(formData,navigate))
        }else{
            dispatch(signin(formData,navigate))
        }
    }

    const toggle=(e)=>{
        e.preventDefault()
        setSignUp(prevState=>!prevState)
        setFormData(initialForm)
        setShowPassword(false)
    }
    const handleSuccces=async(response)=>{
        try {
            const decodedData = await jwt(response.credential)
            dispatch( generateToken(decodedData,navigate))
            // const {name,email,picture,sub} = decodedData

            // dispatch ({type:AUTH,data:decodedData})
        } catch (error) {
            console.log(error)

        }
    }
    const handleFail=(error)=>console.log(error)
    return(
    <GoogleOAuthProvider clientId='485615364888-kqqoik35a5lef2r7h0bqsnihmsi5ktv1.apps.googleusercontent.com'>
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.paper} sx={{display:'flex', justifyContent: 'center', padding:'25px'}} >
                <form className={`${classes.form}`} autoComplete='off' p={3} onSubmit={handleSubmit} >
                    {signUp && <Input name ='firstName' label= 'First Name'  handleChange={handleChange} half  autoFocus/>}
                    {signUp && <Input name ='lastName' label= 'Last Name'  handleChange={handleChange} half />}
                    <Input name='email' label= 'Email address' value={formData.email} handleChange={handleChange} />
                    <Input name='password' label = 'Password' type={`${showPassword?'':'password'}`} value={formData.password}  handleChange={handleChange} setShowPassword={setShowPassword}/>
                    {signUp && <Input name='confirmPassword' label ='Confirm password' type='password' value={formData.confirmPassword}  handleChange={handleChange} />}


                <Button variant='contained' color='primary' className={classes.submit} type='submit' fullWidth>{`${signUp?'Sign Up':'Sign in'}`}</Button >
                {!signUp &&
                < GoogleLogin
                    //clientId='485615364888-jk50cb6bt62h07ekmg3bqc1ti141f570.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button className='classes.googleButton' color="primary" fullwidth  onClick={renderProps.onClick} disabled ={renderProps.disabled} startIcon={<Icon />} variant ='contained'>
                            {`Google Sign in`}
                        </Button>
                    )}
                    onSuccess={handleSuccces}
                    onFailure={handleFail}
                    // cookiePolicy ="single_host_origin"
                  />

                    }
                {signUp&&
                <Typography variant='subtitle2'> Already have an account?
                    <Button variant='secondary' color='secondary' onClick={toggle} >Sign in</Button>
                </Typography>
                }


                    {!signUp &&
                        <>
                            <Typography variant='subtitle2'>Don't have an account?
                                <Button variant ='secondary' color='primary'onClick={toggle}> Create one now</Button>
                            </Typography>
                        </>
                    }
                </form>

            </Paper>
        </Container>

    </GoogleOAuthProvider>)
}
