import { AUTH,SETUSER,LOGOUT} from "../actionTypes";

export default (user ={authData:{}},action)=> {
    switch (action.type) {
        case AUTH:
            console.log('profile shpuld be set ',action.payload)
            localStorage.setItem('profile',JSON.stringify(action.payload))
            if(action.payload.token)localStorage.setItem('token',JSON.stringify(action.payload.token))
            return {...user, authData:action.payload,token:action.payload.token};
        case LOGOUT:
            localStorage.clear()
            return {authData:null};
        case SETUSER:
            return {authData: JSON.parse(localStorage.getItem('profile')),token: JSON.parse(localStorage.getItem('token'))}
        default:
            return user;
    }
}
// authData:{}
// authData:{email:email,id:id, token: 2472yu, name: username}
//
//
