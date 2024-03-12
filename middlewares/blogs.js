exports.ensureAuthenticated = (req,res, next) => {
    if(!req,user) {
        res.status(401).error({message: "you don't hvae permissions"});
    }
    return next();
}