/* eslint-disable import/no-anonymous-default-export */
import { GET_POSTS, ADD_POST, POSTS_LOADING, CLEAR_POSTS, POST_LOADING_ERROR } from '../actions/types';


const initialState = {
    posts: [],
    isLoading: false,
    hasMore: true,
    error: false
}


export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case POSTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case POST_LOADING_ERROR:
            return {
                ...state,
                error: true
            }
        case GET_POSTS:
            return {
                ...state,
                posts: state.posts.concat(payload.results),
                hasMore: payload.next,
                isLoading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts]
            }
        case CLEAR_POSTS:
            return{
                ...state,
                posts: [],
                isLoading: false,
                hasMore: true,
                error: false
            }
        default:
            return state
    }
}