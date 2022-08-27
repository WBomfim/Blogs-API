const express = require('express');
const handleErrors = require('./middlewares/handleErrors');

const app = express();

app.use(express.json());

app.use(handleErrors);

module.exports = app;
