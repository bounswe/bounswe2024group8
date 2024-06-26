import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from "axios";
import "./PostForm.css";
import { useNavigate } from "react-router-dom";


interface PostData {
  title: string;
  content: string;
  teamName:string;
  image?: File | null;
  postedAt:string;
}
interface PostFormProps {
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    teamName:'',
    image: null,
    postedAt: "GLOBAL"
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPostData({ ...postData, image: files ? files[0] : null });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
      setPostData({ ...postData, [name]: value });
    
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('text', postData.content);
    formData.append('postedAt', postData.postedAt);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    };
    
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/users?email=`+localStorage.getItem("email"),config)
      .then((response) => {
        console.log("user get request success");
        console.log(postData.postedAt);
        console.log("hi");
        axios
        .post(`${import.meta.env.VITE_API_URL}/api/v1/posts`, formData,config)
        .then((response) => {
          if (postData.postedAt === "GLOBAL"){
            navigate("/home");
            window.location.reload();
          }
          else{            
            navigate("/community/"+localStorage.getItem("myCommunity"));
            window.location.reload();
          }
          onClose();
        })
        .catch((error) => {
          console.log(postData.postedAt);
          alert("Authentication error");
        });

      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
      <form>
        <label htmlFor='postedAt'/>
        Post To:
        <select
          className='postTo'
          name="postedAt"
          value={postData.postedAt}
          onChange={handleSelectChange}>
          <option>{"GLOBAL"}</option>
          <option>{localStorage.getItem("myCommunity")}</option>
        </select>
        <br/><br/>
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

