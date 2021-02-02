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
    PASSWORD_RESET_CONFIRM_FAIL,
    GET_ALERTS
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
            const alerts = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
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
            const alerts = {
                msg: res.data,
                status: res.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        }).catch(err => {
            const alerts = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
            dispatch({
                type: REGISTER_FAIL
            })
        })
};


export const activate = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    await axios.post('http://localhost:8000/api/users/activate/', body, config)
        .then(res => {
            dispatch({
                type: ACTIVATION_SUCCESS,
            })
            const alerts = {
                msg: res.data,
                status: res.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        }).catch(err => {
            const alerts = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
            dispatch({
                type: ACTIVATION_FAIL
            })
        })
}


export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    await axios.post('http://localhost:8000/api/users/reset-password/', body, config)
        .then(res => {
            dispatch({
                type: PASSWORD_RESET_SUCCESS,
            })
            const alerts = {
                msg: res.data,
                status: res.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        }).catch(err => {
            const alerts = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
            dispatch({
                type: PASSWORD_RESET_FAIL
            })
        })
}


export const reset_password_confirm = (uid, token, password, password2) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, password, password2 });

    await axios.post('http://localhost:8000/api/users/reset-password-confirm/', body, config)
        .then(res => {
            dispatch({
                type: PASSWORD_RESET_CONFIRM_SUCCESS,
            })
            const alerts = {
                msg: res.data,
                status: res.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
        }).catch(err => {
            const alerts = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ALERTS,
                payload: alerts
            })
            dispatch({
                type: PASSWORD_RESET_CONFIRM_FAIL
            })
        })
}


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