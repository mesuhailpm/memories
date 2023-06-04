import { AUTH,LOGIN,LOGOUT} from "../actionTypes";

export default (user ={authData:null},action)=> {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify(action.payload))
            if(action.payload.token)localStorage.setItem('token',JSON.stringify(action.payload.token))
            return {...user, authData:action.payload,token:action.payload.token};
        case LOGOUT:
            localStorage.clear()
            return {authData:null};
        default:
            return user;
    }
}
