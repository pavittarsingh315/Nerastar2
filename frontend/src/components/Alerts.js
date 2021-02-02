import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../redux/reducers/alerts';

// Material Ui
import Alert from '@material-ui/core/Alert';
import Collapse from '@material-ui/core/Collapse';


function Alerts({ error, clearErrors }) {
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
    const [open, setOpen] = useState(true);
    const prevProps = useRef({ error }).current;

    useEffect(() => {
        if (error !== prevProps.error) {

            // Login Page Alerts
            if (error.msg.email && error.msg.password) {
                const msg = 'Enter your email and password'
                setAlert({ msg, show: true, type: 'error' });
                alertTimeout();
            } else if (error.msg.email) {
                const msg = 'Enter your email'
                setAlert({ msg, show: true, type: 'error' });
                alertTimeout();
            } else if (error.msg.password) {
                const msg = 'Enter your password'
                setAlert({ msg, show: true, type: 'error' });
                alertTimeout();
            }

            // General Success & Error Alerts
            if (error.msg.error) {
                setAlert({ msg: `${error.msg.error} (╯°□°）╯︵ ┻━┻`, show: true, type: 'error' });
                alertTimeout();
            } else if (error.msg.success) {
                setAlert({ msg: `${error.msg.success} ┬─┬ ノ( ゜-゜ノ)`, show: true, type: 'success' });
                alertTimeout();
            }
            
            
            setOpen(true);
        }

        return () => {
            setOpen(false);
            setAlert({ show: false, msg: '', type: '' });
        }
    }, [error])

    const alertTimeout = () => {
        setTimeout(() => {
            setOpen(false);
            clearErrors();
            setAlert({ show: false, msg: '', type: '' });
        }, 10000);
    }

    return (
        <div className='alerts'>
            {alert.show ? (
                <div style={{ width:'100%', marginTop: '16px' }}>
                    <Collapse in={open}>
                        <Alert variant="outlined" severity={alert.type}>
                            {alert.msg}
                        </Alert>
                    </Collapse>
              </div>
            ): null}
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.alerts
})

export default connect(mapStateToProps, { clearErrors })(Alerts);