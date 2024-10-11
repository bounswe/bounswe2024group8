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
        if (password.length < 3){
            return "The password has to be at least 3 characters.";
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
                setRegisterLoading(false);                
                window.location.href = "/login";
            }, 2000)
        }
        catch(e){

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
                    setUsername(e.target.value);
                }}/>
                <TextField label="Email" value={email} error={!!emailError} helperText={emailError} onChange={(e) => {
                    if (e.target.value.length > 128){
                        return;
                    }
                    setEmail(e.target.value);
                }}/>
                <TextField type='password' label="Password" error={!!passwordError} helperText={passwordError} value={password} onChange={(e) => {
                    if (e.target.value.length > 128){
                        return;
                    }
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