const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const db = require('../models/models');
const { response } = require('express');


const users = db.get('users');
users.createIndex('username', { unique: true });



const schema = Joi.object().keys({
	name: Joi.string().regex(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/),
	username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
	password: Joi.string().trim().min(6).required(),
});

const schemaLogin = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30),
  password: Joi.string().trim().min(6).required(),
})


function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username
  };

  jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  }, (err, token) => {
    if (err) {
      respondError422(res, next);
    } else {
      res.json({
        token
      });
    }
  });
}

function respondError422(res, next) {
  res.status(422);
  const error = new Error('Unable to login.');
  next(error);
}




router.post('/signup',(req,res,next)=>{
    const result = schema.validate(req.body);
    if (!(result.error)) {
      users.findOne({$or: [
        {email: req.body.email},
        {username: req.body.username}
    ]},(err,user)=>{
        if (user!== null && user.username=== req.body.username) {
            // there is already a user in the db with this username...
            // respond with an error!
            const error = new Error('That username is taken. Please choose another one.');
            res.status(409);
            next(error);
          }else if(user!== null && user.email === req.body.email){
              const error = new Error('That email is taken. Please choose another one.');
              res.status(409);
              next(error);
          } else {
            // hash the password
            bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
              // insert the user with the hashed password
              const newUser = {
                  name: req.body.name,
                  username: req.body.username,
                  email: req.body.email,
                  password: hashedPassword
              };
              users.insert(newUser).then(insertedUser => {
                createTokenSendResponse(insertedUser,res,next);
              });
            });
        }
    })
    } else {
      res.status(422);
      next(result.error);
    }
});

router.post('/login', (req,res,next)=>{
    const result  = schemaLogin.validate(req.body);
    if(!(result.error)){
      users.findOne({
        username: req.body.username
      }).then(user=>{
        if(user){
          bcrypt.compare(req.body.password,user.password).then((result)=>{
            if(result){
              createTokenSendResponse(user, res, next);
            }else{
              const error = new Error('username or password is incorrect');
              res.status(422);
              next(error);
            }
          })
        }else{
          const error = new Error('username or password is incorrect');
          res.status(422);
          next(error);
        }
      })
    }else{
      const error = new Error('Unable to Login ');
      res.status(422);
      next(error);
    }
})


module.exports = router;
