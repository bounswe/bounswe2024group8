import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CustomUser } from '../../interfaces'
import axios from 'axios'
import { Skeleton } from 'antd'
import styles from "./ProfilePageDialogDisplayer.module.css"

interface Props{
    profileId : number
}
const ProfileDisplayer = ({profileId}:  Props) => {
    const [profileInfo,setProfileInfo] = useState<CustomUser | null>(null); 
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/${profileId}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            setProfileInfo(res.data);
        }
        catch(e){

        } 
    }
    if (!profileInfo){
        return(
            <div className='flex gap-6'>
                <Skeleton.Avatar active/>
                <Skeleton.Input active/>
            </div>
        )
    }
    return (
        <div onClick={() => window.location.href = `/profile/${profileId}`} className={styles.profileContainer}>
            <Avatar src={profileInfo.profilePictureUrl ?? "/default_pp"}/>
            <p>{profileInfo.nickName}</p>
        </div>
    )
}

export default ProfileDisplayer