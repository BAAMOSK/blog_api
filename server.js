const express = require('express');
const app = express();
const morgan = require('morgan');

const deleteAndPutRouter = require('./delete-put-Router');



// app.get('/blogposts', (req, res) => {
//   res.json(BlogPosts.get());  				
// });

// app.post('/blogposts', jsonParser, (req, res) => {
// 	const requiredFields = ['title', 'content', 'author', 'publishDate'];
// 	for(let i = 0; i < requiredFields.length; i++) {
// 	  const field = requiredFields[i];
// 		if(!(field in req.body)) {
// 			let message = `You missing the ${field}`;
// 			console.error(message);
// 			return res.status(400).send(message);
// 		}
// 	}
// 	let item = BlogPosts.create(
// 		req.body.title,
// 		req.body.content,
// 		req.body.author,
// 		req.body.publishDate
// 	);
// 	res.status(201).json(item);
// });

//-------------------------------------------------------------------

app.use('/blogposts', deleteAndPutRouter);


app.listen(3000, () => {console.log('heelo!')});











