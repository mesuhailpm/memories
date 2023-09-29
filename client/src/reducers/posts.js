import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE,FETCH_POSTS_BY_PAGE, START_LOADING, STOP_LOADING,FETCH_SINGLE_POST, FETCH_POSTS_BY_SEARCH,COMMENT } from "../actionTypes";

export default (state = { isLoading:true, posts:[],totalPagesCount:1,post:{} } ,action)=> {
    
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH_POSTS_BY_SEARCH:
            return {...state, posts:action.payload}

        case FETCH_POSTS_BY_PAGE:
            localStorage.setItem('page',JSON.stringify(action.payload.page))
            return {...state, posts:action.payload.posts,totalPagesCount:action.payload.totalPagesCount, page:action.payload.page}
        case FETCH_SINGLE_POST:
            return {...state, post:action.payload};

        case START_LOADING:
            return {...state, isLoading:true}

        case STOP_LOADING:
            return {...state, isLoading:false}
        case COMMENT:
            return {...state, post: {...state.post,comments:action.payload} }

        case UPDATE:
            return {...state,posts:state.posts.map((post)=>post._id === action.payload._id ? action.payload: post)}
        case LIKE:
            return {...state, posts:state.posts.map((post)=>post._id === action.payload._id ? action.payload: post)}
        case CREATE:
            return {...state, posts:action.payload}
        case DELETE:
            return {...state, posts:state.posts.filter((post)=> post._id !== action.payload)}
        default:
            return state;
    }
}
