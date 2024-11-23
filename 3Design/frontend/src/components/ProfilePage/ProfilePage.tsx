import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfileFromId } from "../tsfunctions";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import PageHeader from "../PageHeader/PageHeader";
import styles from "./ProfilePage.module.css"
import { Profile } from '../interfaces'

const ProfilePage = () => {
  
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>(false);

    const currentUserId = localStorage.getItem("user_id");


  useEffect(() => {
    const fetchedProfile = getProfileFromId(id); // Fetch profile based on `id`
    if (fetchedProfile) {
        setProfile(fetchedProfile);
    } else {
        setProfile(null); // Set to null if profile not found
    }
    // Check if the profile belongs to the current user
    if (id === currentUserId) {
        setIsCurrentUserProfile(true);
    } else {
        setIsCurrentUserProfile(false);
    }
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
  

  return (
  <>
          <PageHeader/>
          <div className='flex'>
              <SideBar active={""}/>
              <div className={styles.mainContainer}>
                <img
                  src={profile.avatarUrl || "/default_pp.png"}
                  alt="Profile Avatar"
                  className={styles.profileAvatar}
                />
                <h1>{profile.username}</h1>
                <p>Tournament Points: {profile.tournamentPoints}</p>
                {/* Check if this is the current user's profile */}
                {isCurrentUserProfile && <p>This is your profile!</p>}

              </div> 
          </div>
  </>);
}

export default ProfilePage;