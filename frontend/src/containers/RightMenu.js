import React from 'react';
import { Link } from 'react-router-dom';

// Material Ui
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';


function RightMenu() {
    return (
        <div className='rightmenu'>
            <div className='rightmenu__header'>
                {/* Image dimensions 320x320 */}
                <img alt='' src='https://i.pinimg.com/originals/45/11/c5/4511c5871ff8011385b023be70878d81.jpg' />
                <div className="rightmenu__headerText">
                    <h3>
                        Pavittar Singh
                    </h3>
                    <span>
                        @Darkstar
                    </span>
                </div>
                <Divider />
            </div>
            <div className='rightmenu__nav'>
                <Link to='/darkstar' style={{ textDecoration: 'none' }}>
                    <div className='rightmenu__navOption'>
                        <PersonIcon />
                        Profile
                    </div>
                </Link>
                <Link to='/create' style={{ textDecoration: 'none' }}>
                    <div className='rightmenu__navOption'>
                        <AddIcon />
                        Add Post
                    </div>
                </Link>
                {/* Modal */}
                <div className='rightmenu__navOption'>
                    <SettingsIcon />
                    Settings
                </div>
            </div>
        </div>
    )
}

export default RightMenu
