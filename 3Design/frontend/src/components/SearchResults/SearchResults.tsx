import React, { useEffect, useState } from 'react'
import styles from "./SearchResults.module.css";
import { useParams } from 'react-router-dom';
import { DPost } from '../interfaces';
import { Skeleton } from 'antd';
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import SideBar from '../SideBar/SideBar';
import PageHeader from '../PageHeader/PageHeader';
import axios from 'axios';

const SearchResults = () => {
    const {query} = useParams();
    const [searchResults, setSearchResults] = useState<DPost[]>([]);
    const [searchLoading, setSearchLoading] = useState(true);

    if (query == undefined || query == null){
        window.location.href = "/home";
    }

    useEffect(() => {
        fetchPostData();
    }, [])

    const fetchPostData = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts?param=${query}`, {
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
                            <p className='font-bold text-xl'>Results for: {query}</p>
                        </div>    
                    </div>
                    { searchLoading ? 
                    (
                        <div className={styles.spinnerContainer}>
                            <Skeleton active avatar paragraph={{ rows: 4 }} />
                        </div>
                    ) : 
                        searchResults.length == 0 ? 
                        <p>No results for this query</p> :
                        searchResults.map((item, index) => (
                            item.isVisualPost ?
                            <GalleryPost  key={`g_${item.isVisualPost}`} postData={item}/> 
                            :
                            <DiscussionPost  key={`d_${item.isVisualPost}`} postData={item} />
                        )) 
                    }           
                </div>
                
            </div>
            
        </>
       
    )
}

export default SearchResults