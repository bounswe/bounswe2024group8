import React, { memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData } from '../../interfaces'
import styles from "../DiscussionPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { formatInteractions } from '../../tsfunctions'
interface Props{
    postData: DPost
}

const DiscussionPost = ({postData} : Props) => {
    const [data, setData] = useState<DPost>(postData);
    const bodyRef = useRef<HTMLParagraphElement | null>(null);
    const [annotationData, setAnnotationData] = useState<SendAnnotationData>(
      {body: "", target:{selector: {end: null, start: null}, source: postData.postId}}
    );

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const likeClicked = async (event:any) =>{
        event.stopPropagation();
        if (data.disliked){
            setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likes + 1, dislikes: prev.dislikes - 1}));
            return;
        }
        if (data.liked){
            setData((prev) => ({...prev,    liked: false, likes: prev.likes - 1}));
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
            setData((prev) => ({...prev,    disliked: false, dislikes: prev.dislikes - 1}));
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

    useEffect(() => {
      console.log(annotationData)
    },[annotationData]) 

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
                    <p ref={bodyRef} onMouseUp={setAnnotation} >{data.text}</p>
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
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
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