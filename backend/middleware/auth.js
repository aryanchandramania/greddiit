const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.header('x-auth-token');
        try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData = decoded;
        next();
        } catch(err){
            res.status(401).json({message: "Invalid token"});
            console.error(err);
        }
    }
    catch(err){
        res.status(401).json({message: "User not authorized"});
        console.error(err);
    }
};

module.exports = auth;