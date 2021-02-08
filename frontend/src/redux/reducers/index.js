import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import posts from './posts';


export default combineReducers({
    auth,
    alerts,
    posts
});