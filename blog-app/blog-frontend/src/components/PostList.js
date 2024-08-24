import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css'; // Assuming you create a CSS file for styling

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [animatedPostId, setAnimatedPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('There was an error fetching the posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log('Deleting post with ID:', id);
      await axios.delete(`http://localhost:5000/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error('There was an error deleting the post:', error);
    }
  };

  const handleRowClick = (id) => {
    setAnimatedPostId(id);
    setTimeout(() => setAnimatedPostId(null), 1000); // Reset animation state after 1 second
  };

  return (
    <div className="post-list-container">
      <h2 className="post-list-title">All Posts</h2>
      <ul className="post-list">
        {posts.map(post => (
          <li
            key={post._id}
            className={`post-item ${animatedPostId === post._id ? 'blast' : ''}`}
            onClick={() => handleRowClick(post._id)}
          >
            <Link to={`/posts/${post._id}`} className="post-link">
              <div className="post-content">
                <h3 className="post-title">
                  {post.title}
                </h3>
                <span className="post-author">by {post.author}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
