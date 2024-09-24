import React, { useState } from "react";
import "./Comment.css";
import axios from "axios";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import defaultpp from "../assets/defaultpp.png";

interface CommentProps {
  comment: {
    commentId: number;
    text: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      profilePicture: string;
    };
    likes: number;
    dislikes: number;
    createdAt: string;
    reactionType: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [reaction, setReaction] = useState(comment.reactionType);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [dislikeCount, setDislikeCount] = useState(comment.dislikes);

  const handleLike = () => {
   
      console.log(comment.reactionType);
      console.log(comment.commentId);
      if (reaction === "LIKE") {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/comment/${comment.commentId}/react?reactionType=NONE`,{},
    
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
          .then((response) => {
            setReaction("NONE");
            console.log("like basılıydı tekrar tıkladık basılı değil");
            setLikeCount(response.data.likes); // Decrement like count if unliking
            setDislikeCount(response.data.dislikes);
          })
          .catch((error) => {
            console.log("unlike error");
          });
      } else {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/comment/${comment.commentId}/react?reactionType=LIKE`,{},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
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
    
  };

  const handleDislike = () => {
    console.log(comment.reactionType);
      console.log(comment.commentId);
      if (reaction === "DISLIKE") {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/comment/${comment.commentId}/react?reactionType=NONE`,{},
    
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
          .then((response) => {
            setReaction("NONE");
            console.log("like basılıydı tekrar tıkladık basılı değil");
            setLikeCount(response.data.likes); // Decrement like count if unliking
            setDislikeCount(response.data.dislikes);
          })
          .catch((error) => {
            console.log("unlike error");
          });
      } else {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/comment/${comment.commentId}/react?reactionType=DISLIKE`,{},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
          .then((response) => {
            console.log("like çalıştıXX");
            setReaction("DISLIKE");
            setLikeCount(response.data.likes); // Increment like count if liking
            setDislikeCount(response.data.dislikes);
          })
          .catch((error) => {
            console.log("like error");
          });
      }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <img
          src={
            comment.user.profilePicture
              ? `data:image/png;base64,${comment.user.profilePicture}`
              : defaultpp
          }
          alt={`${comment.user.firstName} ${comment.user.lastName}`}
          className="profile-pic"
        />
        <span>{`${comment.user.firstName} ${comment.user.lastName}`}</span>
        <span className="comment-date">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="comment-body">
        <p>{comment.text}</p>
      </div>
      <div className="comment-actions">
        <div className="comment-action">
          <button onClick={handleLike}>
            {reaction==="LIKE" ? (
              <AiFillLike className="comment-like" color="Red" />
            ) : (
              <AiOutlineLike className="comment-like" />
            )}
          </button>
          <span>{likeCount}</span>
        </div>
        <div className="comment-action">
          <button onClick={handleDislike}>
            {reaction=="DISLIKE" ? (
              <AiFillDislike className="comment-dislike" color="Blue" />
            ) : (
              <AiOutlineDislike className="comment-dislike" />
            )}
          </button>
          <span>{dislikeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
