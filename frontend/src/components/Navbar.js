import React, { useState } from 'react';
import '../Styles/Navbar.css';
import { Link, useHistory } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { getNotifications, deleteNotification } from '../redux/actions/alerts';

// Material Ui
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Material Ui
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';


function Navbar({ logout, numNotifications, getNotifications, notifications, isLoading, deleteNotification }) {
    const [search, setSearch] = useState('');
    const [numberofNotifications, setNumberofNotifications] = useState(numNotifications);
    const history = useHistory();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/users/${search}`)
        setSearch('');
    }
    return (
        <div className='navbar'>
            <div className='navbar__left'>
                <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                <h3>Nerastar</h3>
            </div>
            <div className='navbar__center'>
                <div className='navbar__search'>
                    <SearchIcon />
                    <form onSubmit={handleSubmit}>
                        <input value={search} onChange={e=>setSearch(e.target.value)} type='text' placeholder='Search Users' />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>

            <div className='navbar__right'>
                <Link to='/'>
                    <div className='navbar__icon'>
                        <Tooltip title='Home' arrow enterDelay={0} leaveDelay={25}>
                            <IconButton>
                                <HomeIcon />
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
                <MuiDialogContent className='comments__modal'>
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
                                        <Link style={{ textDecoration: 'none' }} to={notification.post} onClick={handleOpenCloseNotifications}>
                                            <div className='notification__bodyRight'>
                                                <h3>{notification.sender}</h3>
                                                <h5>
                                                    {notification.message}
                                                </h5>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <IconButton onClick={() => deleteNotification(notification.id)}>
                                            <CloseIcon />
                                        </IconButton>
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
    isLoading: state.alerts.isLoading
})

export default connect(mapStateToProps, { logout, getNotifications, deleteNotification })(Navbar);
