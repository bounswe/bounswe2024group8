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


const PostPage = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState<DPost | null>(null);

    useEffect(() => {
        setPostData(getPostFromId(id)); 
     }, []);


    if (!id){
        return <div>404</div>;
    }
    if(!postData){
        return <div>Loading</div>;   
    }
    

    return (
    <>
            <PageHeader/>
            <div className='flex'>
                <SideBar active={""}/>
                <div className={styles.mainContainer}>
                    {postData.visual ? 
                    
                        <GalleryPost  postData={postData}/>
                    :
                        <DiscussionPost postData={postData}/> 
                    }
                </div> 
                
            </div>

        
    </>);
}

export default PostPage;