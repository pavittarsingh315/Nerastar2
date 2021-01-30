import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

// Material Ui
import Container from '@material-ui/core/Container';

// Redux
import { connect } from 'react-redux';
import { loadUser, isAuthenticated } from '../redux/actions/auth';

function Layout(props) {

    useEffect(() => {
        props.isAuthenticated();
        props.loadUser();
        console.log('hello user how is your day?')
    }, [])

    const headerStyle = {
        boxShadow: '0px 6px 10px -9px rgba(117, 137, 235, 1)',
        position: 'fixed',
        zIndex: '1000',
        top: '0',
        width: '100%'
    }
    const bodyStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: '85px'
    }

    return (
        <div>
            <div style={headerStyle}>
                <Container>
                    <Navbar />
                </Container>
            </div>
            <Container>
                <div style={bodyStyle}>
                    {props.children}
                </div>
            </Container>
        </div>
    )
}

export default connect(null, { loadUser, isAuthenticated })(Layout);