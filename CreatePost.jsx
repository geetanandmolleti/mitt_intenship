import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAiSuggestion } from '../features/ai/aiSlice';
import ReactQuill from 'react-quill'; // Bonus: Rich text editor
import 'react-quill/dist/quill.snow.css';
import './CreatePost.scss';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const dispatch = useDispatch();
  const { suggestion, loading } = useSelector((state) => state.ai);
  const { userInfo } = useSelector((state) => state.auth); // For getting the token

  const handleGenerateClick = () => {
    if (title) {
      dispatch(fetchAiSuggestion({ prompt: title, token: userInfo.token }));
    }
  };
  
  // Appends the AI suggestion to the existing content
  const handleUseSuggestion = () => {
    setContent(content + ' ' + suggestion);
  };

  return (
    <div className="create-post-container">
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Your Amazing Blog Title..."
      />
      <div className="ai-helper">
        <button onClick={handleGenerateClick} disabled={loading === 'pending'}>
          {loading === 'pending' ? 'Generating...' : '✨ Generate Intro with AI'}
        </button>
        {suggestion && (
          <div className="suggestion-box">
            <p>{suggestion}</p>
            <button onClick={handleUseSuggestion}>Use this Suggestion</button>
          </div>
        )}
      </div>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      {/* ... rest of the form for tags, image upload, and submit button ... */}
    </div>
  );
};

export default CreatePost;
