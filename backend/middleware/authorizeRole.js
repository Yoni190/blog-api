const authorizeRole = (role) => {
    return (req, res, next) => {
        const user = req.authData.user

        if(!user || user.role !== role) {
            return res.sendStatus(403)
        }

        next()
    }
}

module.exports = authorizeRole