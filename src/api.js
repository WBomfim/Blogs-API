const express = require('express');
const handleErrors = require('./middlewares/handleErrors');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const postRouter = require('./routes/post');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

app.use(handleErrors);

module.exports = app;
