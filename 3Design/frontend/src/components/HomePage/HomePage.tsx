import React, { useState } from 'react'
import styles from "./HomePage.module.css"
import PageHeader from '../PageHeader/PageHeader'
import SideBar from '../SideBar/SideBar'
import { Button, Upload } from 'antd'
import { Add, UploadOutlined } from '@mui/icons-material'
import { Dialog, TextField } from '@mui/material'
import CreatePost from '../CreatePost/CreatePost'
import GalleryPost from '../GalleryPost/GalleryPost'
import Feed from '../Feed/Feed'
import { useParams } from 'react-router-dom'
const HomePage = () => {
    const [createPost, setPostDialog] = useState(false);
    const { id } = useParams();

    const passedId = id || "";

    return (
        <>
            <PageHeader/>
            <div className='flex'>
                <SideBar active={passedId}/>
                <Feed/>
            </div>
            <Button onClick={() => setPostDialog(true)} style={{position: "fixed", bottom: "20px", right: "20px"}} type="primary" shape="round" icon={<Add />} size={'large'}>
                Create Post
            </Button>
            <Dialog maxWidth="sm" fullWidth open={createPost} onClose={() => setPostDialog(false)}>
                <CreatePost dialogFunction={setPostDialog} category=''/>
            </Dialog>
        </>
    )
}

export default HomePage