import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');

  const getPosts = async () => {
    const { data } = await axios.get('/posts');
    setPosts(data.posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      await axios.post('/create-post', { text: postText });
      setPostText('');
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/delete-post/${postId}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateComment = async (postId, commentText) => {
    try {
      await axios.post(`/create-comment/${postId}`, { text: commentText });
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`/like/${postId}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikePost = async (postId) => {
    try {
      await axios.delete(`/unlike/${postId}`);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog Page</h1>
      <div className="new-post-container">
        <textarea className="new-post-textarea" value={postText} onChange={handlePostTextChange} placeholder="Write a new post..."/>
        <button className="new-post-btn" onClick={handleCreatePost}>Create Post</button>
      </div>
      {posts.map((post) => (
        <div className="post-container" key={post.id}>
          <h2 className="post-text">{post.text}</h2>
          <div className="post-buttons-container">
            <button className="post-delete-btn" onClick={() => handleDeletePost(post.id)}>Delete Post</button>
            <button className="post-like-btn" onClick={() => handleLikePost(post.id)}>Like</button>
            <button className="post-unlike-btn" onClick={() => handleUnlikePost(post.id)}>Unlike</button>
          </div>
          <div className="comment-container">
            <h3 className="comment-title">Comments</h3>
            <ul className="comment-list">
              {post.comments.map((comment) => (
                <li className="comment-text" key={comment.id}>{comment.text}</li>
              ))}
            </ul>
            <div className="new-comment-container">
              <textarea className="new-comment-textarea" value={''} onChange={(event) => handleCreateComment(post.id, event.target.value)} placeholder="Write a comment..."/>
              <button className="new-comment-btn" onClick={() => handleCreateComment(post.id, '')}>Create Comment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;

