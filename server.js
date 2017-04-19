const express = require('express');
const app = express();
const morgan = require('morgan');
const {BlogPosts} = require('./models');
const port = 8080;

BlogPosts.create({
	title: 'The Hobbit',
	content: 'This book is long.',
	author: 'J.R.R. Tolkien',
	publishDate: 1965
});

app.get('/blogposts', (req, res) => {
  res.json(BlogPosts.get());  				
});


app.listen(3000, () => {console.log('heelo!')});