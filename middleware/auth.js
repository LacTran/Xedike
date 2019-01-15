function authenticating(req, res, next) {
    console.log('authenticating.....');
    next();
}



function authorizing(userType) {
    console.log("authorizing")
    return (req, res, next) => {
        if (req.user.userType === userType) {
            return next();
        }
        res.status(400).json({ error: "No permission" })
    }
}

module.exports = { authenticating, authorizing }