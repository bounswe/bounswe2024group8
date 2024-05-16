import "./CommunityHeader.css";
import follow from "../assets/follow.png";
import unfollow from "../assets/unfollow.png";
import { useNavigate} from "react-router-dom";
import { useState } from "react";

const CommunityHeader = (props) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const Community = props.Community;
    const FollowerCount = props.FollowerCount;

    function handleOnFollow() {
        if (isFollowing){
            setIsFollowing(false);
        }
        else{
            setIsFollowing(true);
        }
    }

    return(<div className="CommHeader">
        <div className="description">
        <img src={Community.image}
            className="CommImage"/>
         <p className="CommName">{Community.name}</p>
         <button  onClick={handleOnFollow}>
         <img className="FollowButton" src={isFollowing?unfollow:follow}/>
         </button> 
         <p className="FollowerCount">{FollowerCount} Follower</p>       
        </div>
        </div>);
};

export default CommunityHeader;
