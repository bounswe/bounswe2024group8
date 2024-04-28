import React from "react";
import "./Post.css";
import { PostProps } from "../interfaces/postInterface";
import * as Icon from "react-bootstrap-icons";

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
          <button onClick={props.onLike}>Like</button>
          <span>{props.likes}</span>
          <Icon.Heart></Icon.Heart>
          <button onClick={props.onDislike}>Dislike</button>
          <span>{props.dislikes}</span>
          <button onClick={props.onComment}>Comments</button>
          <span>{props.commentsCount}</span>
          <button onClick={props.onShare}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
