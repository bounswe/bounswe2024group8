import React, { useEffect, useState } from 'react'
import styles from "./TagSearchResults.module.css";
import { useParams, useSearchParams } from 'react-router-dom';
import { DPost } from '../interfaces';
import { Pagination, Skeleton } from 'antd';
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import SideBar from '../SideBar/SideBar';
import PageHeader from '../PageHeader/PageHeader';
import axios from 'axios';

interface UserResponse{
    userId : number;
    email : string;
    nickName : string;
    profilePictureUrl : string;
    experience : number;
    isFollowed : boolean;
}

const TagSearchResults = () => {
    const {query} = useParams();
    const [searchResults, setSearchResults] = useState<DPost[]>([]);
    const [searchLoading, setSearchLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const passedPageNumber = searchParams.get("p") ?? "";
    let pageNumber = 1;
    if (/^\d+$/.test(passedPageNumber)){
        pageNumber = parseInt(passedPageNumber);
    }
    const pageSize = 5;

    if (query == undefined || query == null){
        window.location.href = "/home";
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        setSearchLoading(true);
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/tag/${query}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }
            });
            setSearchResults(res.data);
        }
        catch(e){

        }
        finally{
            setSearchLoading(false);
        }

    }


    return (
        <>
            <PageHeader/>
            <div className='flex'>
                <SideBar active=""/>
                <div className={`flex flex-col gap-4 ${styles.mainContainer} p-4`}>
                    <div className='flex flex-col gap-6'>
                        <div>
                            <p className='font-bold text-xl'>Results for tag: {query}</p>
                        </div>   
                    </div>
                    { searchLoading ? 
                    (
                        <div className={styles.spinnerContainer}>
                            <Skeleton active avatar paragraph={{ rows: 4 }} />
                        </div>
                    ) :
                        (
                        searchResults.length == 0 ? 
                        <p>No post results for this tag</p> :
                        <>
                            {searchResults.slice((pageNumber-1)*pageSize, (pageNumber)*pageSize).map((item, index) => (
                                item.isVisualPost ?
                                <GalleryPost  key={`g_${item.postId}`} postData={item}/> 
                                :
                                <DiscussionPost  key={`d_${item.postId}`} postData={item} />
                                ))
                            }
                            <Pagination align='center' pageSize={pageSize} current={pageNumber} total={searchResults.length} onChange={(x)=>window.location.href = `/search/${query}?p=${x}`}/>
                        </>
                        ) 
                    }           
                </div>
                
            </div>
            
        </>
       
    )
}

export default TagSearchResults