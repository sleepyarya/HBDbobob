import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/Comments.css';

const Comments = () => {
  const [comments, setComments] = useState(() => {
    // Initialize state from localStorage
    const savedComments = localStorage.getItem('loveComments');
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState(() => {
    // Initialize username from localStorage
    return localStorage.getItem('loveUsername') || '';
  });

  // Save comments to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('loveComments', JSON.stringify(comments));
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  }, [comments]);

  // Save username to localStorage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('loveUsername', username);
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && username.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        username: username,
        timestamp: new Date().toISOString(),
        likes: 0
      };
      setComments(prevComments => [comment, ...prevComments]);
      setNewComment('');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleLike = (commentId) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  return (
    <div className="comments-page">
      <Navbar />
      <div className="comments-container">
        <h1>Love Messages</h1>
        <p className="subtitle">Share your love and wishes here 💖</p>
        
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              required
              className="username-input"
            />
          </div>
          <div className="form-group">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your love message..."
              required
              className="comment-input"
            />
          </div>
          <button type="submit" className="submit-btn">
            Send Love Message 💝
          </button>
        </form>

        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <div className="user-info">
                  <span className="username">{comment.username}</span>
                  <span className="timestamp">{formatDate(comment.timestamp)}</span>
                </div>
                <button 
                  onClick={() => handleLike(comment.id)}
                  className="like-btn"
                >
                  ❤️ {comment.likes}
                </button>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="no-comments">
              <p>Be the first to share your love message! 💕</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments; 