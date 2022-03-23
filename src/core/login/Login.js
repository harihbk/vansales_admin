import React , { useState , useEffect, useRef, useContext } from 'react'
import { render } from 'react-dom';
import LoginService from "../../service/Login.service";
import { Button, TextField, Grid, Paper, AppBar, Typography, Toolbar, Link } from "@material-ui/core";
import './login.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Navigate , Route ,Outlet } from "react-router-dom";
import useAuth from './hooks/useAuth';

export default function Login() {
    const { setAuth } = useAuth();
    const [ errorMessage , setErrorMessage ] = useState('');
    const { register , handleSubmit , formState : {errors}} = useForm();
    var navigate = useNavigate();

    /*
    After Submit Login
    */
    useEffect(() => {
        let data = localStorage.getItem("access_token")
        return data ? navigate('/home') : <Outlet /> ;
      });


    const onSubmit = (data) => {

        const strategy = {"strategy": "local"}
        const credentials = {...data,...strategy}
        LoginService.Authentication(credentials).then(r=>{
            // hide error message when success
            setErrorMessage('');
            const access_token = r.data.accessToken || '';
            const user         = r.data.user || {};
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('user_detail', JSON.stringify(user));
            navigate('/home')
        }).catch(e=>{
            if(e.response.status == 401){
                setErrorMessage('UserName or Password inValid!');
            } else {
                setErrorMessage('Server not responding');

            }
        })
    };


  return (

    <Grid
    container
    spacing={0}
    alignItems="center"
    justifyContent="center"
    direction="row">
        <Grid item>
            <Grid container direction="column" justifyContent="center" spacing={2} className="login-form">
            <Paper variant="elevation" elevation={2} className="login-background">
                <Grid item>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                </Grid>

                <Grid item>
                {errorMessage && (
  <p className="error"> {errorMessage} </p>
)}
               
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                            <TextField
                                            {...register('email', { required: true })}
                                            type="email"
                                            placeholder="Email"
                                            fullWidth
                                            name="email"
                                            variant="outlined"
                                            autoFocus
                                        />
                                            

                                    </Grid>
                                    {errors.email && <span>Email is required.</span>}
                                    <Grid item>
                                        <TextField
                                        {...register('password', { required: true })}
                                        type="password"
                                        placeholder="Password"
                                        fullWidth
                                        name="password"
                                        variant="outlined"
                                        />
                                    </Grid>
                                    {errors.password && <span>Password is required.</span>}
                                    <Grid item>
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className="button-block"
                                    >
                                    Submit
                                    </Button>
                                    </Grid>
                            </Grid>
                    </form>
                </Grid>
            <Grid item>
            <Link href="#" variant="body2">
            Forgot Password?
            </Link>
            </Grid>
            </Paper>
            </Grid>
        </Grid>
    
  </Grid>

  )
}
