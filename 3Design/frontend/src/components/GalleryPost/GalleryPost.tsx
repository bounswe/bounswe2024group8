import React, { memo, SetStateAction, useEffect, useState } from 'react'
import { DPost } from '../interfaces'
import styles from "./GalleryPost.module.css"
import DViewer from '../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
interface Props{
  postData: DPost,

}

const GalleryPost = ({postData} : Props) => {

  const [data, setData] = useState<DPost>(postData);
  const [modelAppearence, setModelAppearence] = useState<boolean>(false);

  const likeClicked = async () =>{
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

  const dislikeClicked = async () =>{
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
      <div className={styles.postCard}>
        <div className='flex flex-col gap-2'>
          {modelAppearence ?
          <div className='border-gray-500 border-2'>
            <DViewer filePath={data.fileUrl!}/> 
          </div> 
          :
          <div className={`flex justify-center items-center ${styles.previewContainer}`} style={{backgroundImage: "url(/previewmodel.jpg)"}} >
              <button onClick={() => setModelAppearence(true)} className={`btn ${styles.viewModelBtn}`}>View Model</button>
          </div>
          }
          <p className='font-bold text-lg'>{data.title}</p>
          <p>{data.body}</p>
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
            <p>{data.likeCount}</p>
          </div>
          <div className="flex items-center">
            <button onClick={dislikeClicked} className='btn btn-ghost'>
              {
                data.disliked ?
                <ThumbDown/>:
                <ThumbDownOutlined/>
              }
              
            </button>
            <p>{data.dislikeCount}</p>
          </div>
          <button
            onClick={() => {
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