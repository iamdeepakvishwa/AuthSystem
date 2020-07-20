const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

const router = express.Router();

const db = require('../models/models');


const users = db.get('users');
users.createIndex('username', { unique: true });



const schema = Joi.object().keys({
	name: Joi.string().regex(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/),
	username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30),
	email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
	password: Joi.string().trim().min(6).required(),
});



router.get('/', (req, res) => {
    res.json({
      message: '🦄🌈✨Hello World!  🌈✨🦄'
    });
});

router.post('/signup',(req,res,next)=>{
    const result = schema.validate(req.body);
    if (!(result.error)) {
      users.findOne({$or: [
        {email: req.body.email},
        {username: req.body.username}
    ]}).then(user => {
        // if user is undefined, username is not in the db, otherwise, duplicate user detected
        if (user) {
          // there is already a user in the db with this username...
          // respond with an error!
          const error = new Error('That username is taken. Please choose another one.');
          res.status(409);
          next(error);
        }else if(email){
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
              res.json(insertedUser);
            });
          });
        }
      });
    } else {
      res.status(422);
      next(result.error);
    }
})

module.exports = router;
