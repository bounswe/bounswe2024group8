import { UploadOutlined } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { Button, message, Upload, UploadFile } from 'antd'
import React, { SetStateAction, useState } from 'react'

interface Props{
    dialogFunction: React.Dispatch<SetStateAction<boolean>>,
    category: string

}

const CreatePost = ({dialogFunction, category} : Props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    return (
        <div className='flex flex-col gap-4 p-4'>
            <p className='font-bold text-lg'>Create New Post</p>
            <TextField label="Title" value={title} onChange={(e) => {
                if (e.target.value.length > 128){
                    return;
                }
                setTitle(e.target.value);
            }}/>
            <TextField minRows={4} multiline label="Content" value={content} onChange={(e) => {
                if (e.target.value.length > 512){
                    return;
                }
                setContent(e.target.value);
            }}/>
            <Upload accept='.gbp' fileList={fileList} onRemove={(file) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFileList(newFileList);
            }}
            beforeUpload={(file) => {
                if (fileList.length >= 1){
                    message.error("You can only upload up to 1 file.");
                    return false; 
                }
                setFileList([...fileList, file]);
                return false;
            }}
            >
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <div className='flex gap-2 mr-0 ml-auto'>
                <button className='btn btn-outline' onClick={() => dialogFunction(false)}>Cancel</button>
                <button className='btn btn-primary' >Create Post</button>

            </div>
        </div>

    )
}

export default CreatePost