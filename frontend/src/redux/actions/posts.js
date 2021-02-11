import { GET_POSTS, ADD_POST, DELETE_POST, GET_ALERTS } from './types';
import axios from 'axios';


export const getPosts = () => async (dispatch, getState) => {

    await axios.get('http://localhost:8000/api/posts/feed-posts/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err.response.data, err.response.status))
}

export const likeUnlikePost = (postSlug, like) => async (dispatch, getState) => {
    var body;
    if (like) {
        body = JSON.stringify({ "like": "like" });
    } else {
        body = JSON.stringify({ "like": "unlike" });
    }

    await axios.post(`http://localhost:8000/api/posts/like-unlike/${postSlug}/`, body, tokenConfig(getState))
        .then(res => {})
        .catch(err => {})
}

export const addPost = (post, username) => async (dispatch, getState) => {

    await axios.post(`http://localhost:8000/api/posts/listprofileposts/${username}/`, post, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            const alerts = {
                msg: {
                    success: 'Post Added!'
                },
                status: 200
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        }).catch(err => {
            const alerts = {
                msg: {
                    error: 'Something Went Wrong! Post Not Added!'
                },
                status: 400
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        })
}

export const tokenConfig = getState => {
    const access = getState().auth.access

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(access){
        config.headers['Authorization'] = `JWT ${access}`;
    }

    return config
}