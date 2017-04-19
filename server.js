const express = require('express');
const app = express();
const morgan = require('morgan');

const getAndPostRouter = require('./get-post-Router');
const deleteAndPutRouter = require('./delete-put-Router');

app.use('/blogposts', getAndPostRouter);
app.use('/blogposts', deleteAndPutRouter);

app.listen(3000, () => {console.log('heelo!')});