import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import posts from './posts';
import general from './general';


export default combineReducers({
    auth,
    alerts,
    posts,
    general
});