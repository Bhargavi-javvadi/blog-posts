import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPost = ({ addPost }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    author: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Log data being sent
      console.log('Submitting post:', newPost);

      const response = await axios.post('http://localhost:5000/posts', {
        title: newPost.title,
        content: newPost.body, // Ensure this matches backend schema
        author: newPost.author,
      });

      console.log('Response:', response.data); // Log server response
      addPost(response.data); // Add the new post to the state
      navigate('/posts'); // Redirect to All Posts after adding a post
    } catch (error) {
      console.error('There was an error adding the post:', error);
    }
  };

  return (
    <div className="new-post">
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={newPost.body}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newPost.author}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default NewPost;
