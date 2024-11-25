import React, { useEffect, useState } from 'react'
import { DPost } from '../interfaces';
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import { Skeleton } from 'antd';
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import styles from "./GenericFeed.module.css";
import axios from 'axios';
interface Props{
pageNumber: number
}

const GenericFeed = ({pageNumber}:Props) => {
    const [postData, setPostData] = useState<DPost[]>([]);
    const [feedLoading, setFeedLoading] = useState(true);

    useEffect(() => {
        fetchPostData();
    }, [])

    const fetchPostData = async () => {
        try{                        
            const postRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/feed`,
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            setPostData(postRes.data);
        }
        catch(e){
        }
        finally{
            setFeedLoading(false);
        }
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
            postData.length == 0 ? 
                <p>Follow categories or users to get recommended posts.</p>
            :
            (postData.map((item, index) => (
                item.isVisualPost ?
                <GalleryPost  key={`g_${item.postId}`} postData={item}/> 
                :
                <DiscussionPost  key={`d_${item.postId}`} postData={item} />
                ))
            )
            }
            
        </div>
    )
}

export default GenericFeed