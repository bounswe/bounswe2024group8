import { Logout, Person } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./PageHeader.module.css";
import { Avatar, CircularProgress, Dialog, TextField } from '@mui/material';
import { CustomUser } from '../interfaces';
import Search from 'antd/es/input/Search';
import { message } from 'antd';
import axios from 'axios';
const PageHeader = () => {

    const [profileInfo, setProfileInfo] = useState<CustomUser | null>(null);


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
                <button onClick={() => window.location.href = `/profile/${profileInfo?.id}`} className='btn btn-ghost'>
                    <Person sx={{color: "white"}}/>
                    <p className='font-bold text-white'>Profile</p>
                </button>
                <button onClick={logout} className='btn btn-ghost'>
                    <Logout sx={{color:"white"}}/>
                </button>
            </div>
        </div>
    )
}

export default PageHeader