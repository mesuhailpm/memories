import * as api from '../api/index'
import { AUTH,LOGIN,LOGOUT } from '../actionTypes'

export const signup = (credentials,navigate) => async(dispatch)=>{
    try {
       const {data} = await api.signUp(credentials)
       dispatch({type:AUTH, payload:data})

       navigate('/')

    } catch (error) {
        console.log(error)
    }
}

export const signin = (credentials,navigate) => async(dispatch)=>{
    try {
        const {data} = await api.signIn(credentials)
        dispatch({type:AUTH, payload:data})

        navigate('/')


    } catch (error) {
        console.log(error)
    }

}
export const generateToken =(decodedData,navigate)=>async (dispatch)=>{

    try {

        const {data} = await api.generateToken(decodedData)

        dispatch({type:AUTH,payload:data})
        navigate('/')

    } catch (error) {
        console.log(error)

    }


}
