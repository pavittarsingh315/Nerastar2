import React, { useState } from 'react';
import '../Styles/Auth.css';
import { Link, Redirect } from "react-router-dom";

// Redux
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';


// Material Ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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


function Login({ login, isAuthenticated }) {
    const [form, setForm] = useState({email: '', password: ''});
    const { email, password } = form;
    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password);
        setForm({email: '', password: ''})
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <Container component="div" style={{ maxWidth: '500px' }} >
            <CssBaseline />
            <div className='login'>
                <Avatar className='login__avatar'>
                    <AccountCircleIcon />
                </Avatar>
                <h1 className='login__label'>Login</h1>
                <form className='login__form' noValidate onSubmit={e => handleSubmit(e)}>
                    <InputField
                        value={email}
                        name="email"
                        onChange={e => onChange(e)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                    />
                    <InputField
                        value={password}
                        name="password"
                        onChange={e => onChange(e)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox onClick={() => {setRememberMe(!rememberMe)}} value="remember" style={{ color: 'var(--primary-color)' }} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className='login__btn'
                    >
                        Sign In
                    </Button>
                    <div className='login__links'>
                        <div>
                            <Link to='/reset-password'>
                                Forgot Password?
                            </Link>
                        </div>
                        <div>
                            <Link to='/register'>
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <Box mt={2}>
                <div className='login__copyright'>
                    Copyright © PSJ {new Date().getFullYear()}.
                </div>
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
