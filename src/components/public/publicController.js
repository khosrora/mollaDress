// * helper
const controller = require('../../helper/controller');


class publicController extends controller {
    // ? desc ==> home page
    // ? path ==> /page
    async home(req, res) {
        return res.render("public/home.ejs", {
            title: "صفحه اصلی",
            breadCrumb: "صفحه اصلی",
            path: "/",
        })
    }
    // ? desc ==> home page
    // ? path ==> /login
    async getLoginPage(req, res) {
        return res.render("public/auth/login.ejs", {
            title: "ورود به وب سایت",
            breadCrumb: "ورود به وب سایت",
            path: "/login",
            message: req.flash("success_msg"),
            error: req.flash("error"),
        })
    }
    // ? desc ==> home page
    // ? path ==> /register
    async getRegisterPage(req, res) {
        return res.render("public/auth/register.ejs", {
            title: "ثبت نام در وب سایت",
            breadCrumb: "ثبت نام در وب سایت",
            path: "/register",
            error: req.flash("error"),
        })
    }

}
module.exports = new publicController();