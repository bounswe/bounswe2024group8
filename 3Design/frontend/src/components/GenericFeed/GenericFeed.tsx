import React, { useEffect, useState } from 'react'
import { DPost } from '../interfaces';
import GalleryPost from '../GalleryPost/GalleryPost';
import { Skeleton } from 'antd';
import DiscussionPost from '../DiscussionPost/DiscussionPost';
import styles from "./GenericFeed.module.css";
const GenericFeed = () => {
    const [postData, setPostData] = useState<DPost[]>([]);
    const [feedLoading, setFeedLoading] = useState(true);

    useEffect(() => {
        fetchPostData();
    }, [])

    const fetchPostData = async () => {
        // AJAX Request

        const data = require("../../resources/json-files/MockGenericPosts.json");
        setPostData(data);
        setFeedLoading(false);

    }

    return (
            
        <div className={`flex flex-col gap-4 ${styles.mainContainer} p-4`}>
            <div className='flex flex-col gap-6'>
                <div>
                    <p className='font-bold text-xl'>For You</p>
                </div>    
            </div>
            { feedLoading ? 
            (
                <div className={styles.spinnerContainer}>
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
            ) : 
                postData.map((item, index) => (
                    item.visual ?
                    <GalleryPost key={item.id} postData={item}/> :
                    <DiscussionPost key={item.id} postData={item} />
                )) 
            }
            
        </div>
    )
}

export default GenericFeed