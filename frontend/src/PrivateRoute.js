import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './HOCS/Loading';


function PrivateRoute ({ component: Component, auth, ...rest }) {
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

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);