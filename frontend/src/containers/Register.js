import React, { useState } from 'react';
import '../Styles/Auth.css';
import { Link, Redirect } from "react-router-dom";

// Redux
import { connect } from 'react-redux';
import { register } from '../redux/actions/auth';


// Material Ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles'


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


function Register({ register, isAuthenticated }) {
    const [form, setForm] = useState({name: '', username: '', email: '', password: '', password2: ''})
    const { name, username, email, password, password2 } = form;
    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const [acceptTerms, setAcceptTerms] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        register(name, username, email, password, password2);
        setForm({ ...form, password: '', password2: '' });
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }


    return (
        <Container component="main" style={{ maxWidth: '500px' }}>
            <div className='auth'>
                <Avatar className='auth__avatar'>
                    <AccountCircleIcon />
                </Avatar>
                <h1 className='auth__label'>Register</h1>
                <form className='auth__form' noValidate onSubmit={handleSubmit}>
                    <InputField
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        autoComplete="fname"
                        variant="outlined"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        autoFocus
                        margin="normal"
                    />
                    <InputField
                        name="username"
                        value={username}
                        onChange={e => onChange(e)}
                        autoComplete="uname"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        margin="normal"
                    />
                    <InputField
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        margin="normal"
                    />
                    <InputField
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <InputField
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        variant="outlined"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <FormControlLabel
                        control={<Checkbox onClick={() => {setAcceptTerms(!acceptTerms)}} value="allowExtraEmails" style={{ color: 'var(--primary-color)' }} />}
                        label="I have read and agree to the Terms of Service and Privacy Policy"
                    />
                    <Button
                        disabled={!acceptTerms}
                        type="submit"
                        fullWidth
                        variant="contained"
                        className='register__btn'
                    >
                    Sign Up
                    </Button>
                    <div className='register__link'>
                        <Link to='/login'>
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
            <Box mt={5}>
                <div className='auth__copyright'>
                    Copyright © PSJ {new Date().getFullYear()}.
                </div>
            </Box>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register);