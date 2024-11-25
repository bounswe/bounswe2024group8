import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import PageHeader from "../PageHeader/PageHeader";
import styles from "./ProfilePage.module.css"
import { CustomUser, DPost } from '../interfaces'
import { CircularProgress, Dialog } from "@mui/material";
import ProfileDisplayer from "./ProfilePageDialogDisplayer/ProfilePageDialogDisplayer"
import axios, { AxiosError } from "axios";
import { message, Skeleton } from "antd";
import GalleryPost from "../GalleryPost/Clickable/GalleryPost";
import DiscussionPost from "../DiscussionPost/Clickable/DiscussionPost";

const ProfilePage = () => {
  
  const { id } = useParams();
  const [profile, setProfile] = useState<CustomUser | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);

  const [followingDialog, setFollowingDialog] = useState(false);
  const [followersDialog, setFollowersDialog] = useState(false);

  const [followerProfilesList, setFollowerProfilesList] = useState<number[]>([]); // Store the list of profiles
  const [followingProfilesList, setFollowingProfilesList] = useState<number[]>([]); // Store the list of profiles
  
  const [displayedPosts, setDisplayedPosts] = useState<DPost[] |null>(null);
  
  const [currentlyFollowing, setCurrentlyFollowing] = useState<boolean | null>(null);

  const currentUserId = localStorage.getItem("user_id");

  const fetchPosts = async () => {
    setDisplayedPosts(null);
    if (activeTab == 0){
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/user/${id}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            setDisplayedPosts(res.data);
        }
        catch(e){
            setDisplayedPosts([]);
        } 
    }
    else if(activeTab == 1){
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/user/${id}/reacted`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            setDisplayedPosts(res.data);
        }
        catch(e){
            setDisplayedPosts([]);
        } 
    }
    else{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/user/${id}/bookmarked`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            setDisplayedPosts(res.data);
        }
        catch(e){
            setDisplayedPosts([]);
        } 
    }
    
  }
  

  const getProfileInfo = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
            }
        );
        setProfile(res.data);
    }
    catch(e){

    } 
    finally{
        setProfileLoading(false);
    }
  }


  const getFollowerUserIds = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/followers/${id}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
            }
        );
        const idList : number[] = res.data;
        setFollowerProfilesList(idList);
        let checked = false;
        for (let cid of idList){
            if (cid == parseInt(currentUserId ?? "-1")){
                setCurrentlyFollowing(true);
                return;
            }
        }
        setCurrentlyFollowing(false);
        
    }
    catch(e){
        if (e instanceof AxiosError && e.status == 404){
            setCurrentlyFollowing(false);
        }
    } 

  };

  const getFollowingUserIds = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/following/${id}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            setFollowingProfilesList(res.data);
        }
        catch(e){

        } 

  };

  

  const handleFollowLogic = async(x:boolean) => {
    setCurrentlyFollowing(null);
    if (x){
        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/follow`,
                null,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`},
                    params: {followedUserId: id}
                }
            );
            setCurrentlyFollowing(true);
        }
        catch(e){
            message.error("Couldn't follow user.");
            setCurrentlyFollowing(false);
        } 
        finally{
            getFollowerUserIds();
            getFollowingUserIds();
            return;
        }
    }
    try{
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/users/unfollow`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`},
                params: {followedUserId: id}
            }
        );
        setCurrentlyFollowing(false);
    }
    catch(e){
        message.error("Couldn't unfollow user.");
        setCurrentlyFollowing(true);
    } 
    finally{
        getFollowerUserIds();
        getFollowingUserIds();
        return;
    }
  }


  useEffect(() => {
    getFollowerUserIds();
    getFollowingUserIds();
    getProfileInfo();

    if (id === currentUserId) {
        setIsCurrentUserProfile(true);
    } else {
        setIsCurrentUserProfile(false);
    }
    
  }, [id]); 

  useEffect(()=> {
    fetchPosts(); 
  }, [activeTab])


  if (id == undefined || id == null){
    window.location.href = "/home";
    return  null;
  }
  
  if(!/^\d+$/.test(id)){
    window.location.href = "/home";
    return  null;
  }



  if(!profile){
    return (
      <>
        <PageHeader/>
        <div className='flex'>
          <SideBar active={""}/>
          {profileLoading ? 
            <div className="flex justify-center items-center h-lvh w-full">
                <CircularProgress/>
            </div>
          :
            <div className={styles.mainContainer}>

            not a valid user
            </div>       
          }
          
          
        </div>
      </>);
  }
  
  const defaultTabs = [
    "Published Posts",
    "Reacted Posts"
  ];

  const currentUserTabs = [
    "Published Posts",
    "Reacted Posts",
    "Bookmarked Posts"
  ];

  const tabContents = isCurrentUserProfile ? currentUserTabs : defaultTabs;

  

  return (
    <>
      <PageHeader/>
      <div className='flex'>
        <SideBar active={""}/>
        <div className={styles.mainContainer}>

          {/* Profile Header Container*/}
          <div >

            {/* Profile Header Details Container */}
            <div className="flex flex-col items-center">
              
              {/* Profile Header Details Avatar */}
              <img
                src={profile.profilePictureUrl || "/default_pp.png"}
                alt="Profile Avatar"
                className={styles.profileHeaderDetailsAvatar}
              />

              {/* Profile Header Details Nickname */}
              <h1 className="font-bold">{profile.nickName}</h1>

              {/* Profile Header Details Exp Points */}
              <p className="font-bold">Exp Points: {profile.experience}</p>

            </div>

            {/* Profile Header Buttons Container */}
            <div className="flex gap-4 justify-center">

              {/* Profile Header Buttons Follow */}
              {!isCurrentUserProfile && (
                  <button
                    className={styles.profileHeaderButtonsFollowingButton}
                    onClick={currentlyFollowing ? () => handleFollowLogic(false) : () => handleFollowLogic(true)}
                    disabled={currentlyFollowing == null}
                  >
                    {currentlyFollowing == null ? 
                    <CircularProgress/> :
                    (currentlyFollowing ?
                    <p>Unfollow</p> :
                    <p>Follow</p>)
                    }
                  </button>
                )
              }

              {/* Profile Header Buttons Following */}
              <button
                className={styles.profileHeaderButtonsFollowingButton}
                onClick={() => setFollowingDialog(true)}
              >
                Following
              </button>

              {/* Profile Header Buttons Followers */}
              <button
                className={styles.profileHeaderButtonsFollowersButton}
                onClick={() => setFollowersDialog(true)} // Open the dialog
              >
                Followers
              </button>
            </div>
            
            {/* Dialog section TODO */}
            <Dialog fullWidth maxWidth="sm" onClose={() => setFollowersDialog(false)} open={followersDialog}>
              <div className={styles.scrollableList}>
                <p className="font-bold text-lg">Followers</p>
                {followerProfilesList.length > 0 ? (
                  followerProfilesList.map((profile) => (
                    <ProfileDisplayer profileId={profile}></ProfileDisplayer>
                    ))
                  ) : (
                    <p>No profiles available</p>
                  )}
                </div>
            </Dialog>

            <Dialog fullWidth maxWidth="sm" onClose={() => setFollowingDialog(false)} open={followingDialog}>
              <div className={styles.scrollableList}>
                <p className="font-bold text-lg">Following</p>
                {followingProfilesList.length > 0 ? (
                  followingProfilesList.map((profile) => (
                    <ProfileDisplayer profileId={profile}></ProfileDisplayer>
                    ))
                  ) : (
                    <p>No profiles available</p>
                  )}
                </div>
            </Dialog>

          </div>
          {/* Tab Buttons */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {tabContents.map((content, index) => (
                <button
                  key={index}
                  style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    backgroundColor: activeTab === index ? '#007BFF' : '#f0f0f0',
                    border: 'none',
                    color: activeTab === index ? 'white' : 'black',
                    borderRadius: '5px',
                  }}
                  onClick={() => setActiveTab(index)}
                >
                  {content}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px' }}>
              {displayedPosts == null ? 
               <Skeleton active avatar paragraph={{ rows: 4 }} /> :
                (displayedPosts.length == 0 ?
                <p>There are currently no posts here.</p> :
                <div className={styles.postContainer}>
                    {displayedPosts.map((item) => (
                    item.isVisualPost ?
                    <GalleryPost key={item.postId} postData={item}/> :
                    <DiscussionPost key={item.postId} postData={item}/>
                    ))}
                </div>)
                
                }
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfilePage;