import React, { useState } from "react";
import "./Comment.css";
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
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [dislikeCount, setDislikeCount] = useState(comment.dislikes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      if (disliked) {
        setDislikeCount(dislikeCount - 1);
        setDisliked(false);
      }
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikeCount(dislikeCount - 1);
    } else {
      setDislikeCount(dislikeCount + 1);
      if (liked) {
        setLikeCount(likeCount - 1);
        setLiked(false);
      }
    }
    setDisliked(!disliked);
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
            {liked ? (
              <AiFillLike className="comment-like" color="Red" />
            ) : (
              <AiOutlineLike className="comment-like" />
            )}
          </button>
          <span>{likeCount}</span>
        </div>
        <div className="comment-action">
          <button onClick={handleDislike}>
            {disliked ? (
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
