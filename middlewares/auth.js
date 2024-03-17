const { validateToken } = require('../lib/auth')

// function acts as middleware to check if the user is having the token.
// token can be passed as part of header authorisation header
// if the authorisation header is not passed then user is not authenticated return
// else call the next middle to flow.
exports.checkForAuthentication = (req, res, next) => {
    const authorizationHeader = req.headers['Authorization'] || req.headers['authorization'];

    if(!authorizationHeader) {
        req.user = null;
        return next();
    }

    const token = authorizationHeader.split('Bearer ')[1];

    //verify the token, whether it is valid or not.

    const userPayload = validateToken(token);

    req.user = userPayload;
    return next();
}