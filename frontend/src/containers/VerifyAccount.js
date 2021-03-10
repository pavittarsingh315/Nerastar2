import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { activate } from '../redux/actions/auth';

// Material Ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


function VerifyAccount({ match, activate, isAuthenticated }) {
    const [verified, setVerified] = useState(false);

    const activate_account = () => {
        const uid = match.params.uid
        const token = match.params.token

        activate(uid, token);
        setVerified(true);
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    }

    const btnStyle = {
        margin: 'auto',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        maxWidth: '300px',
        height: '50px'
    }

    if (verified) {
        return <Redirect to='/' />
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <Container style={{ marginTop: '100px' }}>
            <div style={divStyle}>
                <h1>Activate your account</h1>
                <Button onClick={activate_account} type="submit" fullWidth variant="outline" style={btnStyle}>
                    Activate
                </Button>
            </div>
        </Container>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { activate })(VerifyAccount);
