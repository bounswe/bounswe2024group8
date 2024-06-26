import React, { useEffect, useState } from "react";
import "./Post.css";
import { PostProps } from "../interfaces/postInterface";
import { useNavigate } from "react-router-dom";
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
import ProfileOuter from "./ProfileOuter.tsx"
import Profile from "./Profile";

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
  reactionType: string;
}

const Post: React.FC<PostProps> = (props) => {
  const [reaction, setReaction] = useState(props.reactionType);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(props.bookmark);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();
  console.log(props.reactionType+"AA");
  function handleOnClick(){
    console.log(props.username);
    navigate(`/profile/${props.username}`);
  }

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
    if (
      props.community === localStorage.getItem("myCommunity") ||
      props.community === "GLOBAL"
    ) {
      console.log(props.reactionType);
      if (reaction === "LIKE") {
        const body = {
          reactionType: "NONE",
          bookmark: bookmarked,
        };
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,
            body,
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
            console.log("like error");
          });
      } else {
        const body = {
          reactionType: "LIKE",
          bookmark: bookmarked,
        };
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,
            body,
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
    }
  };

  const handleDislike = () => {
    if (
      props.community === localStorage.getItem("myCommunity") ||
      props.community === "GLOBAL"
    ) {
      if (reaction === "DISLIKE") {
        const body = {
          reactionType: "NONE",
          bookmark: bookmarked,
        };
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,
            body,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
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
          reactionType: "DISLIKE",
          bookmark: bookmarked,
        };
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,
            body,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
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
    const body = {
      reactionType: reaction,
      bookmark: !bookmarked,
    };
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/posts/${props.id}/react`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("bookmark calıstı");
        setBookmarked(!bookmarked);
      })
      .catch((error) => {
        console.log("bookmark error");
      });
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
          commentId: response.data.id, // Assuming the response contains the new comment ID
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
          reactionType: "NONE",
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

        <span onClick={handleOnClick}  style={{ cursor: "pointer" }}>{props.firstName + " " + props.lastName}</span>
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
              {reaction === "LIKE" &&
              (props.community === localStorage.getItem("myCommunity") ||
                props.community === "GLOBAL") ? (
                <AiFillLike className="like" color="Red" />
              ) : (
                <AiOutlineLike className="like" />
              )}
            </button>
            <span className="action-number">{likeCount}</span>
          </div>
          <div className="post-action">
            <button onClick={handleDislike}>
              {reaction === "DISLIKE" &&
              (props.community === localStorage.getItem("myCommunity") ||
                props.community === "GLOBAL") ? (
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
