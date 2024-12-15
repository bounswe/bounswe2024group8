import React, { useEffect, useState } from 'react'
import { DPost } from '../interfaces';
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import { Pagination, Skeleton } from 'antd';
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import styles from "./GenericFeed.module.css";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


const GenericFeed = () => {
    const [postData, setPostData] = useState<DPost[]>([]);
    const [feedLoading, setFeedLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const passedPageNumber = searchParams.get("p") ?? "";
    let pageNumber = 1;
    if (/^\d+$/.test(passedPageNumber)){
        pageNumber = parseInt(passedPageNumber);
    }
    const pageSize = 3;

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

    const changePage = (x: number) => {
        window.location.href = `/home?p=${x}`;
    }

    const renderTabs  = () => {
        return(
            <div className='flex justify-center items-center m-5'>
                <Pagination total={postData.length} current={pageNumber} pageSize={pageSize} onChange={changePage}/>
            </div>
        )
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
            (postData.slice((pageNumber-1)* pageSize, pageNumber*pageSize).map((item, index) => (
                item.isVisualPost ?
                <GalleryPost  key={`g_${item.postId}`} postData={item}/> 
                :
                <DiscussionPost  key={`d_${item.postId}`} postData={item} />
                ))
            )
            }
            {!feedLoading && postData.length != 0 && renderTabs()}
        </div>
    )
}

export default GenericFeed