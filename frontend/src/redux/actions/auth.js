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
    REGISTER_FAIL
} from './types';
import axios from 'axios';


export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    await axios.get('http://localhost:8000/api/users/currentuser/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOAD_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err.response.data, err.response.status)
            dispatch(newAccessToken())
        })
}


export const newAccessToken = () => async (dispatch, getState) => {
    const refresh = getState().auth.refresh

    if (refresh) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ refresh })

        await axios.post('http://localhost:8000/api/jwtoken/refresh/', body, config)
            .then(res => {
                dispatch({
                    type: NEW_ACCESS_TOKEN,
                    payload: res.data
                })
                dispatch(loadUser())
            }).catch(err =>{
                console.log(err.response.data, err.response.status)
                dispatch({ type: USER_LOAD_FAIL })
            })
    } else {
        dispatch({ type: USER_LOAD_FAIL })
    }
}


export const login = (email, password, rememberMe) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    await axios.post('http://localhost:8000/api/users/login/', body, config)
        .then(res => {
            if (rememberMe) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            } else {
                dispatch({
                    type: LOGIN_SUCCESS_SESSION,
                    payload: res.data
                })
            }
        }).catch(err => {
            console.log(err.response.data, err.response.status)
            dispatch({ type: LOGIN_FAIL })
        })
}


export const register = (name, username, email, password, password2) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, username, email, password, password2 });

    await axios.post('http://localhost:8000/api/users/register/', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            console.log(res.data)
        }).catch(err => {
            console.log(err.response.data)
            dispatch({
                type: REGISTER_FAIL
            })
        })
};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
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