// * Models
const User = require('../user/model/User');
const fetch = require('node-fetch');

// *packages
const passport = require('passport');

// * helper
const controller = require('../../helper/controller');
const nanoId = require('../../helper/nanoId');

class userController extends controller {

    // ? desc ==> home page
    // ? path ==> /register
    async register(req, res) {
        try {
            // ! get items
            const { email, mobile, password, captcha } = req.body
            if (!req.body.captcha) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                return res.redirect("/register");
            }
            // ! validate 
            await User.userValidate(req.body);

            // ! verify captcha
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}`;
            const response = await fetch(verifyUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
                }
            })
            const json = await response.json();
            if (!json.success || json.score < 0.4) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                return res.redirect("/register");
            }
            // ! create new User
            const newUser = await User.create({
                email, mobile, password, mobileActiveCode: nanoId(4)
            })
            // ! send message
            console.log(newUser.mobileActiveCode);
            // ! redirect user
            req.flash("success_msg", "ثبت نام با موفقیت انجام شد");
            res.redirect("/login");

        } catch (err) {
            console.log(err.message);
            req.flash('error', "لطفا اطلاعات وارد شده را چک کنید")
            return res.redirect("/register")
        }
    }

    // ? desc ==> home page
    // ? path ==> /register
    async login(req, res, next) {
        try {
            // ! get items
            const { email, password, captcha, remember } = req.body;
            if (!req.body.captcha) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                return res.redirect("/register");
            }
            // ! verify captcha
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}`;
            const response = await fetch(verifyUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
                }
            });
            const json = await response.json();
            if (!json.success || json.score < 0.4) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                return res.redirect("/register");
            }
            // ! set session
            if (remember == "on") {
                req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000 * 30;
            } else {
                req.session.cookie.expire = null;
            }
            // !user login
            passport.authenticate("local", {
                successRedirect: "/",
                failureRedirect: "/login",
                failureFlash: true
            })(req, res, next);
        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> logout user
// ? path ==> /user/logout
    async logout(req, res) {
        try {
            req.session = null;
            req.logout();
            res.redirect("/")
        } catch (err) {
            console.log(err.message);
        }
    }
}
module.exports = new userController();