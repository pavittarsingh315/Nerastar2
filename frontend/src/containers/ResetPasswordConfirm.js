import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../redux/actions/auth';


// Material Ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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


function ResetPasswordConfirm({ match, reset_password_confirm }) {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({ password: '', password2: '' })
    const { password, password2 } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, password, password2);
        setRequestSent(true);
    }

    return (
        <Container component="div" style={{ maxWidth: '500px' }} >
            <div className='auth'>
                <h1 className='auth__label'>Request Password Reset</h1>
                <form className='auth__form' noValidate onSubmit={e => onSubmit(e)}>
                    <InputField
                        value={password}
                        name="password"
                        onChange={e => onChange(e)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        label="New Password"
                        autoComplete="password"
                        autoFocus
                    />
                    <InputField
                        value={password2}
                        name="password2"
                        onChange={e => onChange(e)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password2"
                        label="Confirm New Password"
                        autoComplete="password2"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className='auth__btn'
                    >
                        Reset Password
                    </Button>
                    {requestSent ? (
                      <div className='login__links'>
                          <div>
                              <Link to='/login'>
                                  Login to your account
                              </Link>
                          </div>
                      </div>
                    ) : null}
                </form>
            </div>
        </Container>
    )
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
