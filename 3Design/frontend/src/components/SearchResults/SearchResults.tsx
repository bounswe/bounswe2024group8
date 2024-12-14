import React, { useEffect, useState } from 'react'
import styles from "./SearchResults.module.css";
import { useParams, useSearchParams } from 'react-router-dom';
import { DPost } from '../interfaces';
import { Pagination, Skeleton } from 'antd';
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import SideBar from '../SideBar/SideBar';
import PageHeader from '../PageHeader/PageHeader';
import axios from 'axios';
import UserDisplayer from './UserDisplayer/UserDisplayer';

interface UserResponse{
    userId : number;
    email : string;
    nickName : string;
    profilePictureUrl : string;
    experience : number;
    isFollowed : boolean;
}

const SearchResults = () => {
    const {query} = useParams();
    const [searchResults, setSearchResults] = useState<DPost[]>([]);
    const [searchLoading, setSearchLoading] = useState(true);
    const [searchType, setSearchType] = useState(true);
    const [userResults, setUserResults] = useState<UserResponse[]>([]);

    const [searchParams] = useSearchParams();
    const passedPageNumber = searchParams.get("p") ?? "";
    let pageNumber = 1;
    if (/^\d+$/.test(passedPageNumber)){
        pageNumber = parseInt(passedPageNumber);
    }
    const pageSize = 3;

    if (query == undefined || query == null){
        window.location.href = "/home";
    }

    useEffect(() => {
        fetchData();
    }, [searchType])

    const fetchData = async () => {
        setSearchLoading(true);
        if (!searchType){
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/search?keyword=${query}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                    }
                });
                setUserResults(res.data);
            }
            catch(e){
    
            }
            finally{
                setSearchLoading(false);
                return;
            }
        }
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

    const searchTypeHandler = (x: boolean) => {
        if (searchType == x){
            return;
        }
        setSearchType(x);
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
                        <div className='flex gap-8 justify-start'> 
                            <button className='btn btn-neutral' style={!searchType ? {background: "#ffffff", color: "black"} : {background: "#d0d0d0", color: "black"}} onClick={() => searchTypeHandler(true)}>Posts</button>
                            <button className='btn btn-neutral' style={searchType ? {background: "#ffffff", color: "black"} : {background: "#d0d0d0", color: "black"}} onClick={() => searchTypeHandler(false)}>Users</button>
                        </div>     
                    </div>
                    { searchLoading ? 
                    (
                        <div className={styles.spinnerContainer}>
                            <Skeleton active avatar paragraph={{ rows: 4 }} />
                        </div>
                    ) : 
                    searchType ?
                        (
                        searchResults.length == 0 ? 
                        <p>No post results for this query</p> :
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
                        ) :
                        (
                            userResults.length == 0 ? 
                            <p>No user results for this query</p> :
                            userResults.map((item, index) => (
                                <UserDisplayer data={item}/>
                            ))
                        )
                    }           
                </div>
                
            </div>
            
        </>
       
    )
}

export default SearchResults