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

const Post: React.FC<PostProps> = (props) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmark] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1); // Decrement like count if unliking
    } else {
      setLikeCount(likeCount + 1); // Increment like count if liking
      if (disliked) {
        setDislikeCount(dislikeCount - 1); // If previously disliked, adjust dislike count
        setDisliked(false);
      }
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikeCount(dislikeCount - 1); // Decrement dislike count if undisliking
    } else {
      setDislikeCount(dislikeCount + 1); // Increment dislike count if disliking
      if (liked) {
        setLikeCount(likeCount - 1); // If previously liked, adjust like count
        setLiked(false);
      }
    }
    setDisliked(!disliked);
  };

  const handleBookmark = () => {
    props.onBookmark?.(); // Ensure to call the function if it exists
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
            style={{ width: "100%", height: "100%", maxHeight: 500 }}
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
            <span className="action-number">{likeCount}</span>
          </div>
          <div className="post-action">
            <button onClick={handleDislike}>
              {disliked ? (
                <AiFillDislike className="like" color="Blue" />
              ) : (
                <AiOutlineDislike className="like" />
              )}
            </button>
            <span>{dislikeCount}</span>
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
