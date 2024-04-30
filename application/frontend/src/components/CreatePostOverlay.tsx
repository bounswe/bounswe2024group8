import PostForm from './PostForm';
import React from 'react';
import './CreatePostOverlay.css';


interface CreatePostOverlayProps {
  show: boolean;
  onClose: () => void;
}


const CreatePostOverlay: React.FC<CreatePostOverlayProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content" onClick={e => e.stopPropagation()}>
      <button className="close-button" onClick={onClose}>×</button>
      <h2 >Create Post</h2>
      <PostForm onClose={onClose} />
    </div>

</div>
  );
}

export default CreatePostOverlay;
