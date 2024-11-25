import React, { memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData } from '../../interfaces'
import styles from "../GalleryPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { ChevronRight,Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, InsertCommentOutlined } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { grey } from '@mui/material/colors';
import { formatInteractions,getCategoryById } from '../../tsfunctions'
import axios from 'axios'
interface Props{
  postData: DPost,
}

const GalleryPost = ({postData} : Props) => {

  const [data, setData] = useState<DPost>(postData);
  const [modelAppearence, setModelAppearence] = useState<boolean>(false);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  const [downloadStatus, setDownloadStatus] = useState(false);

  const handleBookmark = async (event:any) => {
    event.stopPropagation();
    try{
        const commentData = {reactionType:data.reactionType,bookmark: !data.bookmark};
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}/react`,
            commentData,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
            }}
        );
        console.log(res.data);
    }
    catch(e){
        console.log(e);
    }
    setData((prev) => ({...prev, bookmark: !prev.bookmark}));
}
const likeClicked = async (event:any) =>{
    event.stopPropagation();
    if (data.reactionType === "DISLIKE"){
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}/react`,
                {reactionType:"LIKE",bookmark: data.bookmark },
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            console.log(res.data);
        }
        catch(e){
            console.log(e);
        }
        setData((prev) => ({...prev,reactionType:"LIKE", likes: prev.likes + 1, dislikes: prev.dislikes - 1}));
        return;
    }
    if (data.reactionType === "LIKE"){
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}/react`,
                {reactionType:"NONE",bookmark: data.bookmark },
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            console.log(res.data);
        }
        catch(e){
            console.log(e);
        }
        setData((prev) => ({...prev, reactionType:"NONE" ,  liked: false, likes: prev.likes - 1}));
        return;
    }
    try{
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}/react`,
            {reactionType:"LIKE",bookmark: data.bookmark },
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
            }}
        );
        console.log(res.data);
    }
    catch(e){
        console.log(e);
    }
    setData((prev) => ({...prev, reactionType:"LIKE" ,liked: true, likes: prev.likes + 1}));
}

const dislikeClicked = async (event:any) =>{
    event.stopPropagation();
    if (data.reactionType === "LIKE"){
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}/react`,
                {reactionType:"DISLIKE",bookmark: data.bookmark },
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            console.log(res.data);
        }
        catch(e){
            console.log(e);
        }
        setData((prev) => ({...prev, reactionType:"DISLIKE",likes: prev.likes - 1, dislikes: prev.dislikes + 1}));
        return;
    }
    if (data.reactionType === "DISLIKE"){
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}/react`,
                {reactionType:"NONE",bookmark: data.bookmark },
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            console.log(res.data);
        }
        catch(e){
            console.log(e);
        }
        setData((prev) => ({...prev,reactionType:"NONE",dislikes: prev.dislikes - 1}));
        return;
    }
    try{
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}/react`,
            {reactionType:"DISLIKE",bookmark: data.bookmark },
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
            }}
        );
        console.log(res.data);
    }
    catch(e){
        console.log(e);
    }
    setData((prev) => ({...prev,reactionType:"DISLIKE",dislikes: prev.dislikes + 1}));
}

  const downloadModel = (event:any) => {
    event.stopPropagation();
    setDownloadStatus(true);
    const lnk = document.createElement("a");
    lnk.href = postData.fileUrl!;
    lnk.download = `model_${postData.postId}.${postData.fileUrl!.split(".").slice(-1)}`;
    lnk.click();
    lnk.remove();
    setTimeout(() => {
      setDownloadStatus(false);
    }, 5000);
  }

  return (
      <div className={`clickable-post ${styles.postCard}`} onClick={() => {window.location.href = `/post/${postData.postId}`}}>
        <div className='flex'>
                    <img src={data.user?.profilePictureUrl || "/default_pp.png"} className="mr-2 w-12 h-12 rounded-full pixelated" /> 
                    <div className='flex'>
                    <div className="flex items-center mb"> 
                    <p className="font-bold mr-2 mb-2">{data.user?.nickName}</p>
                    <ChevronRight className='mb-1.5'/>
                    <p className="font-bold ml-1 mb-2">{getCategoryById(data.categoryId.toString())}</p>
                    </div>
                    { data.isVisualPost && data.challengedPostId !== null ?
                    <div className="flex items-center mb-2"> 
                    <Shield sx={{ color: grey[500] }} className='ml-5'/>
                    <p style={{ color: grey[500] }} className='ml-2'>Challenged to <a>post</a></p>
                    </div>: null
                    }
                    </div>
        </div>
        <div className='flex flex-col gap-2'>
          {modelAppearence ?
          <div className='border-gray-500 border-2 non-clickable-div'>
            <DViewer filePath={data.fileUrl!}/> 
          </div> 
          :
          <div onClick={event => event.stopPropagation() } className={`flex justify-center items-center non-clickable-div ${styles.previewContainer}`} style={{backgroundImage: "url(/previewmodel.jpg)"}} >
              <button onClick={() => {
                
                setModelAppearence(true)}} className={`btn ${styles.viewModelBtn}`}>View Model</button>
          </div>
          }
          <p className='font-bold text-lg'>{data.title}</p>
          <p ref={bodyRef}>{data.text}</p>
        </div>
        <div className='flex gap-6'>
          <div className='flex items-center'>
            <button onClick={likeClicked} className='btn btn-ghost'>
            {
                data.reactionType === "LIKE" ?
                <ThumbUp/>:
                <ThumbUpOutlined/>
              }
            </button>
            <p className={styles.interactionCount}>{formatInteractions(data.likes)}</p>
          </div>
          <div className="flex items-center">
            <button onClick={dislikeClicked} className='btn btn-ghost'>
              {
                data.reactionType === "DISLIKE" ?
                <ThumbDown/>:
                <ThumbDownOutlined/>
              }
              
            </button>
            <p className={styles.interactionCount}>{formatInteractions(data.dislikes)}</p>
          </div>
          <div className='flex items-center'>
            <button className='btn btn-ghost'>
            {
                <InsertCommentOutlined/>
              }
            </button>
            <p>{data.comments}</p> 
          </div>
          <button
            onClick={handleBookmark}
          className='btn btn-ghost'>
            {
              data.bookmark ?
              <Bookmark/>:
              <BookmarkBorderOutlined/>
            }
          </button>
        </div>
      </div>
  )
}

export default memo(GalleryPost)