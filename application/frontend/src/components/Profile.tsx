import React from "react";
import { ProfileProps } from "../interfaces/postInterface";
import "./Profile.css";
import defaultPp from "../assets/defaultpp.png";

const Profile: React.FC<ProfileProps> = ({
  email,
  firstName,
  lastName,
  community,
  profilePicture,
  accountNonExpired,
  accountNonLocked,
  credentialsNonExpired,
}) => {
  return (
    <div className="profile">
      <img
        src={
          profilePicture ? `data:image/png;base64,${profilePicture}` : defaultPp
        }
        alt={`${firstName} ${lastName}`}
      />
      <div className="profileDetails">
        <h2>{`${firstName} ${lastName}`}</h2>
        <div className="community">
          <h3>Team supported: {community.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
