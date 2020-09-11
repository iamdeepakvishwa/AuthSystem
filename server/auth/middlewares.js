const jwt = require('jsonwebtoken');

const checkTokenSetUser = (req,res,next)=>{
    const authHeader = req.get('Authorization');
    if(authHeader){
        const token = authHeader.split(' ')[1];
        if(token){
            jwt.verify(token,process.env.TOKEN_SECRET,(error,user)=>{
                if(error){
                    console.log(error);
                }
                req.user = user;
                next();
            })
        }else{
            next();
        }
    }else{
        next();
    }
}

const isLoggedin = (req,res,next)=>{
    if(req.user){
        next();
    }else{
        const error = new Error("Un-Authrized Access");
        res.status(401);
        next(error);
    }
}


module.exports = {
    checkTokenSetUser,
    isLoggedin,
}