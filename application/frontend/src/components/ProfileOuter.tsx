import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  loggedInProfileInfo,
  setLoggedInProfileInfo,
} from "../storage/storage";
import Profile from "./Profile.tsx";
import { PostData } from "../interfaces/postInterface.ts";
import Feed from "./Feed.tsx";
import { MdMargin } from "react-icons/md";

interface ProfileOuterProps {
  userId: string | null;
}

const ProfileOuter: React.FC<ProfileOuterProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [postsData, setPostsData] = useState<PostData[]>([]);

  const convertBackendDataToPostData = (backendData: any[]): PostData[] => {
    return backendData.map((post) => ({
      id: post.postId,
      profilePic: post.user.profilePicture
        ? `data:image/png;base64,${post.user.profilePicture}`
        : post.user.profilePicture,
      username: post.username,
      firstName: post.user.firstName,
      lastName: post.user.lastName,
      community: post.postedAt,
      communityLink: post.communityLink,
      title: post.title,
      text: post.text,
      imageUrl: post.image ? `data:image/png;base64,${post.image}` : post.image,
      likes: post.likes,
      dislikes: post.dislikes,
      reactionType: post.reactionType,
      bookmark: post.bookmark,
      commentsCount: post.commentsCount,
    }));
  };

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

  useEffect(() => {
    if (userId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/v1/posts/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          const postDataArray = convertBackendDataToPostData(response.data);
          setPostsData(postDataArray);
        })
        .catch((error) => {
          console.log("No post yet", error);
        });
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>No user ID found.</div>;
  }
  const customFeedStyle = {
    margin: "0",
    padding: "0",
    width: "100%",
  };

  return (
    <div className="outerProfile">
      <Profile {...loggedInProfileInfo} />
      <Feed posts={postsData} style={customFeedStyle} />
    </div>
  );
};

export default ProfileOuter;
