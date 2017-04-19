const express = require('express') ;
const router = express.Router();
const jsonParser = require('body-parser').json();

const {BlogPosts} = require('./models');

BlogPosts.create('No Worries', 'Blog about worries', 'J.R.R. Tolkien', 1965);
BlogPosts.create('The Ring', 'spooky ghosts.', 'Mike Williams', 2000);
BlogPosts.create('The Red House', 'about a house.', 'David Copper', 1997);

router.get('/', (req, res) => {
  res.json(BlogPosts.get());  				
});

router.post('/', jsonParser, (req, res) => {
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

module.exports = router;