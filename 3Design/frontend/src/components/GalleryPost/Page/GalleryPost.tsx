import React, { memo, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData, DComment, DisplayedAnnotationData, RecievedAnnotationData } from '../../interfaces'
import styles from "../GalleryPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { ChevronRight,Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, InsertCommentOutlined, Edit, Delete, Tag } from '@mui/icons-material'
import { Chip, CircularProgress, Dialog, IconButton, Menu, MenuItem, TextField } from '@mui/material'
import { formatInteractions,getCategoryById, parsePostString } from '../../tsfunctions'
import Comment from '../../Comment/Comment'
import MockComments from '../../../resources/json-files/Comments.json'
import ChallengePost from '../../CreatePost/ChallengePost'
import PostAnnotation from '../../Annotations/PostAnnotation'
import { grey } from '@mui/material/colors';
import { Button, message, Switch } from 'antd'
import axios, { AxiosError } from 'axios'
import EditPost from '../../CreatePost/EditPost'
interface Props{
  postData: DPost,
  publishedAnnotationsProps: RecievedAnnotationData[]
}

const GalleryPost = ({postData, publishedAnnotationsProps} : Props) => {
  const [data, setData] = useState<DPost>(postData);
  const [parsedString, setParsedString] = useState<string[]>(parsePostString(postData.text));

  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const [annotationData, setAnnotationData] = useState<SendAnnotationData>({content: "", endIndex: null, postId: postData.postId, startIndex: null, userId: parseInt(localStorage.getItem("user_id") ?? "-1")});

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [downloadStatus, setDownloadStatus] = useState(false);

  const [challengeDialog, setChallengeDialog] = useState(false);

  const [currentAnnotations, setCurrentAnnotations] = useState<DisplayedAnnotationData[]>([]);
  const [annotationsVisible, setAnnotationsVisible] = useState(false);

  const [annotatedText, setAnnotatedText] = useState("");
  const [annotationSending, setAnnotatingSending] = useState(false);

  const [annatotionButton, setAnnotationButton] = useState({top: 0, left: 0, show: false});

  const [publishedAnnotations, setPublishedAnnotations] = useState<RecievedAnnotationData[]>(publishedAnnotationsProps);
  const [comments, setComments] = useState<DComment[]>([]);
  const [comment, setComment] = useState("");

  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);

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
            { postId: data.postId, text: newComment.text },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }
            }
        );
        setComment("");
        setData((prev) => ({...prev, comments: prev.comments + 1})); 
    }
    catch(e){
        console.log(e);          
    }
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

  const clickedP = () => {
    setTimeout(() => {
      setAnnotation();
    }, 100);
  }

  const setAnnotation = () =>{
    if (!!annotatedText){
      return;
    }
    const selection = window.getSelection();
    if (!selection){
      setAnnotationButton({top: 0, left: 0, show: false});
      return;
    }
    const selectedText = selection.toString();

    if (selectedText && selection.anchorNode && selection.focusNode && bodyRef.current!.contains(selection.anchorNode) && bodyRef.current!.contains(selection.focusNode)) {
      const startI = selection.anchorOffset;
      const endI = selection.focusOffset;
      console.log(`Start: ${startI} End: ${endI}`);
      const selectionRange = selection.getRangeAt(0);
      const rect = selectionRange.getBoundingClientRect();
      setAnnotationButton({top: rect.top + window.scrollY + rect.height, left: rect.left + window.scrollX + rect.width / 2, show: true});
      setAnnotationData(prev => ({...prev, startIndex: Math.min(startI, endI),endIndex: Math.max(endI, startI)}) );
    } else {
      setAnnotationButton({top: 0, left: 0, show: false});
      setAnnotationData(prev => ({...prev, startIndex: null,endIndex: null}) );
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

  const startAnnotation = () => {
    setAnnotatedText(parsedString[0].slice(annotationData.startIndex!, annotationData.endIndex!));
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
      const refreshedAnnotations = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/annotations/get?postId=${postData.postId}`,
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
    if (comment === ""){
      fetchCommentData();
      }
}, [comment])


const deletePost = async () => {
  setDeletingPost(true);
  try{
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/posts/${data.postId}`, 
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
      }}
    );
    message.success("Your post is successfully deleted.");
    setTimeout(() => {
        window.location.href = `/home/${data.categoryId}`;
    }, 500);
  }catch(e){
    if (e instanceof AxiosError && e.response && e.response.data && e.response.data.message){
        message.error(e.response.data.message);
    }
    else{
        message.error("Something went wrong. Your post cannot be deleted.");
    }
    setDeletingPost(false);
  }
}

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
const fetchCommentData = async () => {
    // AJAX Request with post id
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/comments/post/${data.postId}`,
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
                experience: comment.user.experience,
                profilePictureUrl: comment.user.profilePictureUrl,
                nickName: comment.user.nickName
            },
            likes: comment.likes,
            dislikes: comment.dislikes,
            reactionType: comment.reactionType
        }));
        setComments(comments);
    }
    catch(e){
        console.log(e);
    }

}

  return (
      <div onMouseOut={ !annotationsVisible ? setAnnotation : () => (null)} className="w-full flex gap-2">
        <div className={styles.postPageCard} >
          <div className='flex'>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/profile/${data.user?.id}`;
                    }
                    } style={{ cursor: 'pointer'}}>
                    <img src={data.user?.profilePictureUrl || "/default_pp.png"} className="mr-2 w-12 h-12 rounded-full pixelated" /> 
                    </button>
                    <div className='flex'>
                    <div className="flex items-center mb"> 
                    <button onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/profile/${data.user?.id}`;
                    }
                    } style={{ cursor: 'pointer'}}>
                    <p className="font-bold mr-2 mb-2">{data.user?.nickName}</p>
                    </button>
                    <ChevronRight className='mb-1.5'/>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/home/${data.categoryId}`;
                    }
                    } style={{ cursor: 'pointer'}}>
                    <p className="font-bold ml-1 mb-2">{getCategoryById(data.categoryId.toString())}</p>
                    </button>
                    </div>
                    {data.isVisualPost && data.challengedPostId !== null ?
                    <div className="flex items-center mb-2">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/post/${data.challengedPostId}`;
                    }
                    } style={{ cursor: 'pointer'}} className='flex'>
                    <Shield sx={{ color: grey[500] }} className='ml-5'/>
                    <p style={{ color: grey[500] }} className='ml-2'>Challenged to post</p>
                    </button>
                    </div>: null
                    }
                    </div>
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
                      <MenuItem onClick={() => setChallengeDialog(true)} className='gap-2'>
                          <Shield/>
                          Challenge Post
                      </MenuItem>
                      <MenuItem onClick={startAnnotation} disabled={annotationData.startIndex == null || annotationsVisible} className='gap-2'>
                          <BorderColor/>
                          Annotate
                      </MenuItem>
                      {
                       data.user.id == parseInt(localStorage.getItem("user_id") ?? "-1") && 
                      <MenuItem onClick={() => setEditDialog(true)} className='gap-2'>
                          <Edit/>
                          Edit Post
                      </MenuItem>}

                      {
                       data.user.id == parseInt(localStorage.getItem("user_id") ?? "-1") && 
                      <MenuItem onClick={() => setDeleteDialog(true)} className='gap-2'>
                          <Delete/>
                          Delete Post
                      </MenuItem>}
        
                  </Menu>
              </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='border-gray-500 border-2 non-clickable-div'>
              <DViewer filePath={data.fileUrl!}/>
            </div>

            <p className='font-bold text-lg'>{data.title}</p>
            {
              annotationsVisible ? 
              <div>
                <PostAnnotation annotations={publishedAnnotations} postBody={parsedString[0]} setAnnotationsVisible={setDisplayedAnnotation}/>
                {parsedString.length > 1 && <br></br>}
                {parsedString.slice(1).map((item, index) => (
                  <p className='text-gray-400' key={index}>{item}</p>
                ))}
              </div>
              :
              <div>
                <p ref={bodyRef} onMouseUp={!annotationsVisible ? clickedP : () => (null)}>{parsedString[0]}</p>
                

                {parsedString.length > 1 && <br></br>}
                {parsedString.slice(1).map((item, index) => (
                  <p className='text-gray-400' key={index}>{item}</p>
                ))
                
                }
                
              </div>
            }
            <div className='flex gap-2 pt-5'>
              {data.tags.map((item) => (
                <Chip icon={<Tag/>} label={item} variant='outlined' onClick={() => window.location.href = `/tagsearch/${item}`}/>
              ))}   
            </div>
          </div>
            {annatotionButton.show && !annotationsVisible && (
            <Button
              icon={<BorderColor />}
              type="default"
              style={{
                position: 'absolute',
                top: `${annatotionButton.top}px`,
                left: `${annatotionButton.left}px`,
                transform: 'translateX(-50%)',
                marginTop: '8px',
                zIndex: 10
              }}
              onClick={startAnnotation}
            >
              Annotate
            </Button>
          )}
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
            <div className='flex items-center mr-0 ml-auto'>
              <Switch checked={annotationsVisible} onChange={(e) => {setAnnotationsVisible(e); setCurrentAnnotations([])}} checkedChildren="Annotations Visible" unCheckedChildren="Annotations Disabled"/>
            </div>
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
          <Dialog maxWidth="sm" fullWidth open={challengeDialog} onClose={() => setChallengeDialog(false)}>
                <ChallengePost categoryId={postData.categoryId} dialogFunction={setChallengeDialog} challengedPostId={postData.postId}/>
          </Dialog>
        </div>
        {annotationsVisible && currentAnnotations.length != 0 && 
          <div className={styles.annotationContainer}>
          <div className="flex">
            <p className="font-semibold text-lg pt-2">Annotations</p>
            <button
              onClick={() => setDisplayedAnnotation([])}
              className="btn btn-ghost mr-0 ml-auto"
            >
              ✖
            </button>
          </div>
          <div className={styles.annotationDataContainer}>
            {currentAnnotations.map((item, index) => (
              <div
                key={`ant_container_${index}`}
                className={`flex flex-col gap-2 ${styles.singleAnnotationContainer}`}
              >
                <a
                  className="text-blue-600"
                  href={`/profile/${item.userId.split("/").pop()}`}
                >
                  {item.username}
                </a>
                <div
                  className={styles.ellipsis}
                  title={`Annotated text: "${item.annotatedText}"`}
                >
                  "{item.annotatedText}"
                </div>
                <p>{item.annotation}</p>
              </div>
            ))}
          </div>
        </div>
          }
          <Dialog fullWidth maxWidth="sm" open={!!annotatedText} onClose={() => setAnnotatedText("")}>
            <div className='flex flex-col gap-4 p-4'>
              <p className={`${styles.ellipsis} font-bold`} title={`Annotating Text: ${annotatedText}`}>Annotating Text: {annotatedText}</p>
              <TextField label="Your Annotation" multiline minRows={4} value={annotationData.content} onChange={(e) => {
                if (e.target.value.length > 256){
                  return;
                }
                
                setAnnotationData(prev => ({...prev, content: e.target.value}))
              }}/>
              <div className='flex gap-4 justify-end'>
                <button onClick={() => setAnnotatedText("")} className='btn btn-error'>Close</button>
                <button disabled={annotationSending} onClick={postAnnotation} className='btn btn-outline'>Publish</button>
              </div>    
            </div>
          </Dialog>
          <Dialog maxWidth="sm" fullWidth open={editDialog} onClose={() => setEditDialog(false)}>
              <EditPost dialogFunction={setEditDialog} postData={data}/>
          </Dialog>    
          <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}> 
            <div className='flex flex-col gap-4 p-4'>
              <p className='font-bold text-lg'>Delete Post</p>
              <p>Are you sure? This post will be deleted permanently.</p>
              <div className='flex gap-4 justify-end'>
                <button className='btn btn-outline' onClick={() => setDeleteDialog(false)}>Cancel</button>
                <button disabled={deletingPost} onClick={deletePost} className='btn btn-error' >Delete Post</button>
                {deletingPost && <CircularProgress style={{fontSize: "8px"}}/>}
              </div>
            </div>
          </Dialog>
      </div>
  )
}

export default memo(GalleryPost)