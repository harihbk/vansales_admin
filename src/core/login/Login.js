import React , { useState , useEffect, useRef, useContext } from 'react'
import { render } from 'react-dom';
import LoginService from "../../service/Login.service";
import { Button, TextField, Grid, Paper, AppBar, Typography, Toolbar, Link } from "@material-ui/core";
import './login.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Navigate , Route ,Outlet } from "react-router-dom";
import useAuth from './hooks/useAuth';
import logo from '../../assets/images/van_logo.png';
import bgImg from '../../assets/images/login_bg.png'


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
    <div className="mainWrapper"> 
        <div className="innerWrapper">
            <div className="logoWrapper">
                <img src={logo} alt="Company Logo" className="logoImg" />
            </div>
            <Grid className="login_box" alignItems="center" justifyContent="center" direction="row">
                <Grid className="leftCol" xs={5}>
                    <h1 className="heading">SAP <br /> Van Sales <br /> &  <br /> Distribution  </h1>
                    <p className="para">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p className="para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                </Grid>
                <Grid className="rightCol"  xs={7}>
                    <Grid
                        className="rightColInner"
                        container
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                        direction="row">
                            <Grid item xs={10}>
                                <Grid container direction="column" xs={12} justifyContent="center" className="login-form">
                                <div   className="login-background">
                                    <Grid item style={{textAlign : 'left'}}>
                                        <Typography component="h1" variant="h5" style={{paddingBottom : 10, fontWeight : 600}}>
                                            Login 
                                        </Typography>
                                    </Grid>

                        <Grid item>
                        {errorMessage && (
                        <p className="error" style={{textAlign : 'center'}}> {errorMessage} </p>
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
                                                            {errors.email && <div style={{textAlign : 'left',paddingLeft : 5, paddingBottom : 10}}>Email is required.</div>}
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
                                                            {errors.password && <div  style={{textAlign : 'left',paddingLeft : 5,  paddingBottom : 10}}>Password is required.</div>}
                                                            <Grid item>
                                                                <Button
                                                                variant="contained"
                                                                color="#f00"
                                                                type="submit"
                                                                className="button-block"
                                                                style={{ backgroundColor : '#ff9f2e', color: '#fff' }}
                                                                >
                                                                Submit
                                                                </Button>
                                                            </Grid>
                                                    </Grid>
                                            </form>
                                        </Grid>
                                        <Grid item style={{paddingTop: 10}}>
                                            <Link href="#" variant="body2" style={{color : '#fff'}}>
                                            Forgot Password?
                                            </Link>
                                        </Grid>
                                    </div>
                                    </Grid>
                                </Grid>
                            
                        </Grid>
                </Grid>
            </Grid>
        </div>  
    </div>
   

  )
}
