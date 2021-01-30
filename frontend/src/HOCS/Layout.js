import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

// Material Ui
import Container from '@material-ui/core/Container';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/auth';

function Layout({ loadUser, isAuthenticated, children}) {
    useEffect(() => {
        loadUser();
    }, [loadUser])

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
            {isAuthenticated ? (
                <div style={headerStyle}>
                    <Container>
                        <Navbar />
                    </Container>
                </div>
            ) : null}
            <Container>
                <div style={bodyStyle}>
                    {children}
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loadUser })(Layout);