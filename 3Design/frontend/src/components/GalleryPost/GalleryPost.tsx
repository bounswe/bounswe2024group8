import React, { memo, SetStateAction, useEffect, useState } from 'react'
import { DPost } from '../interfaces'
import styles from "./GalleryPost.module.css"
import DViewer from '../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
interface Props{
  postData: DPost,
  index : number,
  changePostData: (newData: DPost,index: number) => void
}

const GalleryPost = ({postData, index, changePostData} : Props) => {


  return (
      <div className={styles.postCard}>
        <div className='flex flex-col gap-2'>
          <div className='border-gray-500 border-2'>
            <DViewer filePath={postData.fileUrl!}/>

          </div>
          <p className='font-bold text-lg'>{postData.title}</p>
          <p>{postData.body}</p>
        </div>
        <div className='flex gap-6'>
          <div className='flex items-center'>
            <button onClick={() => {
              changePostData({...postData, liked: !postData.liked, likeCount: postData.likeCount + 1}, index);

            }} className='btn btn-ghost'>
            {
                postData.liked ?
                <ThumbUp/>:
                <ThumbUpOutlined/>
              }
            </button>
            <p>{postData.likeCount}</p>
          </div>
          <div className="flex items-center">
            <button onClick={() => {
              changePostData({...postData, disliked: !postData.disliked, dislikeCount: postData.dislikeCount  +1}, index);
            }} className='btn btn-ghost'>
              {
                postData.disliked ?
                <ThumbDown/>:
                <ThumbDownOutlined/>
              }
              
            </button>
            <p>{postData.dislikeCount}</p>
          </div>
          <button
            onClick={() => {
              changePostData({...postData, bookmark: !postData.bookmark}, index);

            }}
          className='btn btn-ghost'>
            {
              postData.bookmark ?
              <Bookmark/>:
              <BookmarkBorderOutlined/>
            }
          </button>
        </div>
      </div>
  )
}

export default memo(GalleryPost)