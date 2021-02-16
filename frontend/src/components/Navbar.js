import React, { useState } from 'react';
import '../Styles/Navbar.css';
import { Link, useHistory } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { getNotifications, deleteNotification } from '../redux/actions/alerts';
import { addPost } from '../redux/actions/posts';

// Material Ui
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
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
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MicIcon from '@material-ui/icons/Mic';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';
import Button from '@material-ui/core/Button';


const InputField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "var(--primary-color)"
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "red"
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "var(--primary-color)"
        },
        "&:hover fieldset": {
          borderColor: "var(--primary-color)"
        },
        "&.Mui-focused fieldset": {
          borderColor: "var(--primary-color)"
        }
      }
    }
})(TextField);


function Navbar({ logout, numNotifications, getNotifications, notifications, isLoading, deleteNotification, profile, addPost }) {
    const [search, setSearch] = useState('');
    const [numberofNotifications, setNumberofNotifications] = useState(numNotifications);
    const history = useHistory();
    const [openNotifications, setOpenNotifications] = useState(false);
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const [postForm, setPostForm] = useState({
        caption: '',
        file: null,
        fileName: 'Optional Uploads'
    })

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

    const handlePostFormChange = e => {
        setPostForm({
            ...postForm,
            [e.target.name]: e.target.value
        })
    }

    const handlePostFormFiles = e => {
        setPostForm({
            ...postForm,
            file: e.target.files[0],
            fileName: e.target.files[0].name
        })
    }

    const handleClearFile = () => {
        setPostForm({
            ...postForm,
            file: null,
            fileName: null
        })
    }

    const handleCreatePostOpen = () => {
        setCreatePostOpen(!createPostOpen);
        setPostForm({
            caption: '',
            file: null,
            fileName: null
        })
    };

    const handlePostSubmit = e => {
        e.preventDefault();

        const post = new FormData();
        post.append('content', postForm.caption)
        if (postForm.file) {
            post.append('media', postForm.file, postForm.fileName)
        }

        addPost(post, profile.user);

        setCreatePostOpen(false);
        setPostForm({
            caption: '',
            file: null,
            fileName: null
        });
    }
    return (
        <div className='navbar'>
            <Link to ='/' style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>
                <div className='navbar__left'>
                    <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                    <h3>Nerastar</h3>
                </div>
            </Link>
            <div className='navbar__center'>
                <div className='navbar__search'>
                    <SearchIcon />
                    <form onSubmit={handleSubmit}>
                        <input id="search-bar" value={search} onChange={e=>setSearch(e.target.value)} type='text' placeholder='Search Users' />
                        <label htmlFor="search-bar" style={{ display: 'none' }}>Search</label>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>

            <div className='navbar__right'>
                <Link to='/'>
                    <div className='navbar__icon'  onClick={handleCreatePostOpen}>
                        <Tooltip title='Add Post' arrow enterDelay={0} leaveDelay={25}>
                            <IconButton>
                                <AddIcon />
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
            <Dialog maxWidth='xs' fullWidth open={createPostOpen} onClose={handleCreatePostOpen} aria-labelledby="create-post-title">
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Create a Post</Typography>
                    {handleCreatePostOpen ? (
                    <IconButton aria-label="close" className='modalCloseBtn' onClick={handleCreatePostOpen} style={{ color: 'var(--primary-color)', backgroundColor: 'var(--third-color)' }}>
                        <CloseIcon />
                    </IconButton>
                    ) : null}
                </MuiDialogTitle>
                <MuiDialogContent className='generalModal'>
                    <form noValidate onSubmit={handlePostSubmit}>
                        <InputField
                            autoFocus
                            value={postForm.caption}
                            id="caption"
                            label="Caption"
                            name='caption'
                            multiline
                            rows={3}
                            fullWidth
                            type="text"
                            variant="outlined"
                            onChange={handlePostFormChange}
                            margin="normal"
                            required
                        />

                        <div className='postCreateMedia'>
                            <input
                                accept=".png, .jpg, .jpeg, .gif"
                                id="image-upload"
                                style = {{ display: 'none' }}
                                type="file"
                                onChange={handlePostFormFiles}
                            />
                            <label htmlFor="image-upload">
                                <IconButton component="span">
                                    <div className='postModalIcons'>
                                        <PhotoCamera />
                                        Upload Image
                                    </div>
                                </IconButton>
                            </label>

                            <input
                                accept="audio/*"
                                id="audio-upload"
                                style = {{ display: 'none' }}
                                type="file"
                                onChange={handlePostFormFiles}
                            />
                            <label htmlFor="audio-upload">
                                <IconButton component="span">
                                    <div className='postModalIcons'>
                                        <MicIcon />
                                        Upload Audio
                                    </div>
                                </IconButton>
                            </label>

                            <input
                                accept=".mp4, .mov"
                                id="video-upload"
                                style = {{ display: 'none' }}
                                type="file"
                                onChange={handlePostFormFiles}
                            />
                            <label htmlFor="video-upload">
                                <IconButton component="span">
                                    <div className='postModalIcons'>
                                        <Videocam />
                                        Upload Video
                                    </div>
                                </IconButton>
                            </label>
                        </div>
                        {postForm.fileName ? (
                            <div className='postMediaName'>
                                <Typography style={{ textAlign: 'center' }} variant='h6'>{postForm.fileName}</Typography>
                                <IconButton onClick={handleClearFile}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        ) : null }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className='postModalSubmitBtn'
                        >
                            Post
                        </Button>
                    </form>
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

export default connect(mapStateToProps, { logout, getNotifications, deleteNotification, addPost })(Navbar);
