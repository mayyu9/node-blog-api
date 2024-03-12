const JWT = require('jsonwebtoken');

const JWT_SECRET = "@thakur@msd@24";

exports.generateToken = (data) => {
    const payload = JSON.stringify(data);
    const token =   JWT.sign(payload, JWT_SECRET);
    return token
}


exports.validateToken = (token) => {
    try{
        const data = JWT.verify(token, JWT_SECRET);
        return JSON.parse(data);
    } catch(err) {
        return null;
    } 
}