import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { addPost } from '../redux/actions/posts';

// Material Ui
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import MicIcon from '@material-ui/icons/Mic';


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


function RightMenu({ username, addPost }) {
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const [postForm, setPostForm] = useState({
        caption: '',
        file: null,
        fileName: 'Optional Uploads'
    })

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

        addPost(post, username);

        setCreatePostOpen(false);
        setPostForm({
            caption: '',
            file: null,
            fileName: null
        });
    }

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
                <div className='rightmenu__navOption' onClick={handleCreatePostOpen}>
                    <AddIcon />
                    Add Post
                </div>
                <div className='rightmenu__navOption'>
                    <SettingsIcon />
                    Settings
                </div>


                <Dialog maxWidth='xs' fullWidth open={createPostOpen} onClose={handleCreatePostOpen} aria-labelledby="create-post-title">
                    <MuiDialogTitle disableTypography className='modalTitle'>
                        <Typography align='center' variant="h6">Create a Post</Typography>
                        {handleCreatePostOpen ? (
                        <IconButton aria-label="close" className='modalCloseBtn' onClick={handleCreatePostOpen} style={{ color: 'var(--primary-color)', backgroundColor: 'var(--third-color)' }}>
                            <CloseIcon />
                        </IconButton>
                        ) : null}
                    </MuiDialogTitle>
                    <MuiDialogContent className='comments__modal'>
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
        </div>
    )
}

const mapStateToProps = state => ({
    username: state.auth.user.username
})

export default connect(mapStateToProps, { addPost })(RightMenu);