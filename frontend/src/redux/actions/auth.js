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
} from './types';
import axios from 'axios';


export const checkAuthentication = () => async (dispatch, getState) => {
    const access = getState().auth.access

    if (access) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: access })

        await axios.post('http://localhost:8000/api/jwtoken/verify/', body, config)
            .then(res => {
                if (res.data.code !== 'token_not_valid') {
                    dispatch({
                        type: AUTHENTICATED_SUCCESS
                    });
                } else {
                    dispatch({
                        type: AUTHENTICATED_FAIL
                    });
                }
            })

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


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

        const refresh = localStorage.getItem('refresh')
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


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    await axios.post('http://localhost:8000/api/users/login/', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err.response.data, err.response.status)
            dispatch({ type: LOGIN_FAIL })
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