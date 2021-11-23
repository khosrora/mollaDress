



class Handle {

    isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect("/");
        }
        return next();
    }

}


module.exports = new Handle();