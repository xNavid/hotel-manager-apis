// Require files and config
const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const roomRouter = require('./routers/room');
const hotelRouter = require('./routers/hotel');
const app = express();

// Use necerray files and functions
app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.use(hotelRouter);

module.exports = app;