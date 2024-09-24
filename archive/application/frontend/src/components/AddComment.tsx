import React, { useState } from "react";
import "./AddComment.css";

interface AddCommentProps {
  postId: number;
  onAddComment: (commentText: string) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText(""); // Clear the textarea after adding the comment
    }
  };

  return (
    <div className="add-comment">
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default AddComment;
