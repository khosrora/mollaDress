// * Model
const User = require('../../user/model/User');
const ContactUs = require('../../user/model/ContactUs');
const Comment = require('../../user/model/Comment');

// *error handler
const { get500 } = require('../../errorHandler');

// * helper
const controller = require('../../../helper/controller');



class usersController extends controller {

    // ? desc ==> get All Users Page
    // ? path ==> /users
    async getAllUsersPage(req, res) {
        try {
            // ! get items
            const users = await User.find();

            return res.render("admin/users/allUsers.ejs", {
                title: "کاربران وب ",
                breadCrumb: "کاربران وب ",
                error: req.flash("error"),
                message: req.flash("success_msg"),
                jalaliMoment: this.jalaliMoment,
                users,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get All Admins Page
    // ? path ==> /admins
    async getAllAdminsPage(req, res) {
        try {
            // ! get items
            const users = await User.find({ isAdmin: "Admin" });

            return res.render("admin/users/allUsers.ejs", {
                title: "کاربران وب ",
                breadCrumb: "کاربران وب ",
                error: req.flash("error"),
                message: req.flash("success_msg"),
                jalaliMoment: this.jalaliMoment,
                users,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get single Users Page
    // ? path ==> /singleUser/:id
    async getSingleUser(req, res) {
        try {
            // ! get items
            const user = await User.findOne({ _id: req.params.id });

            return res.render("admin/users/singleUser.ejs", {
                title: `${user.fullname}`,
                breadCrumb: `${user.fullname}`,
                error: req.flash("error"),
                message: req.flash("success_msg"),
                jalaliMoment: this.jalaliMoment,
                user,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> change is Admin 
    // ? path ==> /changeAdmin/:id
    async changeIsAdmin(req, res) {
        try {

            // ! find user
            const user = await User.findOne({ _id: req.params.id });
            // ! change is admin
            if (user.isAdmin === "Admin") {
                user.isAdmin = "User";
                await user.save();
                return this.back(req, res);
            } else {
                user.isAdmin = "Admin";
                await user.save();
                return this.back(req, res);
            }
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> change role User
    // ? path ==> /changeRole/:id
    async changeRole(req, res) {
        try {
            // ! get items
            const { role, id } = req.body;
            // ! find user
            const user = await User.findOne({ _id: id });
            user.role = role;
            await user.save();
            req.flash("success_msg", "نقش کاربر با موفقیت تغییر یافت");
            return res.redirect("/admin/users")
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get contact us
    // ? path ==> /contactUs
    async getContactUsPage(req, res) {
        try {
            // ! get items
            const messages = await ContactUs.find().sort({ createdAt: -1 });
            return res.render("admin/users/allContactUs.ejs", {
                title: `پیام های دریافتی`,
                breadCrumb: `پیام های دریافتی`,
                error: req.flash("error"),
                message: req.flash("success_msg"),
                jalaliMoment: this.jalaliMoment,
                messages,
                ContactUs
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get contact us
    // ? path ==> /contactUs
    async isShowContactUs(req, res) {
        try {
            // ! get items
            const message = await ContactUs.findOne({ _id: req.params.id });
            if (message.isShow) {
                message.isShow = false;
                await message.save();
                req.flash("error", "پیام در صفحه اول نمایش داده نمیشود");
                return this.back(req, res);
            } else {
                message.isShow = true;
                await message.save();
                req.flash("success_msg", "پیام در صفحه اول نمایش داده میشود");
                return this.back(req, res);
            }

        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get all comments
    // ? path ==> /comments
    async getAllComments(req, res) {
        try {
            // ! get items
            const comments = await Comment.find().sort({ createdAt: -1 });
            return res.render("admin/users/allComments.ejs", {
                title: `نظرات ارسال شده`,
                breadCrumb: `نظرات ارسال شده`,
                error: req.flash("error"),
                message: req.flash("success_msg"),
                jalaliMoment: this.jalaliMoment,
                comments
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get all comments
    // ? path ==> /comments
    async deleteComment(req, res) {
        try {
            await Comment.findByIdAndRemove({ _id: req.params.id });

            req.flash("error", "نظر با موفقیت حذف شد");
            return this.back(req, res)
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

}
module.exports = new usersController;