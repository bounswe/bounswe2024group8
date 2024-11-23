import React, { memo, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { DPost, SendAnnotationData, DComment, DisplayedAnnotationData, RecievedAnnotationData } from '../../interfaces'
import styles from "../GalleryPost.module.css"
import DViewer from '../../DViewer/DViewer'
import { Bookmark, BookmarkBorderOutlined, BorderColor, Download, MoreVert, Shield, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, InsertCommentOutlined } from '@mui/icons-material'
import { Dialog, IconButton, Menu, MenuItem, TextField } from '@mui/material'
import { formatInteractions } from '../../tsfunctions'
import Comment from '../../Comment/Comment'
import MockComments from '../../../resources/json-files/Comments.json'
import ChallengePost from '../../CreatePost/ChallengePost'
import PostAnnotation from '../../Annotations/PostAnnotation'
import { message, Switch } from 'antd'
import axios from 'axios'
interface Props{
  postData: DPost,
  publishedAnnotationsProps: RecievedAnnotationData[]
}

const GalleryPost = ({postData, publishedAnnotationsProps} : Props) => {

  const comments: DComment[] = JSON.parse(localStorage.getItem("comments") || "[]") as DComment[];
  const [data, setData] = useState<DPost>(postData);
  const [modelAppearence, setModelAppearence] = useState<boolean>(false);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const [annotationData, setAnnotationData] = useState<SendAnnotationData>({content: "", endIndex: null, postId: 9, startIndex: null, userId: 1});

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [comment, setComment] = useState("");

  const [challengeDialog, setChallengeDialog] = useState(false);

  const [currentAnnotations, setCurrentAnnotations] = useState<DisplayedAnnotationData[]>([]);
  const [annotationsVisible, setAnnotationsVisible] = useState(false);

  const [annotatedText, setAnnotatedText] = useState("");
  const [annotationSending, setAnnotatingSending] = useState(false);

  const [publishedAnnotations, setPublishedAnnotations] = useState<RecievedAnnotationData[]>(publishedAnnotationsProps);

  const setDisplayedAnnotation = useCallback((x: DisplayedAnnotationData[]) =>{
    setCurrentAnnotations(x);
  }, []);

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
    if (!!annotatedText){
      return;
    }
    const selection = window.getSelection();
    if (!selection){
      return;
    }
    const selectedText = selection.toString();

    if (selectedText && selection.anchorNode && bodyRef.current!.contains(selection.anchorNode)) {
      const startI = selection.anchorOffset;
      const endI = selection.focusOffset;
      console.log(`Start: ${startI} End: ${endI}`);
      setAnnotationData(prev => ({...prev, startIndex: Math.min(startI, endI),endIndex: Math.max(endI, startI)}) );
    } else {
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

  return (
      <div onMouseOut={ !annotationsVisible ? setAnnotation : () => (null)} className="w-full flex gap-2">
        <div className={styles.postPageCard} >
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
                      <MenuItem onClick={() => setChallengeDialog(true)} className='gap-2'>
                          <Shield/>
                          Challenge Post
                      </MenuItem>
                      <MenuItem onClick={startAnnotation} disabled={annotationData.startIndex == null || annotationsVisible} className='gap-2'>
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
            {
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
            <div className='flex items-center mr-0 ml-auto'>
              <Switch checked={annotationsVisible} onChange={(e) => {setAnnotationsVisible(e); setCurrentAnnotations([])}} checkedChildren="Annotations Visible" unCheckedChildren="Annotations Disabled"/>
            </div>
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
                userPoints: 100
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
                      <Comment key={`g_${item.commentId}`} commentData={item}/>
                      :
                      null
                  )) }
          </div>
          <Dialog maxWidth="sm" fullWidth open={challengeDialog} onClose={() => setChallengeDialog(false)}>
                <ChallengePost categoryId={postData.categoryId} dialogFunction={setChallengeDialog} challengedPostId={postData.postId}/>
          </Dialog>
        </div>
        {annotationsVisible && currentAnnotations.length != 0 && 
          <div className={styles.annotationContainer}>
              <div className='flex'>
                  <p className='font-semibold text-lg pt-2'>Annotations</p>
                  <button onClick={() => setDisplayedAnnotation([])} className='btn btn-ghost mr-0 ml-auto'>X</button>
              </div>
              <div className={styles.annotationDataContainer}>
                  {currentAnnotations.map((item, index) => (
                    <div key={`ant_container_${index}`} className={`flex flex-col gap-2 pb-4 ${styles.singleAnnotationContainer}`}>
                      <a className='text-blue-600' href={`/profile/${item.userId}`}><u>{item.username}</u></a>
                      <div className={`${styles.ellipsis} font-bold`} title= {`Annotated text: "${item.annotatedText}"`}>Annotated text: "{item.annotatedText}"</div>
                      <p>{item.annotation}</p>
                    </div>
                  ))}
              </div>
          </div>}
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
      </div>
  )
}

export default memo(GalleryPost)