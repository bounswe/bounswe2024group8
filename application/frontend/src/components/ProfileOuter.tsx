import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  loggedInProfileInfo,
  setLoggedInProfileInfo,
} from "../storage/storage";
import Profile from "./Profile.tsx";

interface ProfileOuterProps {
  userId: string | null;
}

const ProfileOuter: React.FC<ProfileOuterProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.error("No user ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const profileData = response.data;

        // Update the loggedInProfileInfo object
        setLoggedInProfileInfo({
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          community: {
            id: profileData.community.id,
            name: profileData.community.name,
            description: profileData.community.description,
            team: profileData.community.team,
            fanaticCount: profileData.community.fanaticCount,
          },
          profilePicture: profileData.profilePicture,
          accountNonExpired: profileData.accountNonExpired,
          accountNonLocked: profileData.accountNonLocked,
          credentialsNonExpired: profileData.credentialsNonExpired,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>No user ID found.</div>;
  }

  return (
    <div className="outerProfile">
      <Profile {...loggedInProfileInfo} />
      <h1>POSTS</h1>
    </div>
  );
};

export default ProfileOuter;
