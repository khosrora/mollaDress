// * Model
const User = require('../../user/model/User');

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

    // ? desc ==> change role user 
    // ? path ==> /changeRole/:id
    async changeRole(req, res) {
        try {
            // ! get items
            console.log(req.body);
            const user = await User.findOne({ _id: req.params.id });
            console.log(user);

        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }
}
module.exports = new usersController;