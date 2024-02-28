const crypto = require('crypto');
const { generateToken } = require('../lib/auth');
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

exports.handleUserSignin =  async (req, res) => {
    const { email, password } = req.body;

    // verify if email is valid or not.
    const userInDb = await User.findOne({email});


    // if not a valid user
    if(!userInDb){
        return res.status(401).json({ error: `user with email ${email} not found!`});
    }

    // get salt in db
    const salt = userInDb.salt;
    const passwordInDb = userInDb.password

    // regenerate the password using the salt from in db.
    // if the old password match with new password then the generated hash will be same.
    const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex'); 

    if(hashedPassword !== passwordInDb) {
        return res.json({ message: 'Incorrect email or password!'})
    }
 
    const token = generateToken(({_id:userInDb._id, blah:"auth"}));

    return res.json({ status: 'success', data: {token}});

}