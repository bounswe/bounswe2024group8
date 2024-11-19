import { UploadOutlined,AddCircleOutline,Clear } from '@mui/icons-material'
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Button, message, Upload, UploadFile } from 'antd'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Category } from '../interfaces'

const categories:Category[] = require('../../resources/json-files/Categories.json');
interface Props{
    dialogFunction: React.Dispatch<SetStateAction<boolean>>
}

const CreatePost = ({dialogFunction} : Props) => {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [category, setCategory] = useState(categories[0].id);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");

    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState("");


    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const validateTitle = () => {
        if (title.length < 5){
            return "Your title must be at least 5 characters.";
        }
        return "";
    }

    const validateContent = () => {
        if (content.length < 10){
            return "Your content must be at least 10 characters.";
        }
        return "";
    }

    const sendPost = async () =>{
        const titleCheck = validateTitle();
        const contentCheck = validateContent();

        if (!!titleCheck || !!contentCheck){
            setContentError(contentCheck);
            setTitleError(titleCheck);
            return;
        }
        try{
            //AJAX Request
            message.success("Your post is successfully sent.");
            dialogFunction(false);
        }
        catch(e){
            message.error("Something went wrong");

        }
    }

    return (
        <div className='flex flex-col gap-4 p-4'>
            <p className='font-bold text-lg'>Create New Post</p>
            <TextField label="Title" value={title} error={!!titleError} helperText={titleError} onChange={(e) => {
                if (e.target.value.length > 128){
                    return;
                }
                setTitleError("");
                setTitle(e.target.value);
            }}/>
            <FormControl>
                <InputLabel id="categoryLabel">Category</InputLabel>
                <Select label='Category' labelId='categoryLabel' value={category} onChange={e => setCategory(e.target.value)}>
                    {categories.map((c) => <MenuItem key={c.id} value={c.id}>{c.text}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField minRows={4} multiline label="Content" error={!!contentError} helperText={contentError} value={content} onChange={(e) => {
                if (e.target.value.length > 512){
                    return;
                }
                setContentError("");
                setContent(e.target.value);
            }}/>
            <div>
                <div className='flex gap-2'>
                    <TextField value={currentTag} onKeyDown={(e) =>
                    {
                        if (e.key === "Enter"){
                            if (currentTag.length > 0){
                                setTags([...tags, currentTag]);
                                setCurrentTag("");
                            }
                        }
                    }} label="Add Tag" onChange={(e) => {
                        if(e.target.value.length > 20){
                            return;
                        }
                       setCurrentTag(e.target.value);
                    }}/>
                    <div className='flex flex-col gap-2 overflow-y-scroll max-h-40 w-60 items-end'>
                        {tags.map((tag,index) => <div key={index} className='flex items-center gap-2'>
                            <p>{tag}</p>
                            <IconButton onClick={() => setTags(prev=>{
                                const clone = [...prev];
                                clone.splice(index,1);
                                return clone;
                            })} className='btn btn-outline'><Clear fontSize='small'></Clear></IconButton>
                        </div>)}
                    </div>
                </div>
            </div>
            <Upload accept='.obj,.dae' fileList={fileList} onRemove={(file) => {
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
                if (file.size > 10 * 1024 * 1024){
                    message.error(`You can only upload up to 10 MBs`);
                    return false; 
                }
                const fileExtension = file.name.split('.').pop();
                const allowedExtensions = ["obj", "dae"];
                if (!allowedExtensions.includes(fileExtension ?? "")){
                    message.error(`You can only upload these file extensions: ${allowedExtensions.toString()}`);
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
                <button onClick={sendPost} className='btn btn-primary' >Create Post</button>

            </div>
        </div>

    )
}

export default CreatePost