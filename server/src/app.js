const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/accountRouter');
const tokensRouter = require('./routes/tokensRouter');
const buildingRouter = require('./routes/buildingRouter');
const appartmentsRouter = require('./routes/appartmentRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const floorTypeRouter = require('./routes/floorTypeRouter');

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static(path.join(__dirname, '../public/img')));

app.use('/api/auth/', accountRouter);
app.use('/api/tokens/', tokensRouter);
app.use('/api/buildings/', buildingRouter);
app.use('/api/appartments/', appartmentsRouter);
app.use('/api/feedbacks/', feedbackRouter);
app.use('/api/floorTypes/', floorTypeRouter);

module.exports = app;
