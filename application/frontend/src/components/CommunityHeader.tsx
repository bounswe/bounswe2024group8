import "./CommunityHeader.css";
import follow from "../assets/follow.png";
import unfollow from "../assets/unfollow.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CommunityHeader = (props) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const Community = props.Community;
  const FollowerCount = props.FollowerCount;

  function handleOnFollow() {
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  }

  return (
    <div className="CommHeader">
      <div className="description">
        <img src={Community.image} className="CommImage" />
        <div className="info">
          <p className="CommName">{Community.name}</p>
          <p className="FollowerCount">{FollowerCount} Member</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
