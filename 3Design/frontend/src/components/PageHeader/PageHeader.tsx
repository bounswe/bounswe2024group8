import { Logout, Person } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./PageHeader.module.css";
import { Avatar, Dialog } from '@mui/material';
import { CustomProfile } from '../interfaces';
import Search from 'antd/es/input/Search';
const PageHeader = () => {
    const [profileDialog, setProfileDialog] = useState(false);
    const [profileInfo, setProfileInfo] = useState<CustomProfile>({profilePhoto: "", tournamentPoints: "", username: ""});
    
    const imageRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        //Get profile info with an AJAX request.
        setProfileInfo({profilePhoto: "/logo192.png", tournamentPoints: "1500", username: "User62"})
    }, [])

    const logout=() => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        window.location.href = "/login";
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
                <div className='flex flex-col justify-center items-center py-5 gap-4' >
                    <button onClick={() => imageRef.current?.click()} className={styles.ppButton}>
                        <Avatar sx={{ width: 100, height: 100 }} src={profileInfo?.profilePhoto}/>
                    </button>
                    <input accept='.png,.jpg,.jpeg' type='file' style={{display: "none"}} ref={imageRef} onChange={(e) => {
                        //Send AJAX here.
                        if (!e.target.files || !e.target.files[0]){
                            return;
                        }
                        const newUrl = URL.createObjectURL(e.target.files[0]);
                        setProfileInfo((prev) =>{ return {...prev, profilePhoto: newUrl}});
                    }}/>
                    <p className={styles.usernameText}>{profileInfo.username}</p>
                    <p>Tournament Points: {profileInfo.tournamentPoints}</p>
                    <div className='flex justify-center gap-4 items-center'>
                        <button className='btn btn-primary text-white' onClick={() => setProfileDialog(false)}>Back to Gallery</button>
                        <button className='btn btn-warning text-white font-bold' >Change Password</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default PageHeader