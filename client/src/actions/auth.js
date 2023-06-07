import * as api from '../api/index'
import { AUTH,LOGIN,LOGOUT } from '../actionTypes'

export const signup = (credentials,navigate) => async(dispatch)=>{
    try {
       console.log(credentials, 'is credentials')
       const {data} = await api.signUp(credentials)
       dispatch({type:AUTH, payload:data})

       navigate('/')

    } catch (error) {
        console.log(error)
    }
}

export const signin = (credentials,navigate) => async(dispatch)=>{
    try {
        // console.log(credentials,'is credentials')
        const {data} = await api.signIn(credentials)
        dispatch({type:AUTH, payload:data})

        navigate('/')


    } catch (error) {
        console.log(error)
    }

}
export const generateToken =(decodedData,navigate)=>async (dispacth)=>{

    try {
        // console.log( ' is decoded data  is ',decodedData)

        const {data} = await api.generateToken(decodedData)
        console.log(data,'is data from backend check if tokeb is available')

        dispacth({type:AUTH,payload:data})
        navigate('/')

        // console.log(data)
    } catch (error) {
        console.log(error)

    }


}
