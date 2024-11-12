import React, { memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData } from '../interfaces'
import styles from "./DiscussionPost.module.css"
import DViewer from '../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { formatInteractions } from '../tsfunctions'
interface Props{
    postData: DPost,
}

const DiscussionPost = ({postData} : Props) => {
    const [data, setData] = useState<DPost>(postData);
    const bodyRef = useRef<HTMLParagraphElement | null>(null);
    const [annotationData, setAnnotationData] = useState<SendAnnotationData>(
      {body: "", target:{selector: {end: null, start: null}, source: postData.id}}
    );

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const likeClicked = async () =>{
        if (data.disliked){
            setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1, dislikeCount: prev.dislikeCount - 1}));
            return;
        }
        if (data.liked){
            setData((prev) => ({...prev,    liked: false, likeCount: prev.likeCount - 1}));
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
            setData((prev) => ({...prev,    disliked: false, dislikeCount: prev.dislikeCount - 1}));
            return;
        }
        setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1}));
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
        setAnnotationData(prev => ({...prev, target:{selector: {end: startI, start: endI}, source: postData.id}}) );
      } else {
        setAnnotationData(prev => ({...prev, target:{selector: {end: null, start: null}, source: postData.id}}) );
      }
    }

    useEffect(() => {
      console.log(annotationData)
    },[annotationData]) 

    return (
            <div onMouseOut={setAnnotation} className={styles.postCard}>
                <div className='flex'>
                    {/* Profile picture and username div here */}
                    <div className='mr-0 ml-auto'>
                        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <MoreVert/>
                        </IconButton>
                        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                            {/* <MenuItem className='gap-2'>
                                <Download/>
                                Download Model
                            </MenuItem> 
                            <MenuItem className='gap-2'>
                                <Shield/>
                                Challenge Post
                            </MenuItem>*/}
                            <MenuItem disabled={!annotationData.target.selector.start} className='gap-2'>
                                <BorderColor/>
                                Annotate
                            </MenuItem>
                            
                        </Menu>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-bold text-lg'>{data.title}</p>
                    <p ref={bodyRef} onMouseUp={setAnnotation} >{data.body}</p>
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
                        <p className={styles.interactionCount}>{formatInteractions(data.likeCount)}</p>
                    </div>
                    <div className="flex items-center">
                        <button onClick={dislikeClicked} className='btn btn-ghost'>
                            {
                                data.disliked ?
                                <ThumbDown/>:
                                <ThumbDownOutlined/>
                            }
                            
                        </button>
                        <p className={styles.interactionCount}>{formatInteractions(data.dislikeCount)}</p>
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

export default memo(DiscussionPost)