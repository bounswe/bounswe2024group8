import React, { memo, SetStateAction, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData, DComment } from '../../interfaces'
import styles from "../GalleryPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, InsertCommentOutlined } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { formatInteractions } from '../../tsfunctions'
import Comment from '../../Comment/Comment'
<<<<<<< Updated upstream
import MockComments from '../../../resources/json-files/Comments.json'
=======
import ChallengePost from '../../CreatePost/ChallengePost'
import PostAnnotation from '../../Annotations/PostAnnotation'
import { message, Switch } from 'antd'
import axios from 'axios'
>>>>>>> Stashed changes
interface Props{
  postData: DPost,
}

const GalleryPost = ({postData} : Props) => {

  const [comments, setComments] = useState<DComment[]>([]);
  const [data, setData] = useState<DPost>(postData);
  const [modelAppearence, setModelAppearence] = useState<boolean>(false);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const [annotationData, setAnnotationData] = useState<SendAnnotationData>(
    {body: "", target:{selector: {end: null, start: null}, source: postData.id}}
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [comment, setComment] = useState("");

<<<<<<< Updated upstream
  const handleComment = async (newComment: DComment) => {
    if(newComment.body !== ""){
    comments.push(newComment);
    console.log(comments);
    localStorage.setItem("comments", JSON.stringify(comments));
=======
  const [challengeDialog, setChallengeDialog] = useState(false);

  const [currentAnnotations, setCurrentAnnotations] = useState<DisplayedAnnotationData[]>([]);
  const [annotationsVisible, setAnnotationsVisible] = useState(false);

  const [annotatedText, setAnnotatedText] = useState("");
  const [annotationSending, setAnnotatingSending] = useState(false);

  const [publishedAnnotations, setPublishedAnnotations] = useState<RecievedAnnotationData[]>(publishedAnnotationsProps);

  const setDisplayedAnnotation = useCallback((x: DisplayedAnnotationData[]) =>{
    setCurrentAnnotations(x);
  }, []);

  const handleComment = async (newComment:{ text: string }) => {
    if (!newComment.text){
      return;
    }
    try{
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/posts/comment`,
            { postId: 4, text: newComment.text },
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
>>>>>>> Stashed changes
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
      setData((prev) => ({...prev,  liked: false, likeCount: prev.likeCount - 1}));
      return;
    }
    setData((prev) => ({...prev, disliked: false, liked: true, likeCount: prev.likeCount + 1}));
  }
=======
        setData((prev) => ({...prev, disliked: false, liked: true}));
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${4}/react`,
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
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${4}/react`,
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
            `${process.env.REACT_APP_API_URL}/api/v1/posts/${4}/react`,
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
}
>>>>>>> Stashed changes

const dislikeClicked = async (event:any) =>{
    event.stopPropagation();
    if (data.liked){
<<<<<<< Updated upstream
      setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1, likeCount: prev.likeCount - 1}));
      return;
    }
    if (data.disliked){
      setData((prev) => ({...prev,  disliked: false, dislikeCount: prev.dislikeCount - 1}));
      return;
    }
    setData((prev) => ({...prev, liked: false, disliked: true, dislikeCount: prev.dislikeCount + 1}));
  }
=======
        setData((prev) => ({...prev, liked: false, disliked: true}));
        try{
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${4}/react`,
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
                `${process.env.REACT_APP_API_URL}/api/v1/posts/${4}/react`,
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
            `${process.env.REACT_APP_API_URL}/api/v1/posts/${4}/react`,
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
}
>>>>>>> Stashed changes

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

  const downloadModel = (event:any) => {
    event.stopPropagation();
    setDownloadStatus(true);
    const lnk = document.createElement("a");
    lnk.href = postData.fileUrl!;
    lnk.download = `model_${postData.id}.${postData.fileUrl!.split(".").slice(-1)}`;
    lnk.click();
    lnk.remove();
    setTimeout(() => {
      setDownloadStatus(false);
    }, 5000);
  }

<<<<<<< Updated upstream
=======
  const startAnnotation = () => {
    setAnnotatedText(postData.text.slice(annotationData.startIndex!, annotationData.endIndex!));
  }

  const postAnnotation = async () => {
    let postPhase = false;
    if (annotationData.content.length < 3){
      message.error("Your annotation must be at least 3 characters.");
      return;
    }
    try{
      setAnnotatingSending(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/annotations/add`, annotationData, {
        headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}}
      )
      message.success("Annotation published successfully.");
      postPhase = true;
      setAnnotatedText("");
      const refreshedAnnotations = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/annotations/get?postId=${9}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}}
      );
      setPublishedAnnotations(refreshedAnnotations.data);
    }catch(e){
      if (!postPhase){
        message.error("Something went wrong while publishing your annotation.");
      }
      else{
        message.error("Something went wrong while fetching new annotations.");
      }
      
    }
    finally{
      setAnnotatingSending(false);
    }
  }

  useEffect(() => {
    fetchCommentData();
}, [comment])

useEffect(() => {
    handleBookmark();
}, [data.bookmark]);

const handleBookmark = async () => {
    try{
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/v1/posts/${4}/react`,
            {reactionType:"NONE",bookmark: data.bookmark},
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
            }}
        );
        console.log(res.data);
    }
    catch(e){
        console.log(e);
    }
}
const fetchCommentData = async () => {
    // AJAX Request with post id
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/comments/post/${4}`,
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
              username: comment.user.username
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

>>>>>>> Stashed changes
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
          <p ref={bodyRef} onMouseUp={setAnnotation}>{data.body}</p>
        </div>
        <div className='flex gap-6'>
          <div className='flex items-center'>
            <button onClick={likeClicked} className='btn btn-ghost'>
            {
<<<<<<< Updated upstream
                data.liked ?
                <ThumbUp/>:
                <ThumbUpOutlined/>
=======
              annotationsVisible ? 
              <PostAnnotation annotations={publishedAnnotations} postBody={postData.text} setAnnotationsVisible={setDisplayedAnnotation}/>
              :
              <p ref={bodyRef} onMouseUp={!annotationsVisible ? setAnnotation : () => (null)}>{data.text}</p>
            }
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
              <p>{data.comments}</p>
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
>>>>>>> Stashed changes
              }
            </button>
            <p className={styles.interactionCount}>{formatInteractions(data.likeCount)}</p>
          </div>
<<<<<<< Updated upstream
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
            <p>{1453 /*comment sayısı buraya gelecek */}</p> 
=======
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
>>>>>>> Stashed changes
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
            "id": comments.length + 1,
            "user": {
              username: localStorage.getItem("username") || "Anonymous",
              profilePhoto: "",
              tournamentPoints: "1000",
            },
            "body": comment,
            "memberId": 1,
            "postId": data.id,
            "likeCount": 0,
            "dislikeCount": 0,
            "liked": false,
            "disliked": false,
          };
          handleComment(newComment);
        }}>Comment</button>
        </div>
        <div className='h-80 overflow-y-scroll'>
                {comments.map((item, index) => (
                    item.postId === data.id ?
                    <Comment key={`g_${item.id}`} commentData={item}/> 
                    :
                    null
                )) }
        </div>
      </div>
  )
}

export default memo(GalleryPost)