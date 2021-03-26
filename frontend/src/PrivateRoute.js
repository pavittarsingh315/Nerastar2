import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './HOCS/Loading';


function PrivateRoute ({ component: Component, ...rest }) {
    const auth = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={props => {
                if(auth.isLoading) {
                    return <Loading component={Component} />
                } else if(!auth.isAuthenticated) {
                    return <Redirect to="/login" />
                } else {
                    return <Component {...props} />
                }
            }}
        />
    )
}

export default PrivateRoute;