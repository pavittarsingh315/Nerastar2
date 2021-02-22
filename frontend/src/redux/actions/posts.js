import { GET_POSTS, ADD_POST, POSTS_LOADING, GET_ALERTS, POST_LOADING_ERROR } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';


export const getPosts = (page) => async (dispatch, getState) => {
    dispatch({
        type: POSTS_LOADING
    })

    await axios.get(`http://localhost:8000/api/posts/feed-posts/?page=${page}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: POST_LOADING_ERROR
        })
        console.log(err.response.data, err.response.status)
    })

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