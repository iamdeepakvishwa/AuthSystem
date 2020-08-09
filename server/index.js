const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const app = express();

const route = require('./auth/index');
const middlewares = require('./auth/middlewares');


app.use(morgan('common'));
app.use(cors({
    origin: 'http://localhost:8080',
}));
app.use(helmet());
app.use(express.json());
app.use(middlewares.checkTokenSetUser);

app.get('/', (req, res) => {
  const body = req;
  console.log("this body is :" +JSON.stringify(body.user));
  res.json({
    message: 'API for GET works',
    user: req.user,
  });
});

app.use('/auth',route);

const notFound =(req,res,next)=> {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

const errorHandler=(err, req, res, next) =>{
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});