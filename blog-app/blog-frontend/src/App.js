import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Home from './components/Home';
import NewPost from './components/NewPost'; // Import NewPost component for adding posts
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, timeAdded: new Date().toLocaleString() }]);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/new-post" element={<NewPost addPost={addPost} />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
