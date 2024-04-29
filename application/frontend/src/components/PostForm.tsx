import React, { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Post submitted! Check the console for details.');
    onClose();
  };

  return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <label>
          Title:
          <input
            type="text"
            name="title"
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
            value={postData.content}
            onChange={handleTextAreaChange}
            required
          />
        </label>
        <br />
        <label>
          Image (optional):
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Tag:
          <input
            type="text"
            name="tag"
            value={postData.tag}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">
          Submit Post

        </button>
      </form>
  );
};

export default PostForm;
