import React, { useEffect, useState } from 'react'
import { DPost } from '../interfaces'
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import styles from "./Feed.module.css"
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import { Skeleton } from 'antd';
import { getCategoryById } from '../tsfunctions';

interface Props{
    category: string,
    pageNumber: number
}

const Feed = ({category, pageNumber}: Props) => {
    const [postData, setPostData] = useState<DPost[]>([]);
    const [feedType, setFeedType] = useState(true);
    const [feedLoading, setFeedLoading] = useState(true);

    useEffect(() => {
        fetchPostData();
    }, [feedType])


    const fetchPostData = async () => {
        // AJAX Request with category
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
            feedType ? 
                    postData.map((item, index) => (
                        <GalleryPost  key={item.id} postData={item}/>
                    )) : 
                    postData.map((item, index) => (
                        <DiscussionPost  key={item.id} postData={item}/>
                    ))
            }
            
        </div>
    )
}

export default Feed