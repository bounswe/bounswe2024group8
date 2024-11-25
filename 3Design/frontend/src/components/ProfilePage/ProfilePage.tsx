import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfileFromId, getProfilesList } from "../tsfunctions";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import PageHeader from "../PageHeader/PageHeader";
import styles from "./ProfilePage.module.css"
import { Profile } from '../interfaces'

const ProfilePage = () => {
  
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [profilesList, setProfilesList] = useState<Profile[]>([]); // Store the list of profiles


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

    // Fetch the list of profiles (you can replace this with actual API call or mock data)
    const fetchedProfiles = getProfilesList();
    setProfilesList(fetchedProfiles);
    
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

          {/* Profile page minor header */}
          <div>

            <img
              src={profile.avatarUrl || "/default_pp.png"}
              alt="Profile Avatar"
              className={styles.profileAvatar}
            />

            <h1 className="font-bold">{profile.username}</h1>

            <p>Exp Points: {profile.tournamentPoints}</p>

            {!isCurrentUserProfile && (
                <button
                  className={styles.profileFollowButton}
                  onClick={() => console.log("follow")}
                >
                  Follow +
                </button>
              )
            }

            <button
              className={styles.profileDialogButton}
              onClick={() => console.log("followed")}
            >
              Followed Users
            </button>
            <button
              className={styles.profileDialogButton}
              onClick={() => console.log("followers")}
            >
              Followers
            </button>
            
            {/* Dialog button section */}
            <div>
              <button
                className={styles.profileDialogButton}
                onClick={() => setIsDialogOpen(true)} // Open the dialog
              >
                Show More Options
              </button>
            </div>

            {/* Dialog section */}
            {isDialogOpen && (
                <div className={styles.scrollableList}>
                {profilesList.length > 0 ? (
                  profilesList.map((profile) => (
                    <div key={profile.id} className={styles.profileItem}>
                        <img
                          src={profile.avatarUrl || "/default_pp.png"}
                          alt={profile.username}
                          className={styles.profileAvatar}
                        />
                        <div>
                          <span>{profile.username}</span>
                          <div className={styles.tournamentPoints}>
                            Tournament Points: {profile.tournamentPoints}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No profiles available</p>
                  )}
                </div>
              
              )
            }

          </div>

          {/* Content section */}
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