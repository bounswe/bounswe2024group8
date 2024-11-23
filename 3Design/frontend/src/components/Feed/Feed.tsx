import React, { useEffect, useState } from 'react'
import { DPost } from '../interfaces'
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import styles from "./Feed.module.css"
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import { Skeleton } from 'antd';
import { getCategoryById } from '../tsfunctions';
import axios from 'axios';

interface Props{
    category: string,
    pageNumber: number
}

const Feed = ({category, pageNumber}: Props) => {
    const [postData, setPostData] = useState<DPost[]>([]);
    const [feedType, setFeedType] = useState(true);
    const [feedLoading, setFeedLoading] = useState(true);
    const [tabConfig, setTabConfig] = useState([0, 0]);

    useEffect(() => {
        fetchPostData();
    }, [feedType])


    const fetchPostData = async () => {
        // AJAX Request with category
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/category/${category}/nonvisual`,
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            console.log(res.data);
        }
        catch(e){
            console.log(e);
        }
        if (feedType){
            const data = require("../../resources/json-files/MockPosts.json");
            setPostData(data.slice(2*(pageNumber-1), 2*pageNumber));
            setFeedLoading(false);
            return;
        }
        const data : DPost[] = require("../../resources/json-files/MockDiscussions.json");
        setPostData(data.slice(2*(pageNumber-1), 2*pageNumber));
        setFeedLoading(false);

    }

    const changePostData = (newPost: DPost,index: number) => {
        setPostData(prev => {
            const clone = [...prev];
            clone[index] = newPost;
            return clone;
        })
    }
    
    const changeFeedType = (x : boolean) => {
        if (x == feedType){
            return;
        }
        setFeedLoading(true);
        setFeedType(x);
    }

    const renderTabs  = () => {
        return null;
    }


    return (
            
        <div className={`flex flex-col gap-4 ${styles.mainContainer} p-4`}>
            <div className='flex flex-col gap-6'>
                <div>
                    <p className='font-bold text-xl'>{getCategoryById(category)} - {feedType ? "Gallery" : "Discussion"}</p>
                </div>
                <div className='flex gap-8 justify-start'> 
                    <button className='btn btn-neutral' style={!feedType ? {background: "#ffffff", color: "black"} : {background: "#d0d0d0", color: "black"}} onClick={() => changeFeedType(true)}>Gallery</button>
                    <button className='btn btn-neutral' style={feedType ? {background: "#ffffff", color: "black"} : {background: "#d0d0d0", color: "black"}} onClick={() => changeFeedType(false)}>Discussion</button>
                </div>         
            </div>
            { feedLoading ? 
            (
                <div className={styles.spinnerContainer}>
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
            ) : 
            postData.length == 0 ? 
                <p>There are currently no posts here.</p>
            :
            (feedType ? 
                    postData.map((item, index) => (
                        <GalleryPost  key={item.postId} postData={item}/>
                    )) : 
                    postData.map((item, index) => (
                        <DiscussionPost  key={item.postId} postData={item}/>
                    ))
            )        
            }
            {!feedLoading && postData.length != 0 && renderTabs()}
            
        </div>
    )
}

export default Feed