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


const PostPage = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState<DPost | null>(null);
    const [publishedAnnotations, setPublishedAnnotations] = useState([]);

    useEffect(() => {
        setPostData(getPostFromId(id)); 
        setPublishedAnnotations(require("../../resources/json-files/MockAnnotations.json"));
     }, []);


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
                    
                            <GalleryPost publishedAnnotations={publishedAnnotations} postData={postData}/>
                        :
                            <DiscussionPost postData={postData}/> 
                        )    
                        : 
                        <Skeleton active avatar paragraph={{ rows: 4 }} />
                    }
                    
                </div> 
                
            </div>

        
    </>);
}

export default PostPage;