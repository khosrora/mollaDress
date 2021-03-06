const fs = require('fs');
const appRoot = require('app-root-path');

// * MODEL
const Product = require('./model/Product');
const Category = require('../categories/model/Category');
const Brand = require('../brands/model/Brand');
const Attribute = require('../products/model/Attribute');

// *error handler
const { get500 } = require('../../errorHandler');

// * helper
const controller = require('../../../helper/controller');
const { separate } = require('../../../helper/seperate');



class productController extends controller {



    // ? desc ==> getAllProductPage
    // ? path ==> /admin/Allproduct
    async getAllProductPage(req, res) {
        try {
            // ! get items
            const products = await Product.find().populate("user");

            return res.render("admin/product/allproduct", {
                title: " محصولات ",
                breadCrumb: " محصولات ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                products,
                orders,
                jalaliMoment: this.jalaliMoment,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> getCreateProductPage
    // ? path ==> /admin/createproduct
    async getCreateProductPage(req, res) {
        try {
            // ! get items
            const categories = await Category.find();
            const brands = await Brand.find();
            return res.render("admin/product/createProduct", {
                title: "ساخت محصول",
                breadCrumb: "ساخت محصول",
                error: req.flash("error"),
                formData: req.flash("formData"),
                categories,
                brands
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
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
            await Product.create({
                ...req.body, slug: this.slug(req.body.title), image: files, user: req.user.id
            })

            // ! redirect
            req.flash("success_msg", "اضافه کردن محصول با موفقیت به اتمام رسید")
            return res.redirect("/admin/allProduct")
        } catch (err) {
            console.log(err.message);
            if (req.files.image) {
                const images = req.files.image;
                for (let image of images) {
                    var { filename } = image;
                    fs.unlinkSync(`${appRoot}/public/uploads/images/products/` + filename);
                }
            }
            req.flash("error", err.message);
            return this.back(req, res)
        }
    }

    // ? desc ==> product is Active 
    // ? path ==> /admin/changeisactive/:id
    async changeIsActive(req, res) {
        try {
            const product = await Product.findById({ _id: req.params.id });
            if (product.isActive) {
                product.isActive = false;
                await product.save();
                req.flash("error", "محصول غیر فعال شد");
                return res.redirect("/admin/allProduct");
            } else {
                product.isActive = true;
                await product.save();
                req.flash("success_msg", "محصول  فعال شد");
                return res.redirect("/admin/allProduct");
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> edit product 
    // ? path ==> /admin/editProduct/:id
    async getEditProduct(req, res) {
        try {
            const product = await Product.findOne({ _id: req.params.id });
            return res.render("admin/product/editProduct", {
                title: " ویرایش محصولات ",
                breadCrumb: " ویرایش محصولات ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                product,
                jalaliMoment: this.jalaliMoment,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> edit product 
    // ? path ==> /admin/editProduct
    async editProduct(req, res) {
        try {
            // !get items
            const { id, title, price, categories, brand } = req.body
            // ! validation 
            if (!id || !title || !price || !categories || !brand) {
                req.flash("error", "لطفا تمام مقادیر را کامل کنید");
                return this.back(req, res);
            }

            // ! find product
            await Product.findByIdAndUpdate({ _id: req.body.id }, {
                ...req.body, slug: this.slug(req.body.title)
            })
            // ! send message
            req.flash("success_msg", "محصول با موفقیت ویرایش شد");
            return res.redirect("/admin/allProduct")
        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> single product 
    // ? path ==> /admin/singleProduct/:id
    async getsingleProductPage(req, res) {
        try {
            // ! get items 
            const product = await Product.findOne({ _id: req.params.id }).populate("user");
            const attributes = await Attribute.find({ product: product._id });
            return res.render("admin/product/singleProduct", {
                title: "محصول",
                breadCrumb: "محصول",
                error: req.flash("error"),
                formData: req.flash("formData"),
                message: req.flash("success_msg"),
                product,
                attributes,
                jalaliMoment: this.jalaliMoment,
                separate
            })

        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> create attr page 
    // ? path ==> /admin/createAttribute/:id
    async getCreateAttributePage(req, res) {
        try {
            // ! get items 
            const product = await Product.findOne({ _id: req.params.id });

            return res.render("admin/product/createAttribute", {
                title: "ویژگی",
                breadCrumb: "ویژگی",
                error: req.flash("error"),
                formData: req.flash("formData"),
                product,
            })

        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> create attr page 
    // ? path ==> /admin/createAttribute/:id
    async createAttributePage(req, res) {
        try {
            // ! get items 
            const { id } = req.body;
            // ! validation
            await Attribute.attributeValidate(req.body)

            // ! create attribute
            await Attribute.create({
                ...req.body, product: id
            })
            // ! send message
            req.flash("success_msg", "ویژگی محصول اضافه شد");
            res.redirect("/admin/singleProduct/" + id)

        } catch (err) {
            console.log(err.message);
            req.flash("error", err.message);
            return this.back(req, res);
        }
    }

    // ? desc ==> edit attr  
    // ? path ==> /admin/editAttribute/:id
    async getEditAttributePage(req, res) {
        try {
            // ! get items 
            const attribute = await Attribute.findOne({ _id: req.params.id });

            return res.render("admin/product/editAttribute", {
                title: "ویرایش ویژگی محصول",
                breadCrumb: "ویرایش ویژگی محصول",
                error: req.flash("error"),
                formData: req.flash("formData"),
                attribute,
            })
        } catch (err) {
            console.log(err.message);
        }
    }

    // ? desc ==> edit attr  
    // ? path ==> /admin/editAttribute/:id
    async editAttribute(req, res) {
        try {
            const { title, price, color, id, attributeId } = req.body;
            // ! validation
            if (!title || !price || !color || !id || !attributeId) {
                req.flash("error", "لطفا تمام مقادیر را کامل کنید");
                return this.back(req, res);
            }
            // ! edit attribute
            await Attribute.findByIdAndUpdate({ _id: attributeId }, {
                ...req.body, product: id
            })
            // ! send message
            req.flash("success_msg", "ویژگی با موفقیت ویرایش شد");
            res.redirect("/admin/singleProduct/" + id)
        } catch (err) {
            console.log(err.message);
            req.flash("error", err.message);
            return this.back(req, res);
        }
    }

    // ? desc ==> create attr page 
    // ? path ==> /admin/createAttribute/:id
    async deleteAttribute(req, res) {
        try {
            await Attribute.findByIdAndDelete(req.params.id);
            // ! send message
            req.flash("error", "ویژگی با موفقیت حذف شد");
            this.backURL(req, res)
        } catch (err) {
            console.log(err.message);
        }
    }


}
module.exports = new productController;