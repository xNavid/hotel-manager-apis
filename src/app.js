const express = require('express');
const userRouter = require('./routers/user');

const app = express();

app.use(userRouter);
app.use(express.json());
module.exports = app;