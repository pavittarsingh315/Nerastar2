/* eslint-disable import/no-anonymous-default-export */
import { 
    GET_USERS_FOLLOWERS,
    GET_USERS_FOLLOWING,
    FOLLOWERS_LOADING,
    FOLLOWING_LOADING
} from '../actions/types';


const initialState = {
    isLoading: false,
    followers: [],
    following:[],
    followersOfUser: null,
    followingOfUser: null
}


export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case FOLLOWING_LOADING:
        case FOLLOWERS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_USERS_FOLLOWING:
            return {
                ...state,
                following: payload.response,
                followingOfUser: payload.user,
                isLoading: false
            }
        case GET_USERS_FOLLOWERS:
            return {
                ...state,
                followers: payload.response,
                followersOfUser: payload.user,
                isLoading: false
            }
        default:
            return state
    }
}