import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Material Ui
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';


function RightMenu({ profile }) {
    const [openFollowers, setOpenFollowers] = useState(false);
    const handleOpenFollowers = () => {
        setOpenFollowers(!openFollowers);
    };
    const [openFollowing, setOpenFollowing] = useState(false);
    const handleOpenFollowing = () => {
        setOpenFollowing(!openFollowing);
    };

    return (
        <div className='rightmenu'>
            <div className='rightmenu__header'>
                <img alt='' className='rightmenu__avatar' src={profile.avatar} />
                <div className="rightmenu__headerText">
                    <h3>
                        {profile.full_name}
                    </h3>
                    <span>
                        @{profile.user}
                    </span>
                </div>
                <Divider />
            </div>
            <div className='rightmenu__nav'>
                <div className='rightmenu__navOption' onClick={handleOpenFollowers}>
                    <span>
                        {profile.number_followers}
                    </span>
                    Followers
                </div>
                <div className='rightmenu__navOption' onClick={handleOpenFollowing}>
                    <span>
                        {profile.number_following}
                    </span>
                    Following
                </div>
                <Link to='/darkstar' style={{ textDecoration: 'none' }}>
                    <div className='rightmenu__navOption'>
                        <PersonIcon />
                        Profile
                    </div>
                </Link>
            </div>
            <Dialog maxWidth='xs' fullWidth open={openFollowers} onClose={handleOpenFollowers} aria-labelledby="create-post-title">
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Followers</Typography>
                </MuiDialogTitle>
                <MuiDialogContent className='comments__modal'>
                    
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' />
            </Dialog>

            <Dialog maxWidth='xs' fullWidth open={openFollowing} onClose={handleOpenFollowing} aria-labelledby="create-post-title">
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Following</Typography>
                </MuiDialogTitle>
                <MuiDialogContent className='comments__modal'>
                    
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' />
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.auth.profile,
})


export default connect(mapStateToProps)(RightMenu);