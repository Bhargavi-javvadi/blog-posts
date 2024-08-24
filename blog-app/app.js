require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./routes/posts'); // Ensure this import is correct

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // To serve uploaded files
app.use('/posts', postRouter); // Corrected this line to use postRouter

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
