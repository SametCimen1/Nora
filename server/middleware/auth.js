const jwt = require('jsonwebtoken');
const config = require('../../token');

const verifyToken = (req,res,next) =>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(req.body.token)
    console.log(req.query)
    console.log(req.body)
    if(!token){
        return res.status(403).send("You need a token for auth");
    }
    try {
       const decoded = jwt.verify(token, config);
       req.user = decoded; 
    } catch (error) {
        return res.status(401).send("invalid token")
    }
    return next();
}
module.exports = verifyToken;
