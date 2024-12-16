import { Avatar } from '@mui/material';
import { Button, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import styles from "./UserDisplayer.module.css"
interface UserResponse{
    userId : number;
    email : string;
    nickName : string;
    profilePictureUrl : string;
    experience : number;
    isFollowed : boolean;
}

interface Props{
    data: UserResponse
}

const UserDisplayer = ({data}: Props) => {
    const [stateData, setStateData] = useState<UserResponse>(data);
    const [followRequesting, setFollowRequesting] = useState(false);

    const handleFollowLogic = async (e:any,type:boolean) => {
        e.stopPropagation();
        setFollowRequesting(true);
        if (type){
            try{
                await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/follow`,
                    null,
                    {
                        headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`},
                        params: {followedUserId: stateData.userId}
                    }
                );
                setStateData(prev => ({...prev, isFollowed: true}));
            }
            catch(e){
                message.error("Couldn't follow user.");
                setStateData(prev => ({...prev, isFollowed: false}));
            } 
            finally{
                setFollowRequesting(false);
                return;
            }
        }
        try{
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/users/unfollow`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`},
                    params: {followedUserId: stateData.userId}
                }
            );
            setStateData(prev => ({...prev, isFollowed: false}));
        }
        catch(e){
            message.error("Couldn't unfollow user.");
            setStateData(prev => ({...prev, isFollowed: true}));
        } 
        finally{
            setFollowRequesting(false);
            return;
        }
    }

    return (
        <div onClick={() => window.location.href = `/profile/${stateData.userId}`} className={`clickable-post ${styles.userCard}`}>
            <div className='flex gap-4 items-center'>
                <Avatar src={stateData.profilePictureUrl}/>
                <p>{stateData.nickName}</p>
            </div>
            <div className='mr-0 ml-auto items-center'>
            
            {
            stateData.userId != parseInt(localStorage.getItem("user_id") ?? "-1") &&     
            (stateData.isFollowed ? 
                <Button disabled={followRequesting} onClick={(e) => handleFollowLogic(e,false)} className='mr-0 ml-auto'>Unfollow</Button> :
                <Button disabled={followRequesting} type='primary' onClick={(e) => handleFollowLogic(e,true)} className='mr-0 ml-auto'>Follow</Button> 
            )
            }
            </div>
        </div>
    )
}

export default UserDisplayer