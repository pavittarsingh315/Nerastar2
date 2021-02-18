import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getFollowers, getFollowing } from '../redux/actions/general';

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


function RightMenu({ profile, followers, following, getFollowers, getFollowing, followersOfUser, followingOfUser }) {
    const [openFollowers, setOpenFollowers] = useState(false);

    const handleOpenFollowers = (username) => {
        setOpenFollowers(!openFollowers);
        if(!openFollowers) {
            // this stops requests being sent everytime notifications are openned
            if(username !== followersOfUser) {
                getFollowers(username);
            }
        }
    };

    const [openFollowing, setOpenFollowing] = useState(false);

    const handleOpenFollowing = (username) => {
        setOpenFollowing(!openFollowing);
        if(!openFollowing) {
            // this stops requests being sent everytime notifications are openned
            if(username !== followingOfUser) {
                getFollowing(username);
            }
        }
    };

    return (
        <div className='rightmenu'>
            <div className='rightmenu__header'>
                <div className='rightmenu__headerTop'>
                    <img alt='' className='rightmenu__avatar' src={profile.avatar} />
                    <div className="rightmenu__headerText">
                        <h3>
                            {profile.full_name}
                        </h3>
                        <Link to={`/${profile.user}`} style={{ textDecoration: 'none' }}>
                            <span>
                                @{profile.user}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className='rightmenu__headerBottom'>
                    <span>
                        {profile.bio}
                    </span>
                </div>
            </div>
            <Divider style={{ margin: '10px 0' }} />
            <div className='rightmenu__nav'>
                <div className='rightmenu__navOption' onClick={() => handleOpenFollowers(profile.user)}>
                    <span>
                        {profile.number_followers}
                    </span>
                    Followers
                </div>
                <div className='rightmenu__navOption' onClick={() => handleOpenFollowing(profile.user)}>
                    <span>
                        {profile.number_following}
                    </span>
                    Following
                </div>
                <Link to={`/posts/${profile.user}`} style={{ textDecoration: 'none' }}>
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
                                <Link className="followers__left" to={follower.username} onClick={handleOpenFollowers} style={{ textDecoration: 'none' }}>
                                    <Avatar alt='' src={follower.avatar} />
                                    <div className="followers__leftText">
                                        <h3>{follower.name}</h3>
                                        <h5>
                                            {follower.username}
                                        </h5>
                                    </div>
                                </Link>
                                {follower.following === "true" ? (
                                    <Button className="followingBtn">Unfollow</Button>
                                ) : (
                                    <Button className="followBtn">Follow</Button>
                                )}
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
                                <Link className="followers__left" to={following.username} onClick={handleOpenFollowers} style={{ textDecoration: 'none' }}>
                                    <Avatar alt='' src={following.avatar} />
                                    <div className="followers__leftText">
                                        <h3>{following.name}</h3>
                                        <h5>
                                            {following.username}
                                        </h5>
                                    </div>
                                </Link>
                                {following.following === "true" ? (
                                    <Button className="followingBtn">Unfollow</Button>
                                ) : (
                                    <Button className="followBtn">Follow</Button>
                                )}
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
    profile: state.auth.profile,
    followers: state.general.followers,
    following: state.general.following,
    followersOfUser: state.general.followersOfUser,
    followingOfUser: state.general.followingOfUser
})


export default connect(mapStateToProps, { getFollowers, getFollowing })(RightMenu);