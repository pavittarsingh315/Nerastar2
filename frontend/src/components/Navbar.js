import React, { useState } from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';

// Redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { getNotifications, deleteNotification, removeNotification } from '../redux/actions/alerts';
import { acceptOrDeclineFollowRequest, viewProfile } from '../redux/actions/general';

// Material Ui

import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';



function Navbar({ logout, numNotifications, getNotifications, notifications, isLoading, deleteNotification, removeNotification, profile, acceptOrDeclineFollowRequest, viewProfile }) {
    const [numberofNotifications, setNumberofNotifications] = useState(numNotifications);
    const [openNotifications, setOpenNotifications] = useState(false);

    const handleOpenCloseNotifications = () => {
        setOpenNotifications(!openNotifications);
        if(!openNotifications) {
            // this stops requests being sent everytime notifications are openned
            if(notifications === undefined || notifications.length === 0) {
                getNotifications();
                setNumberofNotifications(0)
            }
        }
    }



    const handleAcceptOrDecline = (e, notificationSender, notificationId) => {
        const type = e.target.innerText
        if (type === 'Accept') {
            acceptOrDeclineFollowRequest(notificationSender, profile.user, 'accepted');
            removeNotification(notificationId)
        } else if (type === 'Decline') {
            acceptOrDeclineFollowRequest(notificationSender, profile.user, 'ignore');
            removeNotification(notificationId)
        }
    }

    return (
        <div className='navbar'>
            <div className='navbar__left'>
                <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                <h3>Nerastar</h3>
            </div>
            <div className='navbar__center'>
                <Searchbar />
            </div>

            <div className='navbar__right'>
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='navbar__icon' onClick={() => viewProfile(profile.user)}>
                        <Tooltip title='Your Feed' arrow enterDelay={0} leaveDelay={25}>
                            <IconButton>
                                <PersonIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Link>
                <div className='navbar__icon' onClick={handleOpenCloseNotifications}>
                    <Tooltip title='Notifications' arrow enterDelay={0} leaveDelay={25}>
                        <IconButton>
                            <Badge badgeContent={numberofNotifications} max={10}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className='navbar__icon'>
                    <Tooltip title='Logout' arrow enterDelay={0} leaveDelay={25}>
                        <IconButton onClick={logout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <Dialog maxWidth='xs' fullWidth open={openNotifications} onClose={handleOpenCloseNotifications} aria-labelledby="create-post-title">
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Notifications</Typography>
                </MuiDialogTitle>
                <MuiDialogContent className='generalModal'>
                    {isLoading ? (
                        <div className='modalLoading'>
                            <CircularProgress style={{ color: 'var(--primary-color)' }} />
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div key={notification.id}>
                                <div className='notifications'>
                                    <div className='notification__body'>
                                        <Link to={notification.sender} onClick={handleOpenCloseNotifications}>
                                            <div className='notification__bodyLeft'>
                                                <Avatar alt='' src={notification.senderAvatar} />
                                            </div>
                                        </Link>
                                        <Link style={{ textDecoration: 'none' }} to={`posts/${notification.post}`} onClick={handleOpenCloseNotifications}>
                                            <div className='notification__bodyRight'>
                                                <h3>{notification.sender}</h3>
                                                <h5>
                                                    {notification.message}
                                                </h5>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        {notification.notificationType === 'Like' ? (
                                            <IconButton onClick={() => deleteNotification(notification.id)}>
                                                <CloseIcon />
                                            </IconButton>
                                        ) : notification.notificationType === 'Follow' ? (
                                            <div className='notification__followBtns'>
                                                <Button className='notification__followOption' onClick={e => handleAcceptOrDecline(e, notification.sender, notification.id)} size='small'>Accept</Button>
                                                <Button className='notification__followOption' onClick={e => handleAcceptOrDecline(e, notification.sender, notification.id)} size='small'>Decline</Button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <Divider style={{ margin: '20px 0px 10px' }} />
                            </div>
                        ))
                    )}
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' />
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    numNotifications: state.auth.profile.unreadNotifications,
    notifications: state.alerts.notifications,
    isLoading: state.alerts.isLoading,
    profile: state.auth.profile
})

export default connect(mapStateToProps, { logout, getNotifications, deleteNotification, removeNotification, acceptOrDeclineFollowRequest, viewProfile })(Navbar);
