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

//-------------------------------------------------------------------

app.delete('/blogposts/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted shopping list item \`${req.params.id}\``);
	res.status(204).end();
});

app.put('/blogposts/:id', jsonParser, (req, res)=> {
	console.log(req.params);
	console.log(req.body);
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
	for(let i = 0; i < requiredFields.length; i++) {
	  const field = requiredFields[i];
		if(!(field in req.body)) {
			let message = `You missing the ${field}`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
		if(req.params.id !== req.body.id) {
			const message = (
      		`Request path id (${req.params.id}) and request body id `
      		`(${req.body.id}) must match`);
    		console.error(message);
    		return res.status(400).send(message);
		}
		console.log(`Updating recipe item \`${req.params.id}\``);
		const updatedItem = BlogPosts.update({
			id: req.params.id,
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			publishDate: req.body.publishDate
		})
		res.status(204).json(updatedItem);
});


app.listen(3000, () => {console.log('heelo!')});











