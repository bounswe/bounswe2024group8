import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import PageHeader from "../PageHeader/PageHeader";
import styles from "./ProfilePage.module.css"
import { Achievement, CustomUser, DPost } from '../interfaces'
import { CircularProgress, Dialog, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField } from "@mui/material";
import ProfileDisplayer from "./ProfilePageDialogDisplayer/ProfilePageDialogDisplayer"
import axios, { AxiosError } from "axios";
import { Avatar, Badge, message, Pagination, Skeleton, Space } from "antd";
import GalleryPost from "../GalleryPost/Clickable/GalleryPost";
import DiscussionPost from "../DiscussionPost/Clickable/DiscussionPost";
import StarsIcon from '@mui/icons-material/Stars';
import { AddAPhoto, Edit } from "@mui/icons-material";

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

  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [achievementDialog, setAchievementDialog] = useState(false);

  const currentUserId = localStorage.getItem("user_id");

  const [activePage, setActivePage] = useState(1);
  const pageSize = 3;

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [changePasswordConfig, setChangePasswordConfig] = useState({dialog: false, newPassword: "", sending:false});

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

  const fetchAchievements = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/achievements/user/${id}`,
          {
              headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`},
          }
        );
        setAchievements(res.data);
    }
    catch(e){

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
    setProfileLoading(true);
    setProfile(null);
    try{
        const fd = new FormData();
        fd.append("file", e.target.files[0]);
        await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/profile-picture/upload`,
            fd,
            {
            headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
        });
        message.success("Profile photo successfully changed.");
        await getProfileInfo();
    }
    catch(e){
        message.error("Unable to change the profile photo.");
        await getProfileInfo();
    }

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

  const changePassword = async () => {
    const passwordValid = validatePassword();
    if (!!passwordValid){
        message.error(passwordValid);
        return;
    }
    try{
        setChangePasswordConfig(prev => ({...prev, sending: true}));
        await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/users/${localStorage.getItem("user_id")}/change-password`,
        null,
        {headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`},
            params: {password : changePasswordConfig.newPassword}
        }
        );
        
        message.success("Password successfully changed.");
        setChangePasswordConfig({dialog: false, newPassword: "", sending: false});
    }catch(e){
        message.error("Something went wrong.");
        setChangePasswordConfig(prev => ({...prev, sending: false}));
    }
  }


  useEffect(() => {
    getFollowerUserIds();
    getFollowingUserIds();
    getProfileInfo();
    fetchAchievements();

    if (id === currentUserId) {
        setIsCurrentUserProfile(true);
    } else {
        setIsCurrentUserProfile(false);
    }
    
  }, [id]); 

  useEffect(()=> {
    fetchPosts(); 
  }, [activeTab])

  const changePage = (x: number) => {
    setActivePage(x);
  }


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
              {isCurrentUserProfile ?
                <div className="ml-5">
                   <button onClick={() => imageRef.current?.click()} className={styles.ppButton}>
                    <Avatar style={{width:"100px", height: "100px", position: "relative"}} src={profile.profilePictureUrl || "/default_pp.png"} shape="circle" />
                   </button>
                  <AddAPhoto fontSize="small" sx={{position: "relative", bottom: "35px", right:"28px"}}/>
                  <input accept='.png,.jpg,.jpeg' type='file' style={{display: "none"}} ref={imageRef} onChange={changeProfilePicture}/>
                  
                </div>
              :
              <img
                src={profile.profilePictureUrl || "/default_pp.png"}
                alt="Profile Avatar"
                className={styles.profileHeaderDetailsAvatar}
              />
              } 

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
              
              {isCurrentUserProfile &&

                <button
                className={styles.profileHeaderButtonsFollowersButton}
                onClick={() => setChangePasswordConfig(prev => ({...prev, dialog: true}))} 
                >
                Change Password
                </button>             
              }
              
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
                  onClick={() => {setActivePage(1);setActiveTab(index)}}
                >
                  {content}
                </button>
              ))}
              <button className="btn btn-ghost mr-0 ml-auto" onClick={() => setAchievementDialog(true)}>
                <StarsIcon/>
              </button>
              
            </div>

            {/* Tab Content */}
            <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px' }}>
              {displayedPosts == null ? 
               <Skeleton active avatar paragraph={{ rows: 4 }} /> :
                (displayedPosts.length == 0 ?
                <p>There are currently no posts here.</p> :
                <div className={styles.postContainer}>
                    {displayedPosts.slice((activePage-1)*pageSize, activePage*pageSize).map((item) => (
                    item.isVisualPost ?
                    <GalleryPost key={item.postId} postData={item}/> :
                    <DiscussionPost key={item.postId} postData={item}/>
                    ))}
                    <Pagination align="center" current={activePage} pageSize={pageSize} total={displayedPosts.length} onChange={changePage}/>
                </div>)
                
                }
            </div>
          </div>

        </div>
      </div>
      <Dialog fullWidth maxWidth="md" open={achievementDialog} onClose={() => setAchievementDialog(false)}>
           <div className="p-4 flex flex-col gap-4">
             <p className="font-bold text-large">Achievements</p>
             {achievements ? 
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Rewards</TableCell>
                      <TableCell align="left">Earned At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {achievements.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="left">{row.point}</TableCell>
                        <TableCell align="left">{ new Intl.DateTimeFormat('en-GB').format(new Date(row.earnedAt))}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
               :
            <p>No achievements earned.</p>            
            }
           </div>     
      </Dialog>
      <Dialog  maxWidth="sm" fullWidth open={changePasswordConfig.dialog} onClose={() => setChangePasswordConfig(prev => ({...prev, dialog: false})) }>
        <div className='flex flex-col gap-4 p-4'>
            <div className='flex flex-col gap-4 justify-center'>
                <p className='font-bold text-lg'>Change Your Password</p>
                <TextField
                label="Your New Password"
                type='password'
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
    </>
  );
}

export default ProfilePage;