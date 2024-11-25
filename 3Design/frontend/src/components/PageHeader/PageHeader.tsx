import { Logout, Person } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./PageHeader.module.css";
import { Avatar, CircularProgress, Dialog, TextField } from '@mui/material';
import { CustomUser } from '../interfaces';
import Search from 'antd/es/input/Search';
import { message } from 'antd';
import axios from 'axios';
const PageHeader = () => {
    const [profileDialog, setProfileDialog] = useState(false);
    const [profileInfo, setProfileInfo] = useState<CustomUser | null>(null);
    const [changePasswordConfig, setChangePasswordConfig] = useState({dialog: false, newPassword: "", sending:false})
    
    const imageRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        fetchProfileInfo();
        //Get profile info with an AJAX request.
    }, [])

    const logout=() => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        window.location.href = "/login";
    }

    const validatePassword = () => {
        if (!changePasswordConfig.newPassword){
            return "New password is required.";
        }
        if (changePasswordConfig.newPassword.length < 6){
            return "The password has to be at least 6 characters.";
        }
        if (!(/[A-Z]/.test(changePasswordConfig.newPassword)) || !(/[a-z]/.test(changePasswordConfig.newPassword)) || !(/\d/.test(changePasswordConfig.newPassword))){
            return "The password has to have at least 1 uppercase, 1 lowercase and 1 number.";
        }
        return "";
    }

    const fetchProfileInfo = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/${localStorage.getItem("user_id")}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
            });
            setProfileInfo(res.data);
        }catch(e){
            message.error("Couldn't fetch user information. The site might not work as intended.")
        }
    }

    const changeProfilePicture = async (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]){
            return;
        }
        const fileExtension = e.target.files[0].name.split(".").pop();
        if (fileExtension != "png" && fileExtension != "jpg" && fileExtension != "jpeg"){
            e.target.files = null;
            message.error("Only png, jpg and jpeg extensions are allowed.");
            return;
        }
        setProfileInfo(null);
        try{
            const fd = new FormData();
            fd.append("file", e.target.files[0]);
            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/profile-picture/upload`,
                fd,
                {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
            });
            message.success("Profile photo successfully changed.");
            await fetchProfileInfo();
        }
        catch(e){
            message.error("Unable to change the profile photo.");
            await fetchProfileInfo();
        }

    }

    const changePassword = async () => {
        const passwordValid = validatePassword();
        if (!!passwordValid){
            message.error(passwordValid);
            return;
        }
        try{
            setChangePasswordConfig(prev => ({...prev, sending: true}));
            await axios.put(`${process.env.REACT_APP_API_URL}/${localStorage.getItem("user_id")}/change-password`,
            null,
            {headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`},
                params: {password : changePasswordConfig.newPassword}
            }
            );
            
            message.success("Password successfully changed.");
            setChangePasswordConfig({dialog: false, newPassword: "", sending: false});
        }catch(e){
            message.error("Something went wrong.")
        }
    }
    
    return (
        <div className={styles.headerContainer}>
            <div className="w-1/6">
                <button onClick={() => window.location.href = "/home"} className='btn btn-ghost text-white font-extrabold'>3Design</button>
            </div>
            <div className='w-4/6 flex justify-center items-center'>
                <Search 
                size='large'
                style={{width: "80%"}}
                placeholder='Search...'
                onSearch={(val) => {
                     if (!val){
                        return;
                     }
                     window.location.href = `/search/${val}`
                    }
                }
                />
                
            </div>
            <div className='ml-auto mr-0 w-1/6 flex justify-end gap-2'>
                <button onClick={() => setProfileDialog(true)} className='btn btn-ghost'>
                    <Person sx={{color: "white"}}/>
                    <p className='font-bold text-white'>Profile</p>
                </button>
                <button onClick={logout} className='btn btn-ghost'>
                    <Logout sx={{color:"white"}}/>
                </button>
            </div>
            <Dialog maxWidth="sm" fullWidth open={profileDialog} onClose={() => setProfileDialog(false)}>
                {profileInfo ? 
                <div className='flex flex-col justify-center items-center py-5 gap-4' >
                    <button onClick={() => imageRef.current?.click()} className={styles.ppButton}>
                        <Avatar sx={{ width: 100, height: 100 }} src={profileInfo.profilePictureUrl ?? "/default_pp.png"}/>
                    </button>
                    <input accept='.png,.jpg,.jpeg' type='file' style={{display: "none"}} ref={imageRef} onChange={changeProfilePicture}/>
                    <button onClick={() => window.location.href = `/profile/${localStorage.getItem("user_id")}`} className={`btn btn-link ${styles.usernameText}`}>{profileInfo.nickName}</button>
                    <p>User Experience Points: {profileInfo.experience}</p>
                    <div className='flex justify-center gap-4 items-center'>
                        <button className='btn btn-primary text-white' onClick={() => setProfileDialog(false)}>Back to Gallery</button>
                        <button className='btn btn-warning text-white font-bold' onClick={() => setChangePasswordConfig(prev => ({...prev, dialog: true})) } >Change Password</button>
                    </div>
                </div>
                :
                <div className='flex items-center justify-center py-5 h-60'>
                    <CircularProgress/>
                </div>
                }
            </Dialog>
            <Dialog  maxWidth="sm" fullWidth open={changePasswordConfig.dialog} onClose={() => setChangePasswordConfig(prev => ({...prev, dialog: false})) }>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-col gap-4 justify-center'>
                        <p className='font-bold text-lg'>Change Your Password</p>
                        <TextField
                        label="Your New Password"
                        value={changePasswordConfig.newPassword}
                        onChange={(e) => setChangePasswordConfig(prev => ({...prev, newPassword: e.target.value}))}
                        />
                    </div>

                    <div className='flex gap-4 justify-end'>
                        <button onClick={() => setChangePasswordConfig(prev => ({...prev, dialog: false}))} className='btn btn-error'>Cancel</button>
                        <button onClick={changePassword} disabled={changePasswordConfig.sending} className='btn btn-outline'>Confirm</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default PageHeader