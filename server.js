const express = require('express');
const app = express();
const morgan = require('morgan');
const {BlogPosts} = require('./models');
const jsonParser = require('body-parser').json();

BlogPosts.create('The Hobbit', 'This book is long.', 'J.R.R. Tolkien', 1965);

app.get('/blogposts', (req, res) => {
  res.json(BlogPosts.get());  				
});

app.post('/blogposts', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for(let i = 0; i < requiredFields.length; i++) {
	  const field = requiredFields[i];
		if(!(field in req.body)) {
			let message = `You missing the ${field}`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
	let item = BlogPosts.create(
		req.body.title,
		req.body.content,
		req.body.author,
		req.body.publishDate
	);
	res.status(201).json(item);
});

app.listen(3000, () => {console.log('heelo!')});











