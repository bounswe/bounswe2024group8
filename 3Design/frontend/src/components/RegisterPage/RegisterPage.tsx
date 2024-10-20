import React, {useState} from 'react'
import styles from "./RegisterPage.module.css"
import { CircularProgress, TextField } from '@mui/material'
const RegisterPage = () => {
    const [email,setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password,setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [registerLoading, setRegisterLoading] = useState(false);


    const validatePassword = () => {
        if (!password){
            return "This field is required.";
        }
        if (password.length < 6){
            return "The password has to be at least 6 characters.";
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

    const validateUsername = () => {
        if (!username){
            return "This field is required.";
        }
        if (username.length < 5){
            return "The username has to be at least 5 characters.";
        }
        return "";
    }

    const registerRequest = async () => {
        let errors = false;
        const emailValidation = validateEmail();
        const passwordValidation = validatePassword();
        const usernameValidation = validateUsername();
        setEmailError(emailValidation);
        setPasswordError(passwordValidation);
        setUsernameError(usernameValidation);
        if (!!emailValidation || !!passwordValidation || !!usernameValidation){
            return;
        }
        setRegisterLoading(true);
        try{
            //AJAX POST Request
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000)
        }
        catch(e){
            setRegisterLoading(false);                

        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.registerCard}>
                <h2 className='font-extrabold'>Register</h2>
                <TextField label="Username" error={!!usernameError} helperText={usernameError} value={username} onChange={(e) => {
                    if (e.target.value.length > 128){
                        return;
                    }
                    setUsernameError("");
                    setUsername(e.target.value);
                }}/>
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
                    <button disabled={registerLoading} onClick={registerRequest} className='btn btn-outline w-2/3'>Register</button>
                    {registerLoading && <CircularProgress/>}
                </div>
                <a href='/login' className='text-center font-semibold'><u>Login</u></a>
            </div>
        </div>
    )
}

export default RegisterPage