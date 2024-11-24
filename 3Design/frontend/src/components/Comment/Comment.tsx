import React,{useEffect, useState} from "react";
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, AccountCircleOutlined } from '@mui/icons-material'
import { DComment } from "../interfaces";
import { formatInteractions } from '../tsfunctions'
import axios from "axios";

interface Props{
    commentData: DComment,
  }
const Comment = ({commentData} : Props) => {
    const [data, setData] = useState<DComment>(commentData);

    useEffect(() => {
    }, [data.reactionType]);

    const likeClicked = async (event:any) =>{
        event.stopPropagation();
<<<<<<< Updated upstream
        if (data.disliked){
          setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1, dislikeCount: prev.dislikeCount - 1}));
          return;
        }
        if (data.liked){
          setData((prev) => ({...prev,  liked: false, likeCount: prev.likeCount - 1}));
          return;
        }
        setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1}));
=======
        if (data.reactionType === 'LIKE'){
          try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/comment/${data.commentId}/react?reactionType=NONE`,
                null,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_token")}` 
                    }
                }
            );
    
            console.log("Response:", response.data);
            setData((prev) => ({
              ...prev,
              reactionType: 'NONE',
              likes: response.data.likes,
              dislikes: response.data.dislikes
          }));
        } catch (error) {
            console.error("Error reacting to comment:", error);
            throw error;
        }
          return;
        }

        try {
          const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/v1/posts/comment/${data.commentId}/react?reactionType=LIKE`,
              null,{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("jwt_token")}` 
                  }
              }
          );
  
          console.log("Response:", response.data);
          setData((prev) => ({
            ...prev,
            reactionType: 'LIKE',
            likes: response.data.likes,
            dislikes: response.data.dislikes
        }));
      } catch (error) {
          console.error("Error reacting to comment:", error);
          throw error;
      }
        
       

>>>>>>> Stashed changes
      }
    
      const dislikeClicked = async (event:any) =>{
        event.stopPropagation();
<<<<<<< Updated upstream
        if (data.liked){
          setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1, likeCount: prev.likeCount - 1}));
          return;
        }
        if (data.disliked){
          setData((prev) => ({...prev,  disliked: false, dislikeCount: prev.dislikeCount - 1}));
          return;
        }
        setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1}));
=======
        if (data.reactionType === 'DISLIKE'){
          try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/comment/${data.commentId}/react?reactionType=NONE`,
                null,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_token")}` 
                    }
                }
            );
    
            console.log("Response:", response.data);
            setData((prev) => ({
              ...prev,
              reactionType: 'NONE',
              likes: response.data.likes,
              dislikes: response.data.dislikes
          }));
        } catch (error) {
            console.error("Error reacting to comment:", error);
            throw error;
        }
        return;
        }
        
        try {
          const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/v1/posts/comment/${data.commentId}/react?reactionType=DISLIKE`,
              null,{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("jwt_token")}` 
                  }
              }
          );
  
          console.log("Response:", response.data);
          setData((prev) => ({
            ...prev,
            reactionType: 'DISLIKE',
            likes: response.data.likes,
            dislikes: response.data.dislikes
        }));
      } catch (error) {
          console.error("Error reacting to comment:", error);
          throw error;
      }

>>>>>>> Stashed changes
      }

    return (
        <div className="pb-4 border-b border-t border-gray-300 w-full"> 
          <div className="flex items-center mt-2"> 
            <img src={data.user.profilePictureUrl || "/default_pp.png"} className="mr-2 w-7 h-7 rounded-full pixelated" /> 
            <p className="font-bold mr-2 mb-2">{data.user.username}</p> 
          </div>
<<<<<<< Updated upstream
          <p className="flex items-center ml-11">{data.body}</p>
=======
          <p className="flex items-center ml-11 w-11/12 break-words">{data.text}</p>
>>>>>>> Stashed changes
          <div className='flex gap-6 mt-1'>
          <div className='flex items-center ml-6'>
            <button onClick={likeClicked} className='btn btn-ghost btn-sm'>
            {
                data.reactionType === 'LIKE' ?
                <ThumbUp fontSize="small"/>:
                <ThumbUpOutlined fontSize="small"/>
              }
            </button>
            <p>{formatInteractions(data.likeCount)}</p>
          </div>
          <div className="flex items-center">
            <button onClick={dislikeClicked} className='btn btn-ghost btn-sm'>
              {
                data.reactionType === 'DISLIKE' ?
                <ThumbDown fontSize="small"/>:
                <ThumbDownOutlined fontSize="small"/>
              }
              
            </button>
            <p>{formatInteractions(data.dislikeCount)}</p>
          </div>
          </div>
        </div>
      );
}

export default Comment; 