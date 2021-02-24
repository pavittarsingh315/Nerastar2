import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getFollowers, getFollowing, viewProfile, handleFollowers } from '../redux/actions/general';

// Material Ui
import Divider from '@material-ui/core/Divider';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';


function RightMenu({ userProfile, displayProfile, followers, following, getFollowers, getFollowing, followersOfUser, followingOfUser, viewProfile, handleFollowers }) {
    const [openFollowers, setOpenFollowers] = useState(false);

    const handleOpenFollowers = (username) => {
        setOpenFollowers(!openFollowers);
        if(!openFollowers) {
            // this stops requests being sent everytime modal is openned for current user
            if(username !== followersOfUser) {
                getFollowers(username);
            }
        }
    };

    const [openFollowing, setOpenFollowing] = useState(false);

    const handleOpenFollowing = (username) => {
        setOpenFollowing(!openFollowing);
        if(!openFollowing) {
            // this stops requests being sent everytime modal is openned for current user
            if(username !== followingOfUser) {
                getFollowing(username);
            }
        }
    };

    const handleFollowRequest = (e, username) => {
        const element = e.target
        if (element.innerText === 'Follow') {
            if (username) {
                handleFollowers(userProfile.user, username, "Follow")
            } else {
                handleFollowers(userProfile.user, displayProfile.user, "Follow")
            }
            element.innerText = 'Cancel Request'
        } else if (element.innerText === 'Unfollow') {
            if (username) {
                handleFollowers(userProfile.user, username, "Unfollow")
            } else {
                handleFollowers(userProfile.user, displayProfile.user, "Unfollow")
            }
            element.innerText = 'Follow'
        } else if (element.innerText === 'Cancel Request') {
            if (username) {
                handleFollowers(userProfile.user, username, "Cancel")
            } else {
                handleFollowers(userProfile.user, displayProfile.user, "Cancel")
            }
            element.innerText = 'Follow'
        }
    }

    return (
        <div className='rightmenu'>
            <div className='rightmenu__header'>
                <div className='rightmenu__headerTop'>
                    <img alt='' className='rightmenu__avatar' src={displayProfile.avatar} />
                    <div className="rightmenu__headerText">
                        <div>
                            <h3>
                                {displayProfile.full_name}
                            </h3>
                            <span>
                                @{displayProfile.user}
                            </span>
                        </div>
                        {userProfile.user === displayProfile.user ? (
                            <div className="rightmenu__settingsBtn">
                                <Tooltip title='Settings' arrow enterDelay={0} leaveDelay={25}>
                                    <IconButton>
                                        <SettingsIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (
                            <Button className="rightmenu__followBtn" size="small" onClick={e => handleFollowRequest(e)}>
                                {displayProfile.areFollowing === "true" ? 'Unfollow' : displayProfile.areFollowing === "requested" ? "Cancel Request" : "Follow"}
                            </Button>
                        )}
                        
                    </div>
                </div>
                <div className='rightmenu__headerBottom'>
                    <span>
                        {displayProfile.bio}
                    </span>
                </div>
            </div>
            <Divider style={{ margin: '10px 0' }} />
            <div className='rightmenu__nav'>
                <div className='rightmenu__navOption' onClick={() => handleOpenFollowers(displayProfile.user)}>
                    <span>
                        {displayProfile.number_followers}
                    </span>
                    Followers
                </div>
                <div className='rightmenu__navOption' onClick={() => handleOpenFollowing(displayProfile.user)}>
                    <span>
                        {displayProfile.number_following}
                    </span>
                    Following
                </div>
                <Link to={`/posts/${displayProfile.user}`} style={{ textDecoration: 'none' }}>
                    <div className='rightmenu__navOption'>
                        <PermMediaOutlinedIcon />
                        Posts
                    </div>
                </Link>
            </div>
            <Dialog maxWidth='xs' fullWidth open={openFollowers} onClose={handleOpenFollowers} aria-labelledby="create-post-title">
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Followers</Typography>
                </MuiDialogTitle>
                <MuiDialogContent className='generalModal'>
                    {followers.map(follower => (
                        <div key={follower.slug}>
                            <div key={follower.slug} className='followers'>
                                <div className="followers__left" onClick={() => viewProfile(follower.username)}>
                                    <Avatar alt='' src={follower.avatar} />
                                    <div className="followers__leftText">
                                        <h3>{follower.name}</h3>
                                        <h5>
                                            {follower.username}
                                        </h5>
                                    </div>
                                </div>
                                {follower.username !== userProfile.user ? (
                                    <Button size='small' className="followBtn" onClick={e => handleFollowRequest(e, follower.username)}>
                                        {follower.following === "true" ? 'Unfollow' : follower.following === "requested" ? "Cancel Request" : "Follow"}
                                    </Button>
                                ) : null}
                            </div>
                            <Divider style={{ margin: '20px 0px 10px' }} />
                        </div>
                    ))}
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' />
            </Dialog>

            <Dialog maxWidth='xs' fullWidth open={openFollowing} onClose={handleOpenFollowing} aria-labelledby="create-post-title">
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Following</Typography>
                </MuiDialogTitle>
                <MuiDialogContent className='generalModal'>
                    {following.map(following => (
                        <div key={following.slug}>
                            <div className='followers'>
                                <div className="followers__left" onClick={() => viewProfile(following.username)}>
                                    <Avatar alt='' src={following.avatar} />
                                    <div className="followers__leftText">
                                        <h3>{following.name}</h3>
                                        <h5>
                                            {following.username}
                                        </h5>
                                    </div>
                                </div>
                                {following.username !== userProfile.user ? (
                                    <Button size='small' className="followBtn" onClick={e => handleFollowRequest(e, following.username)}>
                                        {following.following === "true" ? 'Unfollow' : following.following === "requested" ? "Cancel Request" : "Follow"}
                                    </Button>
                                ) : null}
                            </div>
                            <Divider style={{ margin: '20px 0px 10px' }} />
                        </div>
                    ))}
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' />
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    userProfile: state.auth.profile,
    displayProfile: state.general.displayProfile,
    followers: state.general.followers,
    following: state.general.following,
    followersOfUser: state.general.followersOfUser,
    followingOfUser: state.general.followingOfUser
})


export default connect(mapStateToProps, { getFollowers, getFollowing, viewProfile, handleFollowers })(RightMenu);