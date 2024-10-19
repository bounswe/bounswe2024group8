import React, { useEffect, useState } from 'react'
import { DPost } from '../interfaces'
import GalleryPost from '../GalleryPost/GalleryPost';
import styles from "./Feed.module.css"
const Feed = () => {
    const [postData, setPostData] = useState<DPost[]>([]);
    const [feedType, setFeedType] = useState(true);

    useEffect(() => {
        fetchPostData();
    }, [])


    const fetchPostData = async () => {
        // AJAX Request

        const data = require("../../resources/json-files/MockPosts.json");
        setPostData(data);

    }

    const changePostData = (newPost: DPost,index: number) => {
        setPostData(prev => {
            const clone = [...prev];
            clone[index] = newPost;
            return clone;
        })
    }

    return (
        <div className={`flex flex-col gap-4 items-center ${styles.mainContainer} p-4`}>

            {feedType ? 
            postData.map((item, index) => (
                <GalleryPost index={index} key={item.id} postData={item} changePostData={changePostData}/>
            )) : 
            postData.map(() => (
                <div>

                </div>
            ))
            } 
        </div>
    )
}

export default Feed