import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfileFromId, getProfilesList } from "../tsfunctions";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import PageHeader from "../PageHeader/PageHeader";
import styles from "./ProfilePage.module.css"
import { Profile } from '../interfaces'
import { Dialog } from "@mui/material";
import ProfileDisplayer from "./ProfilePageDialogDisplayer/ProfilePageDialogDisplayer";

const ProfilePage = () => {
  
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [followerProfilesList, setFollowerProfilesList] = useState<number[]>([]); // Store the list of profiles
  const [followingProfilesList, setFollowingProfilesList] = useState<number[]>([]); // Store the list of profiles


  const currentUserId = localStorage.getItem("user_id");
  

  const getProfileInfo = async () => {
    /* Request TODO
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

  setProfile({"id": 5,
    "username": "turkerdm5",
    "avatarUrl": "/default_pp.png",
    "tournamentPoints": 5555});
  };


  const getFollowerUserIds = async () => {
    /* Request TODO
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

  setFollowerProfilesList([1,2,3,4]);
  };

  const getFollowingUserIds = async () => {
            /* Request TODO
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

        setFollowingProfilesList([1,2,3]);
  };


  useEffect(() => {
    getFollowerUserIds();
    getFollowingUserIds();


    // Check if the profile belongs to the current user
    if (id === currentUserId) {
        setIsCurrentUserProfile(true);
    } else {
        setIsCurrentUserProfile(false);
    }

    // Fetch the list of profiles (you can replace this with actual API call or mock data)
    
  }, [id]); // Re-run effect if `id` changes

  if (!id){
      return <div>404</div>;
  }
  if(!profile){
    return (
      <>
        <PageHeader/>
        <div className='flex'>
          <SideBar active={""}/>
          <div className={styles.mainContainer}>
            not a valid user
          </div> 
        </div>
      </>);
  }
  
  const defaultTabs = [
    <div>Content for Public Tab 1</div>,
    <div>Content for Public Tab 2</div>,
  ];

  const currentUserTabs = [
    <div>Content for Current User Tab 1</div>,
    <div>Content for Current User Tab 2</div>,
    <div>Content for Current User Tab 3</div>,
  ];

  const tabContents = isCurrentUserProfile ? currentUserTabs : defaultTabs;

  
  return (
    <>
      <PageHeader/>
      <div className='flex'>
        <SideBar active={""}/>
        <div className={styles.mainContainer}>

          {/* Profile Header Container*/}
          <div className={styles.profileHeaderContainer}>

            {/* Profile Header Details Container */}
            <div className={styles.profileHeaderDetailsContainer}>
              
              {/* Profile Header Details Avatar */}
              <img
                src={profile.avatarUrl || "/default_pp.png"}
                alt="Profile Avatar"
                className={styles.profileHeaderDetailsAvatar}
              />

              {/* Profile Header Details Nickname */}
              <h1 className="font-bold">{profile.username}</h1>

              {/* Profile Header Details Exp Points */}
              <p className="font-bold">Exp Points: {profile.tournamentPoints}</p>

            </div>

            {/* Profile Header Buttons Container */}
            <div className={styles.profileHeaderButtonsContainer}>

              {/* Profile Header Buttons Follow */}
              {!isCurrentUserProfile && (
                  <button
                    className={styles.profileHeaderButtonsFollowButton}
                    onClick={() => console.log("follow")}
                  >
                    Follow +
                  </button>
                )
              }

              {/* Profile Header Buttons Following */}
              <button
                className={styles.profileHeaderButtonsFollowingButton}
                onClick={() => console.log("following")}
              >
                Following
              </button>

              {/* Profile Header Buttons Followers */}
              <button
                className={styles.profileHeaderButtonsFollowersButton}
                onClick={() => setIsDialogOpen(true)} // Open the dialog
              >
                Followers
              </button>
            </div>
            
            {/* Dialog section TODO */}
            <Dialog open={isDialogOpen}>
              <div className={styles.scrollableList}>
                {followerProfilesList.length > 0 ? (
                  followerProfilesList.map((profile) => (
                    <ProfileDisplayer profileId={profile}></ProfileDisplayer>
                    ))
                  ) : (
                    <p>No profiles available</p>
                  )}
                </div>
            </Dialog>

          </div>

          {/* Profile Content Container */}
          <div className={styles.profileContentContainer}>

            {/* Profile Content Container */}


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
                  Tab {index + 1}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px' }}>
              {tabContents[activeTab]}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfilePage;