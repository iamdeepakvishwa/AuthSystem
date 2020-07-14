const express = require('express');
const bcryptjs = require('bcryptjs');

const router = express.Router();
const userEntry = require('../models/models');


router.get('/', (req, res) => {
    res.json({
      message: '🦄🌈✨Hello World!  🌈✨🦄'
    });
});

router.post('/signup',async(req,res,next)=>{
    try{
        const userentries = new userEntry(req.body);
        const createEntry = await userentries.save();
        res.json(createEntry);
    }catch(error){
        next(error);
    }
})

module.exports = router;
