



class Handle {

    isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect("/");
        }
        return next();
    }

    isAdmin = (req, res, next) => {
        if (req.user.isAdmin === "Admin") {
            next();
        } else {
            res.redirect("/404")
        }
    }
}


module.exports = new Handle();