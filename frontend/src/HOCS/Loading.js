import React, { useState, useEffect } from 'react';

// Material Ui
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


function Loading({ component: Component }) {
    const [open, setOpen] = useState(false);

    const style = {
        zIndex: 1100,
        backgroundColor: 'rgba(255, 255, 255, 0.40)',
    }

    useEffect(() => {
        setOpen(true)

        return () => {
            setOpen(false)
        }
    }, [])

    return (
        <div>
            {Component ? <Component /> : null}
            <Backdrop open={open} style={style}>
                <CircularProgress size={100} thickness={3} style={{ color: 'var(--primary-color)' }} />
            </Backdrop>
        </div>
    );
}

export default Loading;