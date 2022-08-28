const express = require('express');
const handleErrors = require('./middlewares/handleErrors');
const loginRouter = require('./routes/login');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use(handleErrors);

module.exports = app;
