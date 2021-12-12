var minifig = require('minifig');

// * Model
const Category = require('../admin/categories/model/Category');
const Attribute = require('../admin/products/model/Attribute');
const Product = require('../admin/products/model/Product');
const Brand = require('../admin/brands/model/Brand');
const Blog = require('../admin/blogs/model/Blog');
const Setting = require('../admin/settings/model/Setting');
const ContactUs = require('../user/model/ContactUs');
const Comment = require('../user/model/Comment');

// *error handler
const { get500 } = require('../errorHandler');
// * helper
const controller = require('../../helper/controller');
const { separate } = require('../../helper/seperate');


class publicController extends controller {
    // ? desc ==> home page
    // ? path ==> /page
    async home(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            const products = await Product.find({ isActive: true });
            const contactUs = await ContactUs.find({ isShow: true });
            const blogs = await Blog.find().limit(8);
            return res.render("public/home.ejs", {
                title: "صفحه اصلی",
                breadCrumb: "صفحه اصلی",
                message: req.flash("success_msg"),
                categories,
                products,
                separate,
                blogs,
                contactUs,
                jalaliMoment: this.jalaliMoment,
                truncate: this.truncate,
            })
        } catch (err) {
            get500(req, res)
        }
    }
    // ? desc ==> home page
    // ? path ==> /login
    async getLoginPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            return res.render("public/auth/login.ejs", {
                title: "ورود به وب سایت",
                breadCrumb: "ورود به وب سایت",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                formData: req.flash("formData")[0],
                categories
            })
        } catch (err) {
            get500(req, res)
        }
    }
    // ? desc ==> home page
    // ? path ==> /register
    async getRegisterPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            return res.render("public/auth/register.ejs", {
                title: "ثبت نام در وب سایت",
                breadCrumb: "ثبت نام در وب سایت",
                error: req.flash("error"),
                formData: req.flash("formData")[0],
                categories
            })
        } catch (err) {
            get500(req, res)
        }
    }

    // ? desc ==> forgot Password user
    // ? path ==> /forgotPass
    async getForgotPassPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            return res.render("public/auth/forgotPass.ejs", {
                title: "ارسال کد فراموشی",
                breadCrumb: "ارسال کد فراموشی",
                error: req.flash("error"),
                categories
            })
        } catch (err) {
            get500(req, res)
        }
    }


    // ? desc ==> change Password user
    // ? path ==> /changePass
    async getChangePassPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            return res.render("public/auth/changePass.ejs", {
                title: "بازیابی رمز عبور",
                breadCrumb: "بازیابی رمز عبور",
                error: req.flash("error"),
                message: req.flash("success_msg"),
                formData: req.flash("formData")[0],
                categories
            })
        } catch (err) {
            get500(req, res)
        }
    }
    // ? desc ==> get single product
    // ? path ==> /product/:slug
    async getProductSingle(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            const product = await Product.findOne({ slug: req.params.slug });
            const suggests = await Product.find({ sort: -1 });
            const attr = await Attribute.find({ product: product._id })
            product.view += 1;
            await product.save()
            return res.render("public/pages/singleProduct.ejs", {
                title: `${product.title}`,
                breadCrumb: `${product.slug}`,
                categories,
                product,
                separate,
                truncate: this.truncate,
                attr,
                suggests
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }
    // ? desc ==> get cart page
    // ? path ==> /cart
    async getCardPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            return res.render("public/pages/cart.ejs", {
                title: `سبد خرید`,
                breadCrumb: `سبد خرید`,
                categories,
                separate,
                truncate: this.truncate,
                error: req.flash("error"),
                message: req.flash("success_msg"),
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }
    // ? desc ==> get all products
    // ? path ==> /products
    async getAllProductsPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            const brands = await Brand.find();
            const products = await Product.find();
            const suggests = await Product.find({ sort: -1 });

            return res.render("public/pages/products.ejs", {
                title: `محصولات`,
                breadCrumb: `محصولات`,
                categories,
                separate,
                truncate: this.truncate,
                products,
                suggests,
                brands
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> get category products
    // ? path ==> /products/:name
    async getCategoryProductsPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            const brands = await Brand.find();
            const products = await Product.find({ categories: req.params.name });
            const suggests = await Product.find({ sort: -1 });
            return res.render("public/pages/products.ejs", {
                title: `محصولات`,
                breadCrumb: `محصولات`,
                categories,
                separate,
                truncate: this.truncate,
                products,
                suggests,
                brands
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> single blog
    // ? path ==> /blog/:id
    async getSingleBlogPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            const blog = await Blog.findOne({ slug: req.params.slug }).populate("user");
            const suggests = await Blog.find({ sort: -1 });
            const comments = await Comment.find({ post: blog._id });
            const formData = req.flash("formData")[0];

            return res.render("public/pages/singleBlog.ejs", {
                title: `${blog.title}`,
                breadCrumb: `مقالات`,
                categories,
                separate,
                truncate: this.truncate,
                jalaliMoment: this.jalaliMoment,
                blog,
                suggests,
                comments,
                error: req.flash("error"),
                message: req.flash("success_msg"),
                formData,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> single blog
    // ? path ==> /blog/:id
    async getBlogsPage(req, res) {
        try {
            // ! get items 
            const categories = await Category.find();
            const blogs = await Blog.find().populate("user");
            const suggests = await Blog.find({ sort: -1 });
            console.log(blogs)
            return res.render("public/pages/blogs.ejs", {
                title: `اخبار و مقالات`,
                breadCrumb: `اخبار و مقالات`,
                categories,
                separate,
                truncate: this.truncate,
                jalaliMoment: this.jalaliMoment,
                blogs,
                suggests
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> aboutUs
    // ? path ==> /aboutUs
    async getAboutUs(req, res) {
        // ! get items 
        const categories = await Category.find();

        try {
            // ! get items
            const setting = await Setting.findOne({ isActive: true })
            return res.render("public/pages/aboutUs.ejs", {
                title: "درباره ما",
                breadCrumb: "درباره ما",
                message: req.flash("success_msg"),
                categories,
                jalaliMoment: this.jalaliMoment,
                setting
            })
        } catch (err) {
            console.log(err.message)
            get500(req, res)
        }
    }

    // ? desc ==> contactUs
    // ? path ==> /contactUs
    async getContactUs(req, res) {
        try {
            // ! get items 
            const setting = await Setting.findOne({ isActive: true })
            const categories = await Category.find();
            const formData = req.flash("formData")[0];
            return res.render("public/pages/contactUs.ejs", {
                title: "درباره ما",
                breadCrumb: "درباره ما",
                categories,
                jalaliMoment: this.jalaliMoment,
                setting,
                error: req.flash("error"),
                message: req.flash("success_msg"),
                formData
            })
        } catch (err) {
            console.log(err.message)
            get500(req, res)
        }
    }

    // ? desc ==> send  contactUs form 
    // ? path ==> /contactUs
    async ContactUs(req, res) {
        try {
            // ! validation
            await ContactUs.contactUsValidate(req.body)
            // ! generate profile
            await minifig.makeSVG(async (svg) => {
                // ! create contact us
                await ContactUs.create({
                    ...req.body, profile: svg
                });
            });
            // ! send message
            req.flash("success_msg", "پس از مشاهده مدیریت پاسخ به صورت پیامک برای شما ارسال میشود");
            return res.redirect("/contactUs");
        } catch (err) {
            console.log(err.message)
            req.flash("error", err.message);
            return this.back(req, res)
        }
    }

    // ? desc ==> create comment
    // ? path ==> auth/comment
    async comment(req, res) {
        try {
            // ! get items
            const { name, email, text, id } = req.body;
            // ! validate
            await Comment.commentValidate(req.body);
            // ! create comment
            await Comment.create({
                name, email, text, post: id
            })
            // ! req.flash 
            req.flash("success_msg", "نظر شما با موفقیت ارسال شد");
            return this.back(req, res)
        } catch (err) {
            console.log(err.message);
            req.flash("error", err.message)
            return this.back(req, res)
        }
    }
}
module.exports = new publicController();