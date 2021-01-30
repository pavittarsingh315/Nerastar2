/* eslint-disable import/no-anonymous-default-export */
import {
    NEW_ACCESS_TOKEN,
    USER_LOAD_SUCCESS,
    USER_LOADING,
    USER_LOAD_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    isLoading: false
};


export default function(state = initialState, action) {
    const {type, payload} = action;
    
    switch(type) {
        case NEW_ACCESS_TOKEN:
            localStorage.removeItem('access');
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: payload.access
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
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
                user: payload
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
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOAD_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                isLoading: false
            }
        default:
            return state
    }
}