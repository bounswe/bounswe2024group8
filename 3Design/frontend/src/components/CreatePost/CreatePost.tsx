import { UploadOutlined,AddCircleOutline,Clear } from '@mui/icons-material'
import { CircularProgress, Dialog, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Button, GetProp, message, Upload, UploadFile, UploadProps } from 'antd'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Category, DesignProperty } from '../interfaces'
import axios, { AxiosError } from 'axios'
import { limitPostBodies, mergePostString } from '../tsfunctions'

const categories:Category[] = require('../../resources/json-files/Categories.json');
interface Props{
    dialogFunction: React.Dispatch<SetStateAction<boolean>>
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const CreatePost = ({dialogFunction} : Props) => {
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");

    const [category, setCategory] = useState(categories[0].id);

    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");

    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState("");

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [joinToTournament, setTournament] = useState(false);

    const [designProperties, setDesignProperties] = useState<DesignProperty[]>(require("../../resources/json-files/DesignProperties.json"));
    const [propertyWindow, setPropertyWindow] = useState(false);

    const [creatingPost, setCreating] = useState(false);

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
        setCreating(true);
        try{

            const fd = new FormData();
            const isVisual = fileList.length == 1;
            if (joinToTournament && !isVisual){
                message.error("You must add a 3D Model to your post to joining the tournament.");
                return;
            }
            const tagString = tags.join(", ");
            const fixedCategory = `${category}`;
            let fixedContent = content;
           
            if (isVisual){
                const stringLst = [fixedContent];
                for (let prop of designProperties){
                    if (prop.value != ""){
                        stringLst.push(`${prop.property} : ${prop.value}`);
                    }
                }
                fixedContent = mergePostString(stringLst);
            }
            
            fd.append("title", title);
            fd.append("text", fixedContent);
            fd.append("categoryId", fixedCategory);
            fd.append("isVisualPost", isVisual ? "true" : "false");
            fd.append("tags", tagString);   
            isVisual && fd.append("file", fileList[0] as FileType);
            fd.append("joinToTournament", joinToTournament ? "true": "false");
            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/posts`, fd, {
                headers: {Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,}
            })
            message.success("Your post is successfully created.");
            setTimeout(() => {
                window.location.href = `/home/${fixedCategory}`;
            }, 500);
        }
        catch(e){
            if (e instanceof AxiosError && e.response && e.response.data && e.response.data.message && e.response.status != 500){
                message.error(e.response.data.message);
            }
            else{
                message.error("Something went wrong");
            }
            setCreating(false);

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
            <div className='flex '>
                <FormControl className='w-4/6'>
                    <InputLabel id="categoryLabel">Category</InputLabel>
                    <Select label='Category' labelId='categoryLabel' value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className='w-2/6 flex items-center flex-col'>
                    <p>Join To Tournament</p>
                    <input onChange={(e)=>setTournament(e.target.checked)} type='checkbox' checked={joinToTournament} className='checkbox'/>
                </div>
            </div>
            
            <TextField minRows={4} multiline label="Content" error={!!contentError} helperText={contentError} value={content} onChange={(e) => {
                if (limitPostBodies(e.target.value)){
                    return;
                }
                setContentError("");
                setContent(e.target.value);
            }}/>
            <div>
                <div className='flex gap-2'>
                    <TextField sx={{width: "50%"}} value={currentTag} onKeyDown={(e) =>
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
                    <div className='flex flex-col gap-2 overflow-y-scroll max-h-40 w-1/2 items-end'>
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
            <Button onClick={() => setPropertyWindow(true)} disabled={fileList.length == 0} type='primary' className='w-1/2'>Design Properties</Button>
            <div className='flex gap-2 mr-0 ml-auto'>
                <button className='btn btn-outline' onClick={() => dialogFunction(false)}>Cancel</button>
                <button disabled={creatingPost} onClick={sendPost} className='btn btn-primary' >Create Post</button>
                {creatingPost && <CircularProgress style={{fontSize: "8px"}}/>}
            </div>
            <Dialog maxWidth="sm" fullWidth open={propertyWindow}>
                <div className='flex flex-col p-4 gap-4'>
                    <p className='font-bold text-lg'>Design Properties</p>
                    {designProperties.map((item,index) => (
                        item.options.length == 0 ? 
                        <TextField
                        className='w-5/6'
                        label={item.property}
                        value={item.value} onChange={e => setDesignProperties(prev => {
                            const temp = [...prev];
                            temp[index] = {...temp[index], value: e.target.value};
                            return temp;
                        })
                        }
                        /> :
                        <FormControl className='w-5/6'>
                            <InputLabel id={`prop_${index}`}>{item.property}</InputLabel>
                            <Select label={item.property} labelId={`prop_${index}`} value={item.value} onChange={e => setDesignProperties(prev => {
                                const temp = [...prev];
                                temp[index] = {...temp[index], value: e.target.value};
                                return temp;
                            })}>
                                {item.options.map((c, i) => <MenuItem key={i} value={c}>{c}</MenuItem>)}
                            </Select>
                        </FormControl>
                    ))}
                    <div className='flex justify-end'>
                     <button className='btn btn-outline' onClick={() => setPropertyWindow(false)}>Done</button>
                    </div>
                </div>
            </Dialog>
        </div>

    )
}

export default CreatePost