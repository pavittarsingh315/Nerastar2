import { 
    GET_USERS_FOLLOWERS,
    GET_USERS_FOLLOWING,
    FOLLOWERS_LOADING,
    FOLLOWING_LOADING,
    SEARCH_USER,
    DISPLAY_PROFILE,
    GET_ALERTS
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


export const searchUser = (query, page) => async (dispatch, getState) => {
    if (query) {
        await axios.get(`http://localhost:8000/api/profiles/searchuser/?page=${page}&search=${query}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: SEARCH_USER,
                    payload: res.data
                })
            }).catch(err => console.log(err.response.data, err.response.status))
    }
}


export const viewProfile = (slug) => async (dispatch, getState) => {
    await axios.get(`http://localhost:8000/api/profiles/anyprofile/${slug}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DISPLAY_PROFILE,
                payload: res.data
            })
        }).catch(err => console.log(err.response.data, err.response.status))

}


export const followRequest = (sender, receiver, status) => async (dispatch, getState) => {

    const body = JSON.stringify({ sender, receiver, status });

    await axios.post('http://localhost:8000/api/profiles/followunfollow/', body, tokenConfig(getState))
        .then(res => {
            console.log(res.data)
            const alerts = {
                msg: {
                    success: 'Request Sent!'
                },
                status: 200
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        }).catch(err => console.log(err.response.data, err.response.status))

}

export const acceptOrDeclineFollowRequest = (sender, receiver, status) => async (dispatch, getState) => {

    const body = JSON.stringify({ sender, receiver, status });

    await axios.put('http://localhost:8000/api/profiles/followunfollow/', body, tokenConfig(getState))
        .then(res => {
            console.log(res.data)
        }).catch(err => console.log(err.response.data, err.response.status))
}