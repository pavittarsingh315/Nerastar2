import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/actions/auth';

// Material Ui
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

function Settings() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.general.displayProfile)
    const reload = useSelector(state => state.general.reloadPage);
    const [form, setForm] = useState({
        full_name: '',
        username: '',
        bio: '',
        file: null,
        fileName: null
    })
    const [openSettings, setOpenSettings] = useState(false);

    const handleOpenSettings = () => {
        setOpenSettings(!openSettings);
        setForm({
            full_name: profile.full_name,
            username: profile.user,
            bio: profile.bio,
            file: null,
            fileName: null
        })
    };

    const handleFormChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFormFile = e => {
        setForm({
            ...form,
            file: e.target.files[0],
            fileName: e.target.files[0].name
        })
        // var imgTag = document.getElementById('pfpPreview').childNodes[0]
        // imgTag.src = URL.createObjectURL(e.target.files[0]);
        // imgTag.onload = () => {
        //     URL.revokeObjectURL(imgTag.src)
        // }
    }

    const handleClearFile = () => {
        setForm({
            ...form,
            file: null,
            fileName: null
        })
        // var imgTag = document.getElementById('pfpPreview').childNodes[0]
        // imgTag.src = ''
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newProfileData = new FormData();
        newProfileData.append('full_name', form.full_name);
        newProfileData.append('slug', form.username);
        newProfileData.append('bio', form.bio);
        if(form.file && form.fileName) {
            newProfileData.append('avatar', form.file, form.fileName)
        } 

        dispatch(updateProfile(newProfileData))

        setOpenSettings(false);
        setForm({
            full_name: profile.full_name,
            username: profile.user,
            bio: profile.bio,
            file: null,
            fileName: null
        })
    }

    useEffect(() => {
        if (reload) {
            window.location.href = window.location.href
        }
    }, [reload])

    return (
        <div>
            <div className='rightmenu__settingsBtn' onClick={handleOpenSettings}>
                <Tooltip title='Settings' arrow enterDelay={0} leaveDelay={25}>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <Dialog maxWidth='xs' fullWidth open={openSettings} onClose={handleOpenSettings} aria-labelledby="create-post-title">
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Settings</Typography>
                </MuiDialogTitle>
                <MuiDialogContent className='generalModal'>
                    <form noValidate onSubmit={handleFormSubmit}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <InputField
                                value={form.full_name}
                                id="full_name"
                                label="Name"
                                name='full_name'
                                type="text"
                                variant="outlined"
                                onChange={handleFormChange}
                                margin="normal"
                                style={{ paddingRight: '3px' }}
                            />
                           <InputField
                                value={form.username}
                                id="username"
                                label="Username"
                                name='username'
                                type="text"
                                variant="outlined"
                                onChange={handleFormChange}
                                margin="normal"
                                style={{ paddingLeft: '3px' }}
                            />
                        </div>

                        <InputField
                            value={form.bio}
                            id="bio"
                            label="Bio"
                            name='bio'
                            type="text"
                            variant="outlined"
                            multiline
                            rows={3}
                            fullWidth
                            onChange={handleFormChange}
                            margin="normal"
                        />
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <input
                                accept=".png, .jpg, .jpeg"
                                id="image-upload"
                                style = {{ display: 'none' }}
                                type="file"
                                onChange={handleFormFile}
                            />
                            <label htmlFor="image-upload">
                                <IconButton component="span" style={{ backgroundColor: 'transparent' }}>
                                    <div className='postModalIcons'>
                                        {form.file && form.fileName ? (
                                            <Avatar style={{ width: '56px', height: '56px' }} sizes='50px' id='pfpPreview' alt='' src={URL.createObjectURL(form.file)} />
                                        ) : (
                                            <Avatar style={{ width: '56px', height: '56px' }} id='pfpPreview' alt='' src={profile.avatar} />
                                        )}
                                        Change PFP
                                    </div>
                                </IconButton>
                            </label>
                            {form.fileName ? (
                                <div className='postMediaName'>
                                    <Typography style={{ textAlign: 'center' }} variant='h6'>{form.fileName}</Typography>
                                    <IconButton onClick={handleClearFile}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            ) : null }
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className='postModalSubmitBtn'
                        >
                            Update
                        </Button>
                    </form>
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' />
            </Dialog>
        </div>
    )
}

export default Settings;
