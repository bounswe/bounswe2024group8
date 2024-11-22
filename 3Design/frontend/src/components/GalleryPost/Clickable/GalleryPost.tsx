import React, { memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData } from '../../interfaces'
import styles from "../GalleryPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, InsertCommentOutlined } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { formatInteractions } from '../../tsfunctions'
interface Props{
  postData: DPost,
}

const GalleryPost = ({postData} : Props) => {

  const [data, setData] = useState<DPost>(postData);
  const [modelAppearence, setModelAppearence] = useState<boolean>(false);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  const [downloadStatus, setDownloadStatus] = useState(false);

  const likeClicked = async (event:any) =>{
    event.stopPropagation();
    if (data.disliked){
      setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likes + 1, dislikes: prev.dislikes - 1}));
      return;
    }
    if (data.liked){
      setData((prev) => ({...prev,  liked: false, likes: prev.likes - 1}));
      return;
    }
    setData((prev) => ({...prev, disliked: false, liked: true, likes: prev.likes + 1}));
  }

  const dislikeClicked = async (event:any) =>{
    event.stopPropagation();
    if (data.liked){
      setData((prev) => ({...prev, liked: false, disliked: true, dislikes: prev.dislikes + 1, likes: prev.likes - 1}));
      return;
    }
    if (data.disliked){
      setData((prev) => ({...prev,  disliked: false, dislikes: prev.dislikes - 1}));
      return;
    }
    setData((prev) => ({...prev, liked: false, disliked: true, dislikes: prev.dislikes + 1}));
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
            {/* Profile picture and username div here */}
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
                data.liked ?
                <ThumbUp/>:
                <ThumbUpOutlined/>
              }
            </button>
            <p className={styles.interactionCount}>{formatInteractions(data.likes)}</p>
          </div>
          <div className="flex items-center">
            <button onClick={dislikeClicked} className='btn btn-ghost'>
              {
                data.disliked ?
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
            <p>{1453 /*comment sayısı buraya gelecek */}</p> 
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setData((prev) => ({...prev, bookmark: !prev.bookmark}))
            }}
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