import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { reset_password } from '../redux/actions/auth';


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


function ResetPassword({ reset_password }) {
    const [formData, setFormData] = useState({ email: '' })
    const { email } = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
    }

    return (
        <Container component="div" style={{ maxWidth: '500px' }} >
            <div className='auth'>
                <h1 className='auth__label'>Request Password Reset</h1>
                <form className='auth__form' noValidate onSubmit={e => onSubmit(e)}>
                    <InputField
                        value={email}
                        name="email"
                        onChange={e => onChange(e)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="off"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className='auth__btn'
                    >
                        Request Reset
                    </Button>
                    <div className='login__links'>
                        <div>
                            <Link to='/login'>
                                Go Back
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default connect(null, { reset_password })(ResetPassword);
