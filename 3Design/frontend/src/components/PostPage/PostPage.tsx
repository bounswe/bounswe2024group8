import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostFromId } from "../tsfunctions";
import { useState } from "react";
import { DPost } from "../interfaces";
import GalleryPost from "../GalleryPost/Page/GalleryPost";
import DiscussionPost from "../DiscussionPost/Page/DiscussionPost";
import SideBar from "../SideBar/SideBar";
import PageHeader from "../PageHeader/PageHeader";
import styles from "./PostPage.module.css"
import { Skeleton } from "antd";
import axios from "axios";


const PostPage = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState<DPost | null>(null);
    const [publishedAnnotations, setPublishedAnnotations] = useState([]);

    useEffect(() => {
        fetchPostData();
     }, []);

    const fetchPostData = async () =>{
        try{
            const postRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/${id}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            const annotationRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/annotations/get?postId=${id}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`}
                }
            );
            setPublishedAnnotations(annotationRes.data);
            setPostData({...postRes.data, postId: postRes.data.id});
        }
        catch(e){
            setPublishedAnnotations(require("../../resources/json-files/MockAnnotations.json"));
            setPostData(getPostFromId(id)); 
        }
    } 

    if (!id){
        return <div>404</div>;
    }
    
    return (
    <>
            <PageHeader/>
            <div className='flex'>
                <SideBar active={""}/>
                <div className={styles.mainContainer}>
                    {
                        postData ? 
                        (postData.isVisualPost ? 
                    
                            <GalleryPost publishedAnnotationsProps={publishedAnnotations} postData={postData}/>
                        :
                            <DiscussionPost publishedAnnotationsProps={publishedAnnotations} postData={postData}/> 
                        )    
                        : 
                        <Skeleton active avatar paragraph={{ rows: 4 }} />
                    }
                    
                </div> 
                
            </div>

        
    </>);
}

export default PostPage;