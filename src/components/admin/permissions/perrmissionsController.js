
// * MODEL
const Permission = require('./model/Permission');
const Role = require('./model/Role');

// *error handler
const { get500 } = require('../../errorHandler');

// * helper
const controller = require('../../../helper/controller');


class perrmissionsController extends controller {

    // ? desc ==> getAllProductPage
    // ? path ==> /admin/Allproduct
    async getCreatePermissionPage(req, res) {
        try {
            return res.render("admin/permission/createPermission", {
                title: " سطح دسترسی ",
                breadCrumb: " سطح دسترسی ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                formData: req.flash("formData"),
                jalaliMoment: this.jalaliMoment,
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> create permission
    // ? path ==> /admin/usersPermissions
    async createPermission(req, res) {
        try {
            // ! get items 
            const { name, label } = req.body;
            // ! validation
            if (!name || !label) {
                req.flash("error", "لطفا مقادیر را کامل وارد کنید");
                return this.back(req, res);
            }
            // ! find category
            const permission = await Permission.findOne({ name });
            if (permission) {
                req.flash("error", "سطح دسترسی مورد نظر قبلا ثبت شده است");
                return this.back(req, res);
            }
            // ! create category
            await Permission.create({
                name,
                label
            })
            // ! show message
            req.flash("success_msg", "سطح دسترسی با موفقیت ثبت شد");
            return res.redirect("/admin/getAllPermissions")

        } catch (err) {
            console.log(err.message)
            return res.redirect("/500")
        }
    }

    // ? desc ==> get All Permissions
    // ? path ==> /admin/getAllPermissions
    async getAllPermissions(req, res) {
        try {
            // ! get items
            const permissions = await Permission.find().sort({ createdAt: -1 });

            res.render("admin/permission/allPermissions", {
                title: " دسته بندی ها",
                breadCrumb: " دسته بندی ها",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                permissions
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res);
        }
    }

    // ? desc ==> dedlete permission
    // ? path ==> /admin/deletePermissions
    async deletePermissions(req, res) {
        try {
            // ! get items for delete
            await Permission.findByIdAndDelete({ _id: req.params.id });
            // ! show message
            req.flash("error", "سطح دسترسی با موفقیت حذف شد");
            res.redirect("/admin/getAllPermissions")
        } catch (err) {
            console.log(err.message)
        }
    }

    // ? desc ==> edit permission
    // ? path ==> /admin/editPermissions
    async getEditPermissionsPage(req, res) {
        try {
            // ! get items
            const permission = await Permission.findOne({ _id: req.params.id });

            return res.render("admin/permission/editPermission", {
                title: " ویرایش سطح دسترسی ",
                breadCrumb: " ویرایش سطح دسترسی ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                jalaliMoment: this.jalaliMoment,
                permission
            })

        } catch (err) {
            console.log(err.message)
        }
    }

    // ? desc ==> edit permission
    // ? path ==> /admin/editPermissions
    async editPermissions(req, res) {
        try {
            // ! get items 
            const { name, label, id } = req.body;
            // ! validation
            if (!name || !label || !id) {
                req.flash("error", "لطفا مقادیر را کامل وارد کنید");
                return this.back(req, res);
            }
            // ! edit permission
            await Permission.findByIdAndUpdate({ _id: id }, {
                name, label, id
            })

            // ! show message
            req.flash("success_msg", "سطح دسترسی با موفقیت ویرایش شد");
            return res.redirect("/admin/getAllPermissions")
        } catch (err) {
            console.log(err.message)
        }
    }




    // ! roles
    // ? desc ==> create role
    // ? path ==> /admin/createroles
    async getCreateRolePage(req, res) {
        try {
            // ! get items 
            const permissions = await Permission.find()

            return res.render("admin/permission/createRole", {
                title: " سطوح دسترسی ",
                breadCrumb: " سطوح دسترسی ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                formData: req.flash("formData"),
                jalaliMoment: this.jalaliMoment,
                permissions
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res)
        }
    }

    // ? desc ==> create role
    // ? path ==> /admin/createroles
    async createRole(req, res) {
        try {
            // ! get items 
            const { name, label, permissionId } = req.body;
            // ! validation
            if (!name || !label || !permissionId) {
                req.flash("error", "لطفا مقادیر را کامل وارد کنید");
                return this.back(req, res);
            }
            // ! find category
            const role = await Role.findOne({ name });
            if (role) {
                req.flash("error", "سطوح دسترسی مورد نظر قبلا ثبت شده است");
                return this.back(req, res);
            }
            // ! create category
            await Role.create({
                name,
                label,
                permissions: permissionId
            })
            // ! show message
            req.flash("success_msg", "سطوح دسترسی با موفقیت ثبت شد");
            return res.redirect("/admin/getAllRoles")

        } catch (err) {
            console.log(err.message)
            return res.redirect("/500")
        }
    }

    // ? desc ==> get All roles
    // ? path ==> /admin/getAllroles
    async getAllRoles(req, res) {
        try {
            // ! get items
            const roles = await Role.find().sort({ createdAt: -1 });

            res.render("admin/permission/allroles", {
                title: " سطوح دسته بندی ها ",
                breadCrumb: " سطوح دسته بندی ها ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                roles
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res);
        }
    }

    // ? desc ==> dlete role
    // ? path ==> /admin/deleteroles
    async deleteroles(req, res) {
        try {
            // ! get items for delete
            await Role.findByIdAndDelete({ _id: req.params.id });
            // ! show message
            req.flash("error", "سطوح دسترسی با موفقیت حذف شد");
            res.redirect("/admin/getAllRoles")
        } catch (err) {
            console.log(err.message)
        }
    }

    // ? desc ==> edit role
    // ? path ==> /admin/editroles
    async getEditRolesPage(req, res) {
        try {
            // ! get items
            const role = await Role.findOne({ _id: req.params.id });
            const permissions = await Permission.find();

            return res.render("admin/permission/editrole", {
                title: " ویرایش سطوح دسترسی ",
                breadCrumb: " ویرایش سطوح دسترسی ",
                message: req.flash("success_msg"),
                error: req.flash("error"),
                jalaliMoment: this.jalaliMoment,
                role,
                permissions
            })

        } catch (err) {
            console.log(err.message)
        }
    }

    // ? desc ==> edit role
    // ? path ==> /admin/editroles
    async editRoles(req, res) {
        try {
            // ! get items 
            const { name, label, id } = req.body;
            // ! validation
            if (!name || !label || !id) {
                req.flash("error", "لطفا مقادیر را کامل وارد کنید");
                return this.back(req, res);
            }
            // ! edit role
            await Role.findByIdAndUpdate({ _id: id }, {
                name, label, permissions: id
            })

            // ! show message
            req.flash("success_msg", "سطوح دسترسی با موفقیت ویرایش شد");
            return res.redirect("/admin/getAllroles")
        } catch (err) {
            console.log(err.message)
        }
    }

}
module.exports = new perrmissionsController;