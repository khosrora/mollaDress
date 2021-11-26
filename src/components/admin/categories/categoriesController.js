const fs = require('fs');
const appRoot = require('app-root-path');

// * Model
const Category = require('./model/Category');

// *error handler
const { get500 } = require('../../errorHandler');

// * Helper
const controller = require('../../../helper/controller');

class categoriesController extends controller {
    // ? dec ==> get category page
    // ? path ==> /admin/createCategory
    async getCategoryPage(req, res) {
        try {
            // ! get categories 
            const categories = await Category.find({ category: null });

            res.render("admin/categories/createCategory", {
                title: "ساخت دسته بندی",
                breadCrumb: "ساخت دسته بندی",
                error: req.flash("error"),
                formData: req.flash("formData"),
                categories
            })

        } catch (err) {
            console.log(err.mesesage);
            get500(req, res);
        }
    }

    // ? dec ==> create category 
    // ? path ==> /admin/createCategory
    async createCategory(req, res) {
        if (!req.file) {
            req.flash("error", "لطفا یک عکس برای دسته بندی انتخاب کنید");
            return this.back(req, res);
        }
        const { filename } = req.file;
        try {
            // ! get items 
            const { name, parent } = req.body;
            let item;
            if (parent === "") {
                item = null;
            } else {
                item = parent
            }
            // ! validation
            if (!name) {
                req.flash("error", "لطفا نام دسته بندی را وارد کنید");
                fs.unlinkSync(`${appRoot}/public/uploads/images/category/` + filename);
                return this.back(req, res);
            }
            // ! find category
            if (item === null) {
                const category = await Category.findOne({ name });
                if (category) {
                    req.flash("error", "دسته بندی مورد نظر قبلا ثبت شده است");
                    fs.unlinkSync(`${appRoot}/public/uploads/images/category/` + filename);
                    return this.back(req, res);
                }
            }
            // ! create category
            await Category.create({
                name, category: item, image: filename
            })
            // ! show message
            req.flash("success_msg", "دسته بندی با موفقیت ثبت شد");
            return res.redirect("/admin/getAllCategory")

        } catch (err) {
            console.log(err.message)
            fs.unlinkSync(`${appRoot}/public/uploads/images/category/` + filename);
            return res.redirect("/500")
        }
    }

    // ? dec ==> get All Category  
    // ? path ==> /admin/getAllCategory
    async getAllCategory(req, res) {
        try {

            const categories = await Category.find().sort({ createdAt: -1 });

            res.render("admin/categories/allCategories", {
                title: " دسته بندی ها",
                breadCrumb: " دسته بندی ها",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                categories
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res);
        }
    }

    // ? dec ==> delete Category  
    // ? path ==> /admin/:id
    async deleteCategory(req, res) {
        try {
            // ! get items for delete
            await Category.findByIdAndDelete({ _id: req.params.id });
            // ! show message
            req.flash("error", "دسته بندی با موفقیت حذف شد");
            res.redirect("/admin/getAllCategory")
        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = new categoriesController;