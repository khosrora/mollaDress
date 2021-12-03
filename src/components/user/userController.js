// * Models
const User = require('../user/model/User');
const Category = require('../admin/categories/model/Category');

// *packages
const passport = require('passport');

// * helper
const controller = require('../../helper/controller');

// *error handler
const { get500 } = require('../errorHandler');

class userController extends controller {

    // ? desc ==> home page
    // ? path ==> /register
    async register(req, res) {
        try {
            // ! get items
            const { fullname, email, mobile, password, captcha } = req.body
            if (!req.body.captcha) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                return this.back(req, res)
            }
            // ! validate 
            await User.userValidate(req.body);
            // ! verify captcha
            await this.recaptchaVerify(captcha);
            // ! find user 
            const user = await User.findOne({ $or: [{ email }, { mobile }] });
            if (user) {
                req.flash("error", "شما ثبت نام کرده اید");
                return this.back(req, res)
            }
            // ! create new User
            const newUser = await User.create({
                fullname, email, mobile, password, mobileActiveCode: this.nanoId(6)
            })
            // ! redirect user
            req.flash("success_msg", "ثبت نام با موفقیت انجام شد");
            res.redirect("/login");

        } catch (err) {
            console.log(err.message);
            req.flash("error", err.message);
            req.flash("formData", req.body);
            return this.back(req, res)
        }
    }

    // ? desc ==> home page
    // ? path ==> /register
    async login(req, res, next) {
        req.flash("formData", req.body)
        try {
            // ! get items
            const { email, password, captcha, remember } = req.body;
            // ! validation
            if (!email || !password) {
                req.flash("error", "لطفا اطلاعات را کامل کنید");
                return this.back(req, res)
            }
            if (!req.body.captcha) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                return this.back(req, res)
            }
            // ! verify captcha
            await this.recaptchaVerify(captcha);
            // ! set session
            if (remember == "on") {
                req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000 * 30;
            } else {
                req.session.cookie.expire = null;
            }
            // !user login
            req.flash("success_msg", "ورود موفقیت آمیز بود")
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
            get500(req, res)
        }
    }

    // ? desc ==> forgot Password user
    // ? path ==> /forgotPass
    async forgotPass(req, res) {
        try {
            // ! get items 
            const { mobile, captcha } = req.body;
            if (!req.body.captcha) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                this.back(req, res)
            }
            // ! verify captcha
            await this.recaptchaVerify(captcha);
            // ! validation
            if (!mobile) {
                req.flash("error", "لطفا  شماه تماس را وارد کنید");
                this.back(req, res)
            }
            // ! find user
            const user = await User.findOne({ mobile });
            if (!user) {
                req.flash("error", "شما ثبت نام نکرده اید");
                this.back(req, res)
            }
            // ! send sms code
            console.log(`کد شما : ${user.mobileActiveCode}`)
            // ! redirect
            req.flash("success_msg", "کد فعال سازی برای شما ارسال شد");
            res.redirect("/changePass")

        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> change Password user
    // ? path ==> /changePass
    async changePass(req, res) {
        try {
            // ! get items 
            const { mobile, code, password, captcha } = req.body;
            if (!req.body.captcha) {
                req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
                this.back(req, res)
            }
            // ! verify captcha
            await this.recaptchaVerify(captcha);
            // ! find user
            const user = await User.findOne({ mobile });
            if (!user) {
                req.flash("error", "شما ثبت نام نکرده اید");
                this.back(req, res)
            }
            // ! validate 
            if (user.mobileActiveCode == code) {
                user.password = password;
                user.mobileActiveCode = this.nanoId(6);
                await user.save();
                // ! send message 
                req.flash("success_msg", "کلمه عبور با موفقیت تغییر یافت");
                return res.redirect("/login")
            } else {
                req.flash("error", "کد وارد شده اشتباه است");
                this.back(req, res)
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> dashboard user
    // ? path ==> /user/dashboard
    async getDashboardUserPage(req, res) {
        try {
            // ! get user
            const categories = await Category.find();
            const user = req.user;

            return res.render("user/index.ejs", {
                title: "پنل کاربری",
                breadCrumb: "پنل کاربری",
                error: req.flash("error"),
                categories,
                user
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> dashboard user
    // ? path ==> /user/addressUser
    async getAddressUserPage(req, res) {
        try {
            // ! get user
            const categories = await Category.find();
            const user = req.user;

            return res.render("user/addressUser.ejs", {
                title: "آدرس های ثبت شده شما",
                breadCrumb: "آدرس های ثبت شده شما",
                error: req.flash("error"),
                categories,
                user
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> dashboard user
    // ? path ==> /user/addressUser
    async AddressUser(req, res) {
        try {
            console.log(req.body);
        } catch (err) {
            console.log(err.message);
        }
    }


}
module.exports = new userController();