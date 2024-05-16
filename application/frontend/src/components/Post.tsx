import React, { useState } from "react";
import "./Post.css";
import { PostProps } from "../interfaces/postInterface";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import defaultpp from "../assets/defaultpp.png";
import axios from "axios";

const Post: React.FC<PostProps> = (props) => {
  const [reaction, setReaction] = useState(props.reactionType);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmark] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if(props.community===localStorage.getItem("myCommunity") || props.community==="GLOBAL"){
      console.log(props.reactionType);
    if (reaction==="LIKE") {
      const body = {
        "reactionType":"NONE",        
        "bookmark": false
        };
      axios
          .post(`${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,body, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            setReaction("NONE");
            console.log("like basılıydı tekrar tıkladık basılı değil");
            setLikeCount(response.data.likes); // Decrement like count if unliking
            setDislikeCount(response.data.dislikes);
          })
          .catch((error) => {
            console.log("like error");
          });
      
    } else {
      const body = {
        "reactionType":"LIKE",        
        "bookmark": false
        };
      axios
          .post(`${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,body, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            console.log("like çalıştıXX");
            setReaction("LIKE");
            setLikeCount(response.data.likes); // Increment like count if liking
            setDislikeCount(response.data.dislikes);
          })
          .catch((error) => {
            console.log("like error");
          });
    }
  }
  };

  const handleDislike = () => {
    if(props.community===localStorage.getItem("myCommunity") || props.community==="GLOBAL"){
    if (reaction === "DISLIKE") {
      const body = {
        "reactionType":"NONE",        
        "bookmark": false
        };
      axios
          .post(`${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,body, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            setReaction("NONE");
            console.log("dislike basılıydı tekrar tıkladık basılı değil");
            setLikeCount(response.data.likes);
            setDislikeCount(response.data.dislikes); 
          })
          .catch((error) => {
            console.log("dislike unpress error");
          });
    } else {
      const body = {
        "reactionType":"DISLIKE",        
        "bookmark": false
        };
      axios
          .post(`${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,body, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then((response) => {
            console.log("dislike calıstı");
            setReaction("DISLIKE");
            setLikeCount(response.data.likes);
            setDislikeCount(response.data.dislikes); // Increment like count if liking
          })
          .catch((error) => {
            console.log("like error");
          });
    }
  }
  };

  const handleBookmark = () => {
    props.onBookmark?.(); // Ensure to call the function if it exists
    setBookmark(!bookmarked);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={props.profilePic || defaultpp}
          alt={`${props.username}'s profile`}
          className="profile-pic"
        />

        <span>{props.firstName + " " + props.lastName}</span>
        <span className="communityspan">{"posted at " + props.community}</span>
      </div>
      <div className="post-content">
        <h4 className="post-title">{props.title}</h4>
        <p className="post-text">{props.text}</p>
        {props.imageUrl && (
          <img
            src={props.imageUrl}
            alt={`Posted by ${props.username}`}
            className="post-image"
            style={{ width: "100%", height: "100%", maxHeight: 500 }}
          />
        )}
        <div className="post-actions">
          <div className="post-action">
            <button onClick={handleLike}>
              {reaction==="LIKE" && (props.community===localStorage.getItem("myCommunity") || props.community==="GLOBAL") ? (
                <AiFillLike className="like" color="Red" />
              ) : (
                <AiOutlineLike className="like" />
              )}
            </button>
            <span className="action-number">{likeCount}</span>
          </div>
          <div className="post-action">
            <button onClick={handleDislike}>
              {reaction==="DISLIKE" && (props.community===localStorage.getItem("myCommunity") || props.community==="GLOBAL") ? (
                <AiFillDislike className="like" color="Blue" />
              ) : (
                <AiOutlineDislike className="like" />
              )}
            </button>
            <span>{dislikeCount}</span>
          </div>
          <div className="post-action">
            <button onClick={handleComment}>
              <FaRegCommentDots className="like" />
            </button>
            <span>{props.commentsCount}</span>
          </div>
          <div className="post-action">
            <button onClick={handleBookmark}>
              {bookmarked ? (
                <IoBookmark className="like" />
              ) : (
                <IoBookmarkOutline className="like" />
              )}
            </button>
          </div>
        </div>
      </div>
      {showComments && (
        <div className="comment-section">
          <h1>COMMENT SECTION</h1>
        </div>
      )}
    </div>
  );
};

export default Post;
