// * MODEL
const Cart = require('../../user/model/Cart');
const Address = require('../../user/model/Address');

// *error handler
const { get500 } = require('../../errorHandler');

// * helper
const controller = require('../../../helper/controller');
const { separate } = require('../../../helper/seperate');



class orderController extends controller {



    // ? desc ==> get all orders
    // ? path ==> /admin/allOrders
    async getAllOrders(req, res) {
        try {
            // ! get items
            const carts = await Cart.find().populate("user");
            return res.render("admin/orders/allOrders", {
                title: " تمام سفارشات",
                breadCrumb: " تمام سفارشات",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                carts,
                jalaliMoment: this.jalaliMoment,
                separate
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }


    // ? desc ==> get  single Order
    // ? path ==> /admin/singleOrder/:code
    async getSingleOrderPage(req, res) {
        try {
            // ! get items
            const order = await Cart.findOne({ _id: req.params.id }).populate("user");
            const addresses = await Address.find({
                $and: [
                    { user: order.user },
                    { isActive: true },
                ]
            });

            return res.render("admin/orders/singleOrder", {
                title: " جزئیات سفارش",
                breadCrumb: " جزئیات سفارش",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                order,
                addresses,
                jalaliMoment: this.jalaliMoment,
                separate
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get all noPayments
    // ? path ==> /admin/noPayment
    async noPayment(req, res) {
        try {
            // ! get items
            const carts = await Cart.find({ isSuccess: false }).populate("user");
            return res.render("admin/orders/allOrders", {
                title: " سفارشات پرداخت نشده",
                breadCrumb: " سفارشات پرداخت نشده",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                carts,
                jalaliMoment: this.jalaliMoment,
                separate
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get all processingOrder
    // ? path ==> /admin/processingOrder
    async processingOrder(req, res) {
        try {
            // ! get items
            const carts = await Cart.find({ status: "Processing" }).populate("user");
            return res.render("admin/orders/allOrders", {
                title: " سفارشات در حال پردازش",
                breadCrumb: " سفارشات در حال پردازش",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                carts,
                jalaliMoment: this.jalaliMoment,
                separate
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get all SendOrders
    // ? path ==> /admin/SendOrder
    async SendOrder(req, res) {
        try {
            // ! get items
            const carts = await Cart.find({ status: "Posted" }).populate("user");
            return res.render("admin/orders/allOrders", {
                title: " سفارشات ارسال شده",
                breadCrumb: " سفارشات ارسال شده",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                carts,
                jalaliMoment: this.jalaliMoment,
                separate
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get all unSeenOrder
    // ? path ==> /admin/unSeenOrder
    async unSeenOrder(req, res) {
        try {
            // ! get items
            const carts = await Cart.find({ isSuccess: false }).populate("user");
            return res.render("admin/orders/allOrders", {
                title: " سفارشات دیده نشده",
                breadCrumb: " سفارشات دیده نشده",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                carts,
                jalaliMoment: this.jalaliMoment,
                separate
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get all unSeenOrder
    // ? path ==> /admin/unSeenOrder
    async changeStatus(req, res) {
        try {
            // ! get items
            const { status } = req.body;
            const cart = await Cart.findOne({ _id: req.params.id });
            cart.status = status;
            await cart.save();
            req.flash("success_msg", "وضعیت محصول تغییر کرد")
            return this.back(req, res)
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }


}
module.exports = new orderController;