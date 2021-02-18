import React from 'react';
import { Link } from "react-router-dom";
import '../index.css';

// Material Ui
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';


function PageNotFound() {
    return (
        <div className='error'>
            <h1 className='error_h1'>Page Not Found!</h1>
            <Button variant='contained' className='error__homeBtn'>
                <Link className='error__link' to='/'>
                    <HomeIcon style={{paddingRight: '5px', paddingTop: '4px'}} />Home Page
                </Link>
            </Button>
        </div>
    )
}

export default PageNotFound;