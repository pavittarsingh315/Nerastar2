/* eslint-disable import/no-anonymous-default-export */
import { GET_ALERTS, CLEAR_ALERTS, GET_NOTIFICATIONS, DELETE_NOTIFICATION, NOTIFICATIONS_LOADING } from '../actions/types';


const initialState = {
    msg: {},
    status: null,
    notifications: [],
    isLoading: false
}


export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case NOTIFICATIONS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALERTS:
            return {
                ...state,
                msg: payload.msg,
                status: payload.status
            }
        case CLEAR_ALERTS:
            return {
                ...state,
                msg: {},
                status: null,
                notification: []
            }
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload,
                isLoading: false
            }
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.id !== action.payload)
            }
        default:
            return state
    }
}