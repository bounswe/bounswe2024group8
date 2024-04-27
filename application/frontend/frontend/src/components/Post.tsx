import React from "react";
import "./Post.css";
import { PostProps } from "../interfaces/postInterface";

const Post: React.FC<PostProps> = (props) => {
  return (
    <div className="post">
      <div className="post-header">
        <img
          src={props.profilePic}
          alt={`${props.username}'s profile`}
          className="profile-pic"
        />
        <span>{props.username}</span>
      </div>
      <p className="post-text">{props.text}</p>
      {props.imageUrl && <div className="post-image">Image Placeholder</div>}
      <div className="post-actions">
        <button onClick={props.onLike}>Like</button>
        <span>{props.likes}</span>
        <button onClick={props.onDislike}>Dislike</button>
        <span>{props.dislikes}</span>
        <button onClick={props.onComment}>Comments</button>
        <span>{props.commentsCount}</span>
        <button onClick={props.onShare}>Share</button>
      </div>
    </div>
  );
};

export default Post;
