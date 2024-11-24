import React, { memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData,DComment } from '../../interfaces'
import styles from "../DiscussionPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, InsertCommentOutlined, ChevronRight } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { formatInteractions } from '../../tsfunctions'
import Comment from '../../Comment/Comment'
import { grey } from '@mui/material/colors';
import axios from 'axios'
interface Props{
    postData: DPost
}

const DiscussionPost = ({postData} : Props) => {
    const [comments, setComments] = useState<DComment[]>([]);
    const [data, setData] = useState<DPost>(postData);
    const bodyRef = useRef<HTMLParagraphElement | null>(null);
    const [annotationData, setAnnotationData] = useState<SendAnnotationData>(
      {body: "", target:{selector: {end: null, start: null}, source: postData.id}}
    );

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [comment, setComment] = useState("");

    const handleComment = async (newComment:{ text: string }) => {
        if (!newComment.text){
            return;
        }
        try{
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/comment`,
                { postId: 1, text: newComment.text },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                    }
                }
            );
            setComment(""); 
        }
        catch(e){
            console.log(e);          
        }
      }

    const likeClicked = async (event:any) =>{
        event.stopPropagation();
        if (data.disliked){
<<<<<<< Updated upstream
            setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1, dislikeCount: prev.dislikeCount - 1}));
            return;
        }
        if (data.liked){
            setData((prev) => ({...prev,    liked: false, likeCount: prev.likeCount - 1}));
            return;
        }
        setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1}));
=======
            setData((prev) => ({...prev, disliked: false, liked: true}));
            try{
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/v1/posts/${1}/react`,
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
            return;
        }
        if (data.liked){
            setData((prev) => ({...prev,    liked: true}));
            try{
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/v1/posts/${1}/react`,
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
            return;
        }
        setData((prev) => ({...prev, disliked: false, liked: true}));
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${1}/react`,
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
>>>>>>> Stashed changes
    }

    const dislikeClicked = async (event:any) =>{
        event.stopPropagation();
        if (data.liked){
<<<<<<< Updated upstream
            setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1, likeCount: prev.likeCount - 1}));
            return;
        }
        if (data.disliked){
            setData((prev) => ({...prev,    disliked: false, dislikeCount: prev.dislikeCount - 1}));
            return;
        }
        setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1}));
=======
            setData((prev) => ({...prev, liked: false, disliked: true}));
            try{
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/v1/posts/${1}/react`,
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
            return;
        }
        if (data.disliked){
            setData((prev) => ({...prev,    disliked: true}));
            try{
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/v1/posts/${1}/react`,
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
            return;
        }
        setData((prev) => ({...prev, liked: false, disliked: true}));
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${1}/react`,
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
>>>>>>> Stashed changes
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
      //console.log(annotationData)
    },[annotationData]) 

    useEffect(() => {
        fetchCommentData();
    }, [comment])


    const handleBookmark = async (event:any) => {
        event.stopPropagation();
        try{
            const data = {reactionType:"DISLIKE",bookmark: true};
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/1/react`,
                data,
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
    const fetchCommentData = async () => {
        // AJAX Request with post id
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/comments/post/${1}`,
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            console.log(res.data);
            const comments: DComment[] = res.data.map((comment: any): DComment => ({
                commentId: comment.commentId,
                text: comment.text,
                user: {
                    id: comment.user.id,
                    email: comment.user.email,
                    profilePictureUrl: comment.user.profilePictureUrl,
                    username: comment.user.nickName
                },
                likes: comment.likes,
                dislikes: comment.dislikes,
                createdAt: comment.createdAt,
                reactionId: comment.reactionId,
                reactionType: comment.reactionType
            }));
            setComments(comments);
        }
        catch(e){
            console.log(e);
        }
    
    }

    return (
            <div onMouseOut={setAnnotation} className={styles.postCard} >
                <div className='flex'>
                <img src={data.user?.profilePictureUrl || "/default_pp.png"} className="mr-2 w-12 h-12 rounded-full pixelated" /> 
                    <div className='flex'>
                    <div className="flex items-center mb"> 
                    <p className="font-bold mr-2 mb-2">{data.user?.username}</p>
                    <ChevronRight className='mb-1.5'/>
                    <p className="font-bold ml-1 mb-2">CategoryName</p>
                    </div>
                    <div className="flex items-center mb-2"> 
                    <Shield sx={{ backgroundColor: 'white', color: grey[500] }} className='ml-5'/>
                    <p style={{ color: grey[500] }} className='ml-2'>Challenged to <a>post</a></p>
                    </div>
                    </div>
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
                <div className='flex gap-2'>
              <input type="text" placeholder="Write your comment..." value={comment} onChange={(e) => setComment(e.target.value)} className='w-full border border-gray-300 rounded-lg p-2'/>
              <button className='btn' onClick={(commentText) => {
            const newComment: { text: string } = {
                text: comment,
            };
            handleComment(newComment);
          }}>Comment</button>
          </div>
          <div className='h-80 overflow-y-scroll'>
                  {comments.map((item, index) => (
                      <Comment key={`g_${item.commentId}`} commentData={item}/>
                      
                  )) }
          </div>
            </div>
    )
}

export default memo(DiscussionPost)