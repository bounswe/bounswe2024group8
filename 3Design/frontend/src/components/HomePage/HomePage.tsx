import React, { useLayoutEffect, useState } from 'react'
import styles from "./HomePage.module.css"
import PageHeader from '../PageHeader/PageHeader'
import SideBar from '../SideBar/SideBar'
import { Button, Upload } from 'antd'
import { Add, UploadOutlined } from '@mui/icons-material'
import { Dialog, TextField } from '@mui/material'
import CreatePost from '../CreatePost/CreatePost'
import GalleryPost from '../GalleryPost/Clickable/GalleryPost'
import Feed from '../Feed/Feed'
import { useLocation, useParams } from 'react-router-dom'
import GenericFeed from '../GenericFeed/GenericFeed'
const HomePage = () => {
    const [createPost, setPostDialog] = useState(false);
    const { id } = useParams();

    const passedId = id || "";
    const passedPageNumber = useLocation().search.split("=")[1] ?? "";
    let pageNumber = 1;
    if (/^\d+$/.test(passedPageNumber)){
        pageNumber = parseInt(passedPageNumber);
    }
    useLayoutEffect(() => {
        if (!localStorage.getItem("jwt_token")) {
            window.location.href = "/login";
        }
    },[])

    return (
        <>
            <PageHeader/>
            <div className='flex'>
                <SideBar active={passedId}/>
                {!passedId ? <GenericFeed pageNumber={pageNumber}/> : <Feed pageNumber={pageNumber} category={passedId}/>}
                
            </div>
            <Button onClick={() => setPostDialog(true)} style={{position: "fixed", bottom: "20px", right: "20px"}} type="primary" shape="round" icon={<Add />} size={'large'}>
                Create Post
            </Button>
            <Dialog maxWidth="sm" fullWidth open={createPost} onClose={() => setPostDialog(false)}>
                <CreatePost dialogFunction={setPostDialog}/>
            </Dialog>
        </>
    )
}

export default HomePage