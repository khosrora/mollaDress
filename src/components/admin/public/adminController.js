// * Model
const Blog = require('../blogs/model/Blog');
const Cart = require('../../user/model/Cart');
const User = require('../../user/model/User');

// *error handler
const { get500 } = require('../../errorHandler');

// * helper
const controller = require('../../../helper/controller');

class adminController extends controller {

    async home(req, res) {
        try {
            // ! get items
            const usersCount = await User.find().count();
            const blogs = await Blog.find().limit(8).sort({ createdAt: -1 }).populate("user")
            const carts = await Cart.find().limit(5).sort({ createdAt: -1 }).populate("user")
            return res.render("admin/home.ejs", {
                title: "پنل مدیریت",
                breadCrumb: "پنل مدیریت",
                error: req.flash("error"),
                blogs,
                carts,
                usersCount,
                jalaliMoment: this.jalaliMoment,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res);
        }
    }

}
module.exports = new adminController;