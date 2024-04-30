import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from "axios";
import "./PostForm.css"

interface PostData {
  title: string;
  content: string;
  image?: File | null;
  tag: string;
}
interface PostFormProps {
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onClose }) => {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    image: null,
    tag: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPostData({ ...postData, image: files ? files[0] : null });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const postCreateRequest = {   
        userId: "",
        title: postData.title,
        text: postData.content,
        teamName: "GALATASARAY"    
    }
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    };
    
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/users?email=`+localStorage.getItem("email"),config)
      .then((response) => {
        postCreateRequest.userId=response.data.id;

        axios
        .post(`${import.meta.env.VITE_API_URL}/api/v1/posts`, postCreateRequest,config)
        .then((response) => {
          onClose();
        })
        .catch((error) => {
          alert("Authentication error");
        });

      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
      <form>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            placeholder='Add title..'
            value={postData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            name="content"
            placeholder='Share with us..'
            value={postData.content}
            maxLength={150}
            onChange={handleTextAreaChange}
            required
          />
        </label>
        <br/>
        <label>
          Upload Image
          <input
            type="file"
            name="image"
            className='UploadImageInput'
            accept='image/*'
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <button type="submit" className="SubmitButton" onClick={handleSubmit}>
          Submit Post
        </button>
        
      </form>
  );
};

export default PostForm;
