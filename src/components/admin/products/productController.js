const fs = require('fs');
const appRoot = require('app-root-path');

// ! MODEL
const Product = require('./model/Product');


// ! helper
const controller = require('../../../helper/controller');
const { slug } = require('../../../helper/slug');



class productController extends controller {

    // ? desc ==> getCreateProductPage
    // ? path ==> /admin/createproduct
    async getCreateProductPage(req, res) {
        try {
            return res.render("admin/product/createProduct", {
                title: "ساخت محصول",
                breadCrumb: "ساخت محصول",
                error: req.flash("error"),
                message: req.flash("success_msg"),
                formData: req.flash("formData"),
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> createProductPage
    // ? path ==> /admin/createproduct
    async createProduct(req, res) {
        let files = [];
        try {
            // ! validation
            await Product.productValidate(req.body)
            if (req.files.image) {
                const images = req.files.image;
                for (let image of images) {
                    var { filename } = image;
                    files.push(filename)
                }
            } else {
                req.flash("error", "لطفا حداقل یک عکس انتخاب کنید");
                return this.back(req, res)
            }
            // ! get items
            req.body = { ...req.body };
            console.log(req.body);
            await Product.create({
                ...req.body, slug: slug(req.body.title), image: files, user: req.user.id
            })

            // ! redirect
            req.flash("success_msg", "اضافه کردن محصول با موفقیت به اتمام رسید")
            return res.redirect("/admin/createProduct")
        } catch (err) {
            console.log(err.message);
            if (req.file) {
                fs.unlinkSync(`${appRoot}/public/uploads/images/products/` + req.file.filename);
            }
            req.flash("error", err.message);
            return this.back(req, res)
        }
    }
}
module.exports = new productController;