import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE,FETCH_POSTS_BY_PAGE } from "../actionTypes";

export default (posts =[],action)=> {
    switch (action.type) {
        case FETCH_ALL:
            console.log('fetching the posts, this is from reducers')
            return action.payload;
        case FETCH_POSTS_BY_PAGE:
            return action.payload.posts
        case UPDATE:
            console.log('updating the posts')
            return posts.map((post)=>post._id===action.payload.id ? action.payload:post)
        case LIKE:
            console.log('updating the posts by incrementing like')
            return posts.map((post)=>post._id===action.payload.id ? action.payload:post)

        case CREATE:
            return [...posts, action.payload];
        case DELETE:
            console.log('deleting the posts')
            return posts.filter((post)=> post._id!==action.payload)
        default:
            return posts;
    }
}
