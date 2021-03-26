import { 
    GET_POSTS, 
    ADD_POST, 
    POSTS_LOADING, 
    GET_ALERTS, 
    POST_LOADING_ERROR, 
    GET_COMMENTS,
    GET_REPLIES
} from './types';
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

export const getProfilePosts = (page, username) => async (dispatch, getState) => {
    if (!username) return;
    await axios.get(`http://localhost:8000/api/posts/listprofileposts/${username}/?page=${page}`, tokenConfig(getState))
        .then (res => {
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

export const getComments = (slug, page) => async (dispatch, getState) => {
    dispatch({
        type: 'COMMENTS_LOADING'
    })

    await axios.get(`http://localhost:8000/api/posts/listcomments/${slug}/?page=${page}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: 'COMMENT_LOADING_ERROR'
            })
            console.log(err.response.data, err.response.status)
        })
}


export const getReplies = (id, page) => async (dispatch, getState) => {
    dispatch({
        type: 'REPLIES_LOADING'
    })

    await axios.get(`http://localhost:8000/api/posts/listreplies/${id}/?page=${page}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPLIES,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: 'REPLIES_LOADING_ERROR'
            })
            console.log(err.response.data, err.response.status)
        })
}


export const addComment = (comment, slug) => async (dispatch, getState) => {
    
    await axios.post(`http://localhost:8000/api/posts/createcomment/${slug}/`, comment, tokenConfig(getState))
        .then(res => {
            if(comment.get('receiver') && comment.get('commentId')) {
                dispatch({
                    type: "ADD_REPLY",
                    payload: res.data
                })
            } else {
                dispatch({
                    type: "ADD_COMMENT",
                    payload: res.data
                })
            }
            const alerts = {
                msg: {
                    success: 'Comment Added!'
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
                    error: 'Something Went Wrong! Comment Not Added!'
                },
                status: 400
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        })
}


export const handleBookmark = (slug) => async (dispatch, getState) => {
    // have to send an empty thing cause it throws unauthorized error if we don't.
    // I guess since its a post request it expects something so just send an empty placeholder
    var body;
    await axios.post(`http://localhost:8000/api/posts/handlebookmarks/${slug}/`, body, tokenConfig(getState))
        .then(res => {})
        .catch(err => console.log(err.response))
}