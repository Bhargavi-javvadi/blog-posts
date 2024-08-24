import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/Home">Home</Link>
      <Link to="/posts">All Posts</Link>
      <Link to="/new-post">Add Post</Link>
      
    </div>
  );
};

export default Sidebar;
