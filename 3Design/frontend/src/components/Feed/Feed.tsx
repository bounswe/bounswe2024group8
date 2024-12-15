import React, { useEffect, useState } from 'react'
import { Category, DPost, Tournament } from '../interfaces'
import GalleryPost from '../GalleryPost/Clickable/GalleryPost';
import styles from "./Feed.module.css"
import DiscussionPost from '../DiscussionPost/Clickable/DiscussionPost';
import { Button, message, Pagination, Skeleton } from 'antd';
import { getCategoryById } from '../tsfunctions';
import axios from 'axios';
import TournamentInfo from '../TournamentInfo/TournamentInfo';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props{
    category: string
}

interface CategoryInfo{
    category: Category |null,
    isFollowed: boolean
}

const Feed = ({category}: Props) => {

    const [searchParams] = useSearchParams();
    const feedType = searchParams.get("type") != "discussion";
    const navigate = useNavigate();
    const pageSize = 3;

    const passedPageNumber = searchParams.get("p") ?? "";
    let pageNumber = 1;
    if (/^\d+$/.test(passedPageNumber)){
        pageNumber = parseInt(passedPageNumber);
    }

    const [postData, setPostData] = useState<DPost[]>([]);

    const [feedLoading, setFeedLoading] = useState(true);
    
    const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>({category: null, isFollowed: false})
    const [followRequesting, setFollowRequesting] = useState(false);

    const [tournamentInfo, setTournamentInfo] = useState<Tournament | null>(null);
    const [tournamentLoading, setTournamentLoading] = useState(true);

    

    useEffect(() => {
        fetchServerData();
    }, [feedType])


    const fetchServerData = async () => {
        fetchFollowData();
        fetchPostData();
        fetchTournamentData();        
    }

    
    const changeFeedType = (x : boolean) => {
        if (x == feedType){
            return;
        }
        setFeedLoading(true);
        if (x){
            window.location.href = `/home/${category}`;
            return;
        }
        window.location.href = `/home/${category}?type=discussion`;
    }

    const changePage = (x: number) => {
        if (feedType){
            window.location.href = `/home/${category}?p=${x}`;
            return;
        }
        window.location.href = `/home/${category}?type=discussion&p=${x}`;
    }

    const renderTabs  = () => {
        return(
            <div className='flex justify-center items-center m-5'>
                <Pagination total={postData.length} current={pageNumber} pageSize={pageSize} onChange={changePage}/>
            </div>
        )
    }

    const fetchPostData = async () => {
        setPostData([]);
        if (feedType){
            try{
                const postRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/category/${category}/visual`,
                    {headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                    }}
                );
                setPostData(postRes.data);  
            }catch(e){

            }
            finally{
                setFeedLoading(false);            
            }
            return;
        }
        try{                        
            const postRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/category/${category}/nonvisual`,
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

    const fetchTournamentData = async () => {
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tournaments/category/${category}`, 
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            )
            setTournamentInfo(res.data);
        }
        catch(e){
            ;
        }
        finally{
            setTournamentLoading(false);
        }
    }

    const fetchFollowData = async () => {
        try{            
            const followRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories/get/${category}`, 
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            setCategoryInfo(followRes.data);
        }
        catch(e){
            console.log(e)
        }
    }

    const handleFollowLogic = async (x: boolean) => {
        setFollowRequesting(true);
        try{
            if (x){
                await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/categories/follow/${category}`, {}, 
                    {headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                    }}
                );
                setCategoryInfo(prev => ({...prev, isFollowed: true}));
                return;
            }
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/categories/unfollow/${category}`, 
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
                }}
            );
            setCategoryInfo(prev => ({...prev, isFollowed: false}));
        }
        catch(e){
            message.error("Something went wrong, your follow status can not be changed.")
        }
        finally{
            setFollowRequesting(false);
        }
    }


    return (
            
        <div className={`flex flex-col gap-4 ${styles.mainContainer} p-4`}>
            <div className='flex flex-col gap-6'>
                <div className='flex'>
                    <p className='font-bold text-xl'>{getCategoryById(category)} - {feedType ? "Gallery" : "Discussion"}</p>
                    {categoryInfo.isFollowed ? 
                    <Button disabled={followRequesting} onClick={() => handleFollowLogic(false)} className='mr-0 ml-auto'>Unfollow Category</Button> :
                    <Button disabled={followRequesting} type='primary' onClick={() => handleFollowLogic(true)} className='mr-0 ml-auto'>Follow Category</Button> 
                    }
                </div>
                {tournamentLoading ? <div style={{height:"75px"}}></div>  : <TournamentInfo showButton={0} info={tournamentInfo}/>}
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
            postData.length == 0 ? 
                <p>There are currently no posts here.</p>
            :
            (feedType ? 
                    postData.slice((pageNumber-1)*pageSize, pageNumber*pageSize).map((item, index) => (
                        <GalleryPost  key={item.postId} postData={item}/>
                    )) : 
                    postData.slice((pageNumber-1)*pageSize, pageNumber*pageSize).map((item, index) => (
                        <DiscussionPost  key={item.postId} postData={item}/>
                    ))
            )        
            }
            {!feedLoading && postData.length != 0 && renderTabs()}
            
        </div>
    )
}

export default Feed