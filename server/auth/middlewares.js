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
                console.log("this is request"+JSON.stringify(req.user));
                next();
            })
        }else{
            next();
        }
    }else{
        next();
    }
}


module.exports = {
    checkTokenSetUser,
}