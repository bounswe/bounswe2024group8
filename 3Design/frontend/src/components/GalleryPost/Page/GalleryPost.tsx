import React, { memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData, DComment } from '../../interfaces'
import styles from "../GalleryPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, InsertCommentOutlined } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { formatInteractions } from '../../tsfunctions'
import Comment from '../../Comment/Comment'
import MockComments from '../../../resources/json-files/Comments.json'
interface Props{
  postData: DPost,
}

const GalleryPost = ({postData} : Props) => {

  const comments: DComment[] = JSON.parse(localStorage.getItem("comments") || "[]") as DComment[];
  const [data, setData] = useState<DPost>(postData);
  const [modelAppearence, setModelAppearence] = useState<boolean>(false);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const [annotationData, setAnnotationData] = useState<SendAnnotationData>(
    {body: "", target:{selector: {end: null, start: null}, source: postData.postId}}
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [comment, setComment] = useState("");

  const handleComment = async (newComment: DComment) => {
    if(newComment.text !== ""){
    comments.push(newComment);
    console.log(comments);
    localStorage.setItem("comments", JSON.stringify(comments));
    }
    setComment("");
  }

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

  const setAnnotation = () =>{
    const selection = window.getSelection();
    if (!selection){
      return;
    }
    const selectedText = selection.toString();

    if (selectedText && selection.anchorNode && bodyRef.current!.contains(selection.anchorNode)) {
      const startI = selection.anchorOffset;
      const endI = selection.focusOffset;
      setAnnotationData(prev => ({...prev, target:{selector: {end: startI, start: endI}, source: postData.postId}}) );
    } else {
      setAnnotationData(prev => ({...prev, target:{selector: {end: null, start: null}, source: postData.postId}}) );
    }
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
      <div onMouseOut={setAnnotation} className={styles.postCard} >
        <div className='flex'>
            {/* Profile picture and username div here */}

            <div className='mr-0 ml-auto'>
                <IconButton onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(e.currentTarget)}}>
                    <MoreVert/>
                </IconButton>
                <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                    <MenuItem disabled={downloadStatus} onClick={downloadModel} className='gap-2'>
                        <Download/>
                        Download Model
                    </MenuItem>
                    <MenuItem className='gap-2'>
                        <Shield/>
                        Challenge Post
                    </MenuItem>
                    <MenuItem disabled={!annotationData.target.selector.start} className='gap-2'>
                        <BorderColor/>
                        Annotate
                    </MenuItem>
                    
                </Menu>
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
          <p ref={bodyRef} onMouseUp={setAnnotation}>{data.text}</p>
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
        <div className='flex gap-2'>
            <input type="text" placeholder="Write your comment..." value={comment} onChange={(e) => setComment(e.target.value)} className='w-full border border-gray-300 rounded-lg p-2'/>
            <button className='btn' onClick={(commentText) => {
          const newComment: DComment = {
            commentId: comments.length + 1,
            user: {
              username: localStorage.getItem("username") || "Anonymous",
              profilePictureUrl: "",
              id: 1000,
            },
            "text": comment,
            "memberId": 1,
            "postId": data.postId,
            "likes": 0,
            "dislikes": 0,
            "liked": false,
            "disliked": false,
          };
          handleComment(newComment);
        }}>Comment</button>
        </div>
        <div className='h-80 overflow-y-scroll'>
                {comments.map((item, index) => (
                    item.postId === data.postId ?
                    <Comment key={`g_${item.postId}`} commentData={item}/> 
                    :
                    null
                )) }
        </div>
      </div>
  )
}

export default memo(GalleryPost)