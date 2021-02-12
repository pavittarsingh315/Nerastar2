/* eslint-disable import/no-anonymous-default-export */
import { GET_POSTS, ADD_POST, DELETE_POST, CLEAR_POSTS } from '../actions/types';


const initialState = {
    posts: []
}


export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts]
            }
        case CLEAR_POSTS:
            return{
                ...state,
                posts: []
            }
        default:
            return state
    }
}