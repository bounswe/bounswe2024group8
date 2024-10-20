import React, { useEffect, useState } from 'react'
import { DPost } from '../interfaces'
import GalleryPost from '../GalleryPost/GalleryPost';
import styles from "./Feed.module.css"
import DiscussionPost from '../DiscussionPost/DiscussionPost';
import { Skeleton } from 'antd';
const Feed = () => {
    const [postData, setPostData] = useState<DPost[]>([]);
    const [feedType, setFeedType] = useState(true);
    const [feedLoading, setFeedLoading] = useState(true);

    useEffect(() => {
        fetchPostData();
    }, [feedType])


    const fetchPostData = async () => {
        // AJAX Request
        if (feedType){
            const data = require("../../resources/json-files/MockPosts.json");
            setPostData(data);
            setFeedLoading(false);
            return;
        }
        const data = require("../../resources/json-files/MockDiscussions.json");
        setPostData(data);
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
        setFeedLoading(true);
        setFeedType(x);
    }


    return (
            
        <div className={`flex flex-col gap-4 ${styles.mainContainer} p-4`}>
            <div className='flex flex-col gap-6'>
                <div>
                    <p className='font-bold text-xl'>{"Category"} - {feedType ? "Gallery" : "Discussion"}</p>
                </div>
                <div className='flex gap-8 justify-start'> 
                    <button className='btn btn-neutral' style={!feedType ? {background: "#f8f4f4", color: "black"} : {}} onClick={() => changeFeedType(true)}>Gallery</button>
                    <button className='btn btn-neutral' style={feedType ? {background: "#f8f4f4", color: "black"} : {}} onClick={() => changeFeedType(false)}>Discussion</button>
                </div>         
            </div>
            { feedLoading ? 
            (
                <div className={styles.spinnerContainer}>
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
            ) : 
            feedType ? 
                    postData.map((item, index) => (
                        <GalleryPost key={item.id} postData={item}/>
                    )) : 
                    postData.map((item, index) => (
                        <DiscussionPost key={item.id} postData={item}/>
                    ))
            }
            
        </div>
    )
}

export default Feed