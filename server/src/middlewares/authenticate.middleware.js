const jwt = require("jsonwebtoken")


const authenticate = (req, res, next) => {
     const token = req.headers.authorization;
     if(token){
        const decoded = jwt.verify(token,"masai");
        if(decoded){
            const userID=decoded.userID;
            console.log(decoded)
            req.body.userID=userID;
            next();

        }else{
            res.status(200).send("Please Login First");
        }
     }else{
        res.status(200).send("Please Login First")
     }
}


module.exports = authenticate;