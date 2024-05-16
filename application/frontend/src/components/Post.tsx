import React, { useEffect, useState } from "react";
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
import Comment from "./Comment";
import axios from "axios";
import AddComment from "./AddComment";

interface Comment {
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
}

const Post: React.FC<PostProps> = (props) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmark] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    console.log("Post ID:", props.id); // Log the post ID
    if (props.id) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/v1/comments/post/${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        )
        .then((response) => {
          console.log("Fetched comments:", response.data); // Log fetched comments
          setComments(response.data);
        })
        .catch((error) => {
          console.log("Error fetching comments", error);
        });
    }
  }, [props.id]);

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

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = (commentText: string) => {
    const body = {
      postId: props.id,
      text: commentText,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/v1/posts/comment`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        // After successful API call, add the new comment to the state
        const newComment: Comment = {
          commentId: response.data.commentId, // Assuming the response contains the new comment ID
          text: commentText,
          user: {
            id: 1, // Replace with actual user ID
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            profilePicture: response.data.user.profilePicture,
          },
          likes: 0,
          dislikes: 0,
          createdAt: new Date().toISOString(),
        };
        setComments([newComment, ...comments]);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(`New comment for post ${props.id}:`, commentText);
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
          <AddComment postId={props.id} onAddComment={handleAddComment} />
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.commentId} comment={comment} />
            ))
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
