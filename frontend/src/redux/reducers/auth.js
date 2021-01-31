/* eslint-disable import/no-anonymous-default-export */
import {
    NEW_ACCESS_TOKEN,
    USER_LOAD_SUCCESS,
    USER_LOADING,
    USER_LOAD_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS_SESSION,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL
} from '../actions/types';


var access;
var refresh;
if (localStorage.getItem('access')) {
    access = localStorage.getItem('access')
} else if(sessionStorage.getItem('access')) {
    access = sessionStorage.getItem('access')
} else {
    access = null
}

if (localStorage.getItem('refresh')) {
    refresh = localStorage.getItem('refresh')
} else if(sessionStorage.getItem('refresh')) {
    refresh = sessionStorage.getItem('refresh')
} else {
    refresh = null
}

const initialState = {
    access: access,
    refresh: refresh,
    isAuthenticated: null,
    user: null,
    isLoading: false
};


export default function(state = initialState, action) {
    const {type, payload} = action;
    
    switch(type) {
        case NEW_ACCESS_TOKEN:
            if (localStorage.removeItem('access')) {
                localStorage.removeItem('access');
                localStorage.setItem('access', payload.access);
            } else {
                sessionStorage.removeItem('access');
                sessionStorage.setItem('access', payload.access);
            }
            return {
                ...state,
                access: payload.access
            }
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: payload,
                isAuthenticated: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            // the ...payload puts the user object thats also in the response into the state
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOGIN_SUCCESS_SESSION:
            sessionStorage.setItem('access', payload.access);
            sessionStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case USER_LOAD_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            sessionStorage.removeItem('access')
            sessionStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                isLoading: false
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}