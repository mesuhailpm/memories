import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE,FETCH_POSTS_BY_PAGE, START_LOADING, STOP_LOADING } from "../actionTypes";

export default (state = { isLoading:true, posts:[],totalPagesCount:1 } ,action)=> {
    switch (action.type) {
        case FETCH_ALL:
            console.log('fetching the posts, this is from reducers')
            console.log(action.payload,' inside reducer')//test
            return action.payload;

        case FETCH_POSTS_BY_PAGE:
            console.log('fetching the posts, this is from reducers')
            console.log(action.payload.posts,' inside reducer')//test
            return {...state, posts:action.payload.posts,totalPagesCount:action.payload.totalPagesCount}

        case START_LOADING:
            return {...state, isLoading:true}

        case STOP_LOADING:
            return {...state, isLoading:false}


        case UPDATE:
            console.log('updating the posts')
            return {...state,posts:state.posts.map((post)=>post._id === action.payload.id ? action.payload:post)}
        case LIKE:
            console.log('updating the posts by incrementing like')
            return {...state, posts:state.posts.map((post)=>post._id === action.payload.id ? action.payload:post)}

        case CREATE:
            return {...state, posts:action.payload}
        case DELETE:
            console.log('deleting the posts')
            return {...state, posts:state.posts.filter((post)=> post._id !== action.payload)}
        default:
            return state;
    }
}
