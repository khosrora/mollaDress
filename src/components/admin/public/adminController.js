



class adminController {

    async home(req, res) {
        try {
            return res.render("admin/home.ejs", {
                title: "پنل مدیریت",
                breadCrumb: "پنل مدیریت",
                error: req.flash("error"),
            })
        } catch (err) {
            console.log(err.message);
        }
    }

}
module.exports = new adminController;