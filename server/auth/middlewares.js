const jwt = require('jsonwebtoken');

function checkTokenSetUser (req,res,next){
    const authHeader = req.get('Authorization');
    //console.log(authHeader);
    if(authHeader){
        const token = authHeader.split(' ')[1];
        //console.log(token);
        if(token){
            jwt.verify(token,process.env.TOKEN_SECRET,(error,user)=>{
                if(error){
                    console.log(error);
                }
                //console.log(user);
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