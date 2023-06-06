import React from 'react'
import {Container, AppBar,Typography,Grow,Grid, TextField, Paper,InputAdornment,IconButton } from '@mui/material'
import {Visibility,VisibilityOff} from '@mui/icons-material'



export default function Input({name,half,label,type,value,handleChange,setShowPassword,autoFocus}){
    return(

    <Grid item xs={12} sm={half ? 6 : 12} lg={half ? 6 : 12}>
        <TextField
        name={name}
        variant='outlined'
        label= {label}
        type={type}
        required
        onChange={handleChange}
        value={value}
        autoFocus={autoFocus}
        fullWidth
        InputProps={ name ==='password' ?
                    {endAdornment:<InputAdornment position="end" onClick={()=>setShowPassword((prevState)=>!prevState)}>
                        <IconButton>

                        { type === 'password' ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                    </InputAdornment>}
                : null}
        />

    </Grid>

    )
}
