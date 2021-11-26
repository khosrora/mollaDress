// *error handler
const { get500 } = require('../../errorHandler');



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
            get500(req, res)
        }
    }

}
module.exports = new adminController;