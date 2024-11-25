import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Profile } from '../../interfaces'
import axios from 'axios'
import { Skeleton } from 'antd'
import { getProfileFromId } from "../../tsfunctions";


interface Props{
    profileId : number
}
const ProfileDisplayer = ({profileId}:  Props) => {
    const [profileInfo,setProfileInfo] = useState<Profile | null>(null); 
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        /* Request to be
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/annotations/get?postId=${profileId}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            setProfileInfo(res.data);
        }
        catch(e){

        } 
        */
        setProfileInfo(getProfileFromId(profileId));
    }
    if (!profileInfo){
        return(
            <Skeleton avatar/>
        )
    }
    return (
        <div className='flex gap-4'>
            <Avatar src={profileInfo.avatarUrl!}/>
            <p>{profileInfo.username}</p>
        </div>
    )
}

export default ProfileDisplayer