import React, { useState } from 'react'
import styles from "./LoginPage.module.css";
import { CircularProgress, TextField } from '@mui/material';
import { message } from 'antd';
const Login = () => {
    const [email,setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password,setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loginLoading, setLoginLoading] = useState(false);

    const [alert, alertContext] = message.useMessage();

    const validatePassword = () => {
        if (!password){
            return "This field is required.";
        }
        if (password.length < 6){
            return "The password has to be at least 3 characters.";
        }
        if (!(/[A-Z]/.test(password)) || !(/[a-z]/.test(password)) || !(/\d/.test(password))){
            return "The password has to have at least 1 uppercase, 1 lowercase and 1 number.";
        }
        return "";
    }

    const validateEmail = () => {
        if (!email){
            return "This field is required.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return "Incorrect email format.";
        }
        return "";
    }

    const loginRequest = async () => {
        const emailValidation = validateEmail();
        const passwordValidation = validatePassword();
        setEmailError(emailValidation);
        setPasswordError(passwordValidation);
        if (!!emailValidation || !!passwordValidation){
            return;
        }
        setLoginLoading(true);
        try{
            //AJAX POST Request
            setTimeout(() => {
            
                window.location.href = "home";
            }, 2000)
        }
        catch(e){
            alert.open({
                type: "error",
                content: "Username or password wrong."
            });
        }
        finally{
            setLoginLoading(false);
        }
    }
    return (
        <div className={styles.mainContainer}>
            {alertContext}
            <div className={styles.loginCard}>
                <h2 className='font-extrabold'>Login</h2>
                <TextField label="Email" value={email} error={!!emailError} helperText={emailError} onChange={(e) => {
                    if (e.target.value.length > 128){
                        return;
                    }
                    setEmailError("");
                    setEmail(e.target.value);
                }}/>
                <TextField type='password' label="Password" error={!!passwordError} helperText={passwordError} value={password} onChange={(e) => {
                    if (e.target.value.length > 128){
                        return;
                    }
                    setPasswordError("");
                    setPassword(e.target.value);
                }}/>
                <div className='flex gap-4 justify-center items-center'>
                    <button disabled={loginLoading} onClick={loginRequest} className='btn btn-outline w-2/3'>Login</button>
                    {loginLoading && <CircularProgress/>}
                </div>
                <a href='/register' className='text-center font-semibold'><u>Create a new account.</u></a>
            </div>
        </div>
    )
}

export default Login