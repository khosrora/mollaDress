const fs = require('fs');
const appRoot = require('app-root-path');

// * Model
const Category = require('../categories/model/Category');
const Brand = require('./model/Brand');

// *error handler
const { get500 } = require('../../errorHandler');

// * Helper
const controller = require('../../../helper/controller');

class brandsController extends controller {

    // ? dec ==> get Brand page
    // ? path ==> /admin/createBrand
    async getCreateBrandPage(req, res) {
        try {
            res.render("admin/brands/createBrands", {
                title: "ساخت دسته بندی",
                breadCrumb: "ساخت دسته بندی",
                error: req.flash("error"),
                formData: req.flash("formData"),
            })

        } catch (err) {
            console.log(err.mesesage);
            get500(req, res);
        }
    }

    // ? dec ==> create Brand 
    // ? path ==> /admin/createBrand
    async createBrand(req, res) {
        if (!req.file) {
            req.flash("error", "لطفا یک عکس برای برند انتخاب کنید");
            return this.back(req, res);
        }
        const { filename } = req.file;
        try {
            // ! get items 
            const { name } = req.body;

            // ! validation
            if (!name) {
                req.flash("error", "لطفا نام برند را وارد کنید");
                fs.unlinkSync(`${appRoot}/public/uploads/images/brands/` + filename);
                return this.back(req, res);
            }
            // ! find brands
            const brand = await Brand.findOne({ name });
            if (brand) {
                req.flash("error", "برند مورد نظر قبلا ثبت شده است");
                fs.unlinkSync(`${appRoot}/public/uploads/images/brands/` + filename);
                return this.back(req, res);
            }
            // ! create brands
            await Brand.create({
                name, image: filename
            })
            // ! show message
            req.flash("success_msg", "برند با موفقیت ثبت شد");
            return res.redirect("/admin/getAllBrands")

        } catch (err) {
            console.log(err.message)
            fs.unlinkSync(`${appRoot}/public/uploads/images/brands/` + filename);
            return res.redirect("/500")
        }
    }

    // ? dec ==> get All Category  
    // ? path ==> /admin/getAllCategory
    async getAllBrand(req, res) {
        try {

            // ! get items
            const brands = await Brand.find().sort({ createdAt: -1 });

            res.render("admin/brands/allBrands", {
                title: " برند ها",
                breadCrumb: " برند ها",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                brands
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res);
        }
    }

    // ? dec ==> delete Category  
    // ? path ==> /admin/:id
    async deleteBrand(req, res) {
        try {
            // ! get items for delete
            await Brand.findByIdAndDelete({ _id: req.params.id });
            // ! show message
            req.flash("error", "برند با موفقیت حذف شد");
            res.redirect("/admin/getAllBrands");
        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = new brandsController;