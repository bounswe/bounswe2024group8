import React,{useState} from "react";
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, AccountCircleOutlined } from '@mui/icons-material'
import { DComment } from "../interfaces";
import { formatInteractions } from '../tsfunctions'

interface Props{
    commentData: DComment,
  }
const Comment = ({commentData} : Props) => {
    const [data, setData] = useState<DComment>(commentData);

    const likeClicked = async (event:any) =>{
        event.stopPropagation();
        if (data.disliked){
          setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1, dislikeCount: prev.dislikeCount - 1}));
          return;
        }
        if (data.liked){
          setData((prev) => ({...prev,  liked: false, likeCount: prev.likeCount - 1}));
          return;
        }
        setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1}));
      }
    
      const dislikeClicked = async (event:any) =>{
        event.stopPropagation();
        if (data.liked){
          setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1, likeCount: prev.likeCount - 1}));
          return;
        }
        if (data.disliked){
          setData((prev) => ({...prev,  disliked: false, dislikeCount: prev.dislikeCount - 1}));
          return;
        }
        setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1}));
      }

    return (
        <div className="pb-4 border-b border-t border-gray-300"> 
          <div className="flex items-center mt-2"> 
            <AccountCircleOutlined fontSize="large" className="mr-2" /> 
            <p className="font-bold mr-2 mb-2">{data.user.username}</p> 
          </div>
          <p className="flex items-center ml-11">{data.body}</p>
          <div className='flex gap-6 mt-1'>
          <div className='flex items-center ml-6'>
            <button onClick={likeClicked} className='btn btn-ghost btn-sm'>
            {
                data.liked ?
                <ThumbUp fontSize="small"/>:
                <ThumbUpOutlined fontSize="small"/>
              }
            </button>
            <p>{formatInteractions(data.likeCount)}</p>
          </div>
          <div className="flex items-center">
            <button onClick={dislikeClicked} className='btn btn-ghost btn-sm'>
              {
                data.disliked ?
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