import React, { useState } from "react";
import "./Post.css";
import { PostProps } from "../interfaces/postInterface";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";

const Post: React.FC<PostProps> = (props) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmark] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleBookmark = () => {
    props.onBookmark;
    setBookmark(!bookmarked);
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={props.profilePic}
          alt={`${props.username}'s profile`}
          className="profile-pic"
        />
        <span>{props.username}</span>
        <span className="communityspan">{"posted at " + props.community}</span>
      </div>
      <div className="post-content">
        <p className="post-text">{props.text}</p>
        {props.imageUrl && (
          <img
            src={props.imageUrl}
            alt={`Posted by ${props.username}`}
            className="post-image"
            style={{ width: "100%", height: "100%" }}
          />
        )}
        <div className="post-actions">
          <div className="post-action">
            <button onClick={handleLike}>
              {liked ? (
                <AiFillLike className="like" color="Red" />
              ) : (
                <AiOutlineLike className="like" />
              )}
            </button>
            <span className="action-number">{props.likes}</span>
          </div>
          <div className="post-action">
            <button onClick={handleDislike}>
              {disliked ? (
                <AiFillDislike className="like" color="Blue" />
              ) : (
                <AiOutlineDislike className="like" />
              )}
            </button>
            <span>{props.dislikes}</span>
          </div>
          <div className="post-action">
            <button onClick={props.onComment}>
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
    </div>
  );
};

export default Post;
