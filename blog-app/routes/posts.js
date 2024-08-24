const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET /posts - list all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET /posts/:id - get a specific post
router.get('/:id', getPost, (req, res) => {
  res.json(res.post);
});

// POST /posts - create a new post with image
router.post('/', upload.single('image'), async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
  });

  try {
    const newPost = await post.save();
    console.log('Saved post:', newPost);
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /posts/:id - update a post with image
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (req.body.title != null) post.title = req.body.title;
    if (req.body.content != null) post.content = req.body.content;
    if (req.body.author != null) post.author = req.body.author;
    if (req.file) post.imageUrl = `/uploads/${req.file.filename}`;

    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /posts/:id - delete a post
router.delete('/:id', getPost, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    res.json({ message: 'Deleted Post' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get post by ID
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
  } catch (err) {
    console.error('Error finding post:', err);
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

// POST /posts - create a new post with image
router.post('/', upload.single('image'), async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
  });

  try {
    const newPost = await post.save();
    console.log('Saved post:', newPost);
    res.status(201).json(newPost); // Include imageUrl in response
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
