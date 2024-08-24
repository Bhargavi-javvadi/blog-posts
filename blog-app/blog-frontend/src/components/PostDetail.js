import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    author: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        console.log('Post data:', response.data); // Debugging line
        setPost(response.data);
        setFormData({
          title: response.data.title,
          body: response.data.content, // Ensure consistency
          author: response.data.author
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      console.log('Sending delete request for ID:', id);
      const response = await axios.delete(`http://localhost:5000/posts/${id}`);
      console.log('Delete response:', response.data);
      navigate('/posts');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating post with ID:', id);
      const response = await axios.put(`http://localhost:5000/posts/${id}`, formData);
      console.log('Update response:', response.data);
      setPost(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <button className="back-button" onClick={() => navigate('/posts')}>
        &larr; Back to Posts
      </button>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h2>Edit Post</h2>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Body:
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={handleEditToggle}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p><strong>Author:</strong> {post.author}</p>
          <p><strong>Date:</strong> {new Date(post.createdAt).toLocaleString()}</p>
          <p><strong>Body:</strong> {post.content}</p>
          <div className="post-actions">
            <button className="edit-button" onClick={handleEditToggle}>Edit Post</button>
            <button className="delete-button" onClick={handleDelete}>Delete Post</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
