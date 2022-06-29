import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth'
const Auth = () => {
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    let switchMode = () => {
        setIsSignup((isSignup) => !isSignup)
        setShowPassword(false)
    }

    // const googleSuccess = async (response) => {
    //     console.log(response);
    // }
    // const googleFailure = (err) => {
    //     console.log('log in fail try again', err);
    // }






    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />

                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>

                                    <Input name='firstName' label='First Name'
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input name='lastName' label='Last Name'
                                        handleChange={handleChange}

                                        half
                                    />

                                </>
                            )
                        }

                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <div>-----------------------------</div>
                    {/* <GoogleLogin

                        clientId="269175801011-3m72kg0av68j2su36ka5v72ag75ioqcq.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className={classes.googleButton} color='primary'
                                fullWidth
                                variant='contained'
                            >Google</Button>
                        )}
                        buttonText="Login"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    /> */}

                    <Button fullWidth variant='contained' color='primary' className={classes.submit}>
                        Google Login
                    </Button>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'da co tai khoan hay dang nhap' : 'chua co tai khoan hay dang ky'}
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth