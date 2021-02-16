import { 
    GET_USERS_FOLLOWERS,
    GET_USERS_FOLLOWING,
    FOLLOWERS_LOADING,
    FOLLOWING_LOADING
} from '../actions/types';
import axios from 'axios';
import { tokenConfig } from './auth';


export const getFollowers = (username) => async (dispatch, getState) => {
    dispatch({
        type: FOLLOWERS_LOADING
    })
    
    await axios.get(`http://localhost:8000/api/profiles/followers-following/${username}/?type=followers`, tokenConfig(getState))
        .then(res => {
            const data = {
                response: res.data,
                user: username
            }
            dispatch({
                type: GET_USERS_FOLLOWERS,
                payload: data
            })
        }).catch(err => console.log(err.response.data, err.response.status))
}


export const getFollowing = (username) => async (dispatch, getState) => {
    dispatch({
        type: FOLLOWING_LOADING
    })
    
    await axios.get(`http://localhost:8000/api/profiles/followers-following/${username}/?type=following`, tokenConfig(getState))
        .then(res => {
            const data = {
                response: res.data,
                user: username
            }
            dispatch({
                type: GET_USERS_FOLLOWING,
                payload: data
            })
        }).catch(err => console.log(err.response.data, err.response.status))
}