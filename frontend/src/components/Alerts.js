import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../redux/actions/alerts';

// Material Ui
import Alert from '@material-ui/core/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';


function Alerts({ error, clearErrors, isAuthenticated }) {
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
    const [open, setOpen] = useState(true);
    const prevProps = useRef({ error }).current;

    useEffect(() => {
        if (error !== prevProps.error) {

            // Login Page Alerts
            if (error.msg.email && error.msg.password) {
                const msg = 'Enter your email and password'
                setAlert({ msg, show: true, type: 'error' });
            } else if (error.msg.email) {
                const msg = 'Enter your email'
                setAlert({ msg, show: true, type: 'error' });
            } else if (error.msg.password) {
                const msg = 'Enter your password'
                setAlert({ msg, show: true, type: 'error' });
            }

            // General Success & Error Alerts
            if (error.msg.error) {
                setAlert({ msg: `${error.msg.error}`, show: true, type: 'error' });
            } else if (error.msg.success) {
                setAlert({ msg: `${error.msg.success}`, show: true, type: 'info' });
            }
            
            
            setOpen(true);
        }

        return () => {
            setOpen(false);
            setAlert({ show: false, msg: '', type: '' });
        }
    }, [error])

    const clearAlert = () => {
        setOpen(false);
        clearErrors();
        setAlert({ show: false, msg: '', type: '' });
    }

    return (
        <div className={isAuthenticated ? 'alertsAuth' : 'alertsUnAuth'}>
            {alert.show ? (
                <div style={{ width:'100%', marginTop: '16px' }}>
                    <Collapse in={open}>
                        <Alert variant="outlined" severity={alert.type} action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={clearAlert}
                            >
                                <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        iconMapping={{
                            info: <DoneAllOutlinedIcon fontSize="inherit" />,
                            error: <ErrorOutlineOutlinedIcon fontSize="inherit" />
                        }}
                        >
                            {alert.msg}
                        </Alert>
                    </Collapse>
              </div>
            ): null}
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.alerts,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { clearErrors })(Alerts);