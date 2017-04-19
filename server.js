const express = require('express');
const app = express();
const morgan = require('morgan');
const {BlogPosts} = require('./models');
const port = 8080;

app.listen(3000, () => {console.log('heelo!')});