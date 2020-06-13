const jwt = require('jsonwebtoken');


function auth(req, res, next) {

    const token = req.header('cus_auth');

    if(!token){
        return res.status(401).json({ msg : "No Token, Access Denied"});
    }

    try {

        //verify token
        const decoded = jwt.verify(token, "secret");

        //add customer
        req.user = decoded;
        next();


    } catch (e) {
        res.status(400).json({ msg : "Token Invalid"})
    }

}

module.exports = auth;