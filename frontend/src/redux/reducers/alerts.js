/* eslint-disable import/no-anonymous-default-export */
import { GET_ALERTS, CLEAR_ALERTS } from '../actions/types';


const initialState = {
    msg: {},
    status: null
}


export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_ALERTS:
            return {
                msg: payload.msg,
                status: payload.status
            }
        case CLEAR_ALERTS:
            return {
                msg: {},
                status: null
            }
        default:
            return state
    }
}


export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ALERTS
    })
}