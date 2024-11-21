import React, { useEffect, useState } from 'react'
import styles from "./SearchResults.module.css";
import { useParams } from 'react-router-dom';
import { DPost } from '../interfaces';
import { Skeleton } from 'antd';
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import SideBar from '../SideBar/SideBar';
import PageHeader from '../PageHeader/PageHeader';

const SearchResults = () => {
    const {query} = useParams();
    const [searchResults, setSearchResults] = useState<DPost[]>([]);
    const [searchLoading, setSearchLoading] = useState(true);

    if (!query){
        window.location.href = "/home";
    }

    useEffect(() => {
        fetchPostData();
    }, [])

    const fetchPostData = async () => {
        // AJAX Request

        const data = require("../../resources/json-files/MockGenericPosts.json");
        setSearchResults(data);
        setSearchLoading(false);

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