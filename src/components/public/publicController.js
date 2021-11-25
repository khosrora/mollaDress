// * helper
const controller = require('../../helper/controller');


class publicController extends controller {
    // ? desc ==> home page
    // ? path ==> /page
    async home(req, res) {
        return res.render("public/home.ejs", {
            title: "صفحه اصلی",
            breadCrumb: "صفحه اصلی",
            message: req.flash("success_msg")
        })
    }
    // ? desc ==> home page
    // ? path ==> /login
    async getLoginPage(req, res) {
        return res.render("public/auth/login.ejs", {
            title: "ورود به وب سایت",
            breadCrumb: "ورود به وب سایت",
            message: req.flash("success_msg"),
            error: req.flash("error"),
            formData: req.flash("formData")[0]
        })
    }
    // ? desc ==> home page
    // ? path ==> /register
    async getRegisterPage(req, res) {
        return res.render("public/auth/register.ejs", {
            title: "ثبت نام در وب سایت",
            breadCrumb: "ثبت نام در وب سایت",
            error: req.flash("error"),
            formData: req.flash("formData")[0]
        })
    }

    // ? desc ==> forgot Password user
    // ? path ==> /forgotPass
    async getForgotPassPage(req, res) {
        return res.render("public/auth/forgotPass.ejs", {
            title: "ارسال کد فراموشی",
            breadCrumb: "ارسال کد فراموشی",
            error: req.flash("error"),
        })
    }


    // ? desc ==> change Password user
    // ? path ==> /changePass
    async getChangePassPage(req, res) {
        return res.render("public/auth/changePass.ejs", {
            title: "بازیابی رمز عبور",
            breadCrumb: "بازیابی رمز عبور",
            error: req.flash("error"),
            message: req.flash("success_msg"),
            formData: req.flash("formData")[0]
        })
    }

}
module.exports = new publicController();