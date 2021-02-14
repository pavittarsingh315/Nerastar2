import { CLEAR_ALERTS, GET_ALERTS, GET_NOTIFICATIONS, DELETE_NOTIFICATION, NOTIFICATIONS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';


export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ALERTS
    })
}

export const getNotifications = () => async (dispatch, getState) => {
    dispatch({
        type: NOTIFICATIONS_LOADING
    })
    
    await axios.get('http://localhost:8000/api/profiles/notifications/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: res.data
            })
        }).catch(err => console.log(err.response.data, err.response.status))
}

export const deleteNotification = (id) => async (dispatch, getState) => {
    await axios.delete(`http://localhost:8000/api/profiles/deletenotification/${id}/`, tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: DELETE_NOTIFICATION,
                payload: id
            })
        })
        .catch(err => console.log(err.response.data, err.response.status))
}

export const createSuccessAlert = (msg) => dispatch => {
    const message = {
        "success": msg
    }
    const alerts = {
        msg: message,
        status: null
    }
    dispatch({
        type: GET_ALERTS,
        payload: alerts
    })
}