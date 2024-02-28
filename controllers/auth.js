const crypto = require('crypto');
const User = require('../models/user');

exports.handleUserSignup = async (req, res) => {
    
    const {firstName, lastName, email, password} = req.body;
    // add validations to check if the fields are empty 

    try{
        // lets generate a salt for every user, this salt is for hashing.
        const salt = crypto.randomBytes(256).toString('hex');

        // using the salt, hash the password with sha256 algorithm
        const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex')

        // create a db entry, password in the db is hashed value. 
        // we hash the value because this can never be unhashed back.
        const user = await User.create({firstName, lastName, email, salt, password: hashedPassword});
        
        return res.json({status: 'success', data: {_id: user._id }});
    } catch(err) {
        return res.json(err);
    }
    
}