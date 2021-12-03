const fs = require('fs');
const appRoot = require('app-root-path');

// * MODEL
const Blog = require('./model/Blog');
const Category = require('../categories/model/Category');

// *error handler
const { get500 } = require('../../errorHandler');

// * helper
const controller = require('../../../helper/controller');



class blogsController extends controller {


    // ? dec ==> get category page
    // ? path ==> /admin/createCategory
    async getCreateBlog(req, res) {
        try {
            // ! get categories
            const categories = await Category.find();

            res.render("admin/blogs/createBlog", {
                layout: "./layouts/adminLayout",
                title: "ساخت بلاگ",
                bread: "ساخت بلاگ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                categories
            })

        } catch (err) {
            console.log(err.mesesage);
            get500(req, res);
        }
    }

    // ? dec ==> get category page
    // ? path ==> /admin/createCategory
    async createBlog(req, res) {
        // ! get users
        const user = req.user;
        try {
            // ! get items
            const { title, desc, tags } = req.body;
            let str1 = tags;
            const split_string = str1.split(",");

            // ! image
            if (!req.file) {
                req.flash("error", "حداقل یک عکس انتخاب کنید");
                return this.back(req, res)

            }
            // ! validation
            const blog = await Blog.findOne({ title });
            if (blog) {
                fs.unlinkSync(`${appRoot}/public/uploads/images/blogs/` + req.file.filename);
                req.flash("error", "بلاگی با این عنوان ثبت شده است");
                return this.back(req, res)
            }
            await Blog.blogValidate(req.body);
            // ! create blog
            await Blog.create({
                user: user._id, title, desc, items: split_string, slug: this.slug(title), image: req.file.filename
            })
            //! redirect
            req.flash("success_msg", "بلاگ با موفقیت ساخته شد");
            return res.redirect("/admin/getAllblogs");
        } catch (err) {
            if (req.file) {
                fs.unlinkSync(`${appRoot}/public/uploads/images/blogs/` + req.file.filename);
            }
            req.flash("error", err.message);
            return this.back(req, res)
        }
    }

    // ? dec ==> get get All Blogs
    // ? path ==> /admin/allBlogs
    async getAllBlogs(req, res) {
        try {

            // ! get items
            const blogs = await Blog.find().populate("user");

            res.render("admin/blogs/allBlogs", {
                layout: "./layouts/adminLayout",
                title: " بلاگ ها",
                bread: " بلاگ ها",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                jalaliMoment: this.jalaliMoment,
                blogs
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    // ? dec ==> blogDelete
    // ? path ==> /admin/blogDelete/:id
    async blogDelete(req, res) {
        try {
            // ! delete blogs
            const blog = await Blog.findByIdAndRemove({ _id: req.params.id })
            // ! delete image blog
            fs.unlinkSync(`${appRoot}/public/uploads/images/blogs/` + blog.image);
            // ! send message
            req.flash("success_msg", "بلاگ با موفقیت حذف شد")
            res.redirect("/admin/getAllblogs")
        } catch (err) {
            console.log(err.message)
        }
    }

    // ? dec ==> edit blog page
    // ? path ==> /admin/editBlog/:id
    async getEditBlogPage(req, res) {
        try {
            // ! get categories
            const categories = await Category.find();
            const blog = await Blog.findOne({ _id: req.params.id });

            res.render("admin/blogs/editBlog", {
                layout: "./layouts/adminLayout",
                title: "ساخت بلاگ",
                bread: "ساخت بلاگ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                categories,
                blog
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    // ? dec ==> edit Delete
    // ? path ==> /admin/editBlog
    async editBlog(req, res) {
        try {
            // ! get items
            const { id, title, tags, desc } = req.body;
            let str1 = tags;
            const split_string = str1.split(",");
            // ! validation
            if (!id || !title || !tags || !desc) {
                req.flash("error", "لطفا تمام مقادیر را کامل کنید");
                return this.back(req, res)
            }
            // ! update blog
            await Blog.findByIdAndUpdate({ _id: id }, {
                ...req.body, items: split_string, slug: this.slug(title)
            })
            // ! send message
            req.flash("error", "بلاگ با موفقیت ویرایش شد");
            res.redirect("/admin/getAllblogs")

        } catch (err) {
            console.log(err.message)
        }
    }

}
module.exports = new blogsController;