const express = require('express');
const Joi = require('@hapi/joi');


const db = require('../models/models');
const notes = db.get('notes');

const schema = Joi.object().keys({
    title: Joi.string().trim().required(),
    note : Joi.string().trim().required(),
});




const router = express.Router();

router.get('/notes',(req,res)=>{
    notes.find({
        user_id : req.user._id
    }).then(notes=>{
        res.json(notes);
    })
})

router.post('/notes',(req,res,next)=>{
    const result =schema.validate(req.body);
    if(!result.error){
        const note = {
            ...req.body,
            user_id: req.user._id,
        }
        notes.insert(note)
        .then(note=>res.json(note));
    }else{
        const error = new Error(result.error);
        res.status(422);
        next(error);
    }
})

module.exports = router;