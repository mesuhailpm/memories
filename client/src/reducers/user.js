import { AUTH,LOGIN,LOGOUT} from "../actionTypes";

export default (user ={authData:null},action)=> {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify(action.data))
            if(action.data.token)localStorage.setItem('token',JSON.stringify(action.data.token))
            return {...user, authData:action.data};
        case LOGOUT:
            localStorage.clear()
            return {authData:null};
        default:
            return user;
    }
}
