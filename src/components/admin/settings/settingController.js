const fs = require('fs');
const appRoot = require('app-root-path');
// * Model
const Setting = require('./model/Setting');
const Banner = require('./model/Banner');

// *error handler
const { get500 } = require('../../errorHandler');

// * helper
const controller = require('../../../helper/controller');



class settingController extends controller {
    // ? desc ==> create setting web site
    // ? path ==> /settings
    async getSettingWebsitePage(req, res) {
        try {
            // ! get items
            const settings = await Setting.find().populate("user");
            return res.render("admin/settings/allSettings.ejs", {
                title: "اطلاعات وب سایت ",
                breadCrumb: "اطلاعات وب سایت ",
                error: req.flash("error"),
                message: req.flash("success_msg"),
                jalaliMoment: this.jalaliMoment,
                settings
            })
        } catch (err) {
            console.log(err.message)
            get500(req, res)
        }
    }

    // ? desc ==> create setting web site
    // ? path ==> /settings
    async getCreateSettingPage(req, res) {
        try {
            return res.render("admin/settings/createSetting.ejs", {
                title: "ساخت اطلاعات جدید ",
                breadCrumb: "ساخت اطلاعات جدید ",
                error: req.flash("error"),
                message: req.flash("success_msg"),
            })
        } catch (err) {
            console.log(err.message)
            get500(req, res)
        }
    }
    // ? desc ==> create setting web site
    // ? path ==> /settings
    async createSetting(req, res) {
        try {
            // ! create setting
            await Setting.create({
                ...req.body, user: req.user._id
            })
            // ! send message
            req.flash("success_msg", "اطلاعات با موفقیت اضافه شد در صورت تمایل برای نمایش اطلاعات را فعال کنید");
            return res.redirect("/admin/settings")
        } catch (err) {
            console.log(err.message)
            get500(req, res)
        }
    }

    // ? desc ==> change is active setting
    // ? path ==> /changeisActive/:id
    async changeIsActive(req, res) {
        try {
            const setting = await Setting.findOne({ _id: req.query.id });
            if (setting.isActive) {
                setting.isActive = false;
                await setting.save()
                req.flash("error", "تنظیمات غیرفعال شد");
                return this.back(req, res)
            } else {
                setting.isActive = true;
                await setting.save()
                req.flash("success_msg", "تنظیمات فعال شد");
                return this.back(req, res)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    // ? desc ==> delete setting web site
    // ? path ==> /deleteSetting/:id
    async deleteSetting(req, res) {
        try {
            await Setting.findByIdAndDelete({ _id: req.params.id })
            req.flash("error", "تنظیمات حذف شد");
            return this.back(req, res)
        } catch (err) {
            console.log(err.message)
            get500(req, res)
        }
    }

    // ? desc ==> delete setting web site
    // ? path ==> /deleteSetting/:id
    async getAllBanners(req, res) {
        try {
            const banners = await Banner.find();
            return res.render("admin/settings/banners.ejs", {
                title: "بنرهای وب سایت",
                breadCrumb: "بنرهای وب سایت",
                error: req.flash("error"),
                message: req.flash("success_msg"),
                banners
            })
        } catch (err) {
            console.log(err.message)
            get500(req, res)
        }
    }

    // ? desc ==> get page create banners
    // ? path ==> /createBanner
    async getCreateBannerPage(req, res) {
        try {
            return res.render("admin/settings/createBanner.ejs", {
                title: "ساخت بنر وب سایت",
                breadCrumb: "ساخت بنر وب سایت",
                error: req.flash("error"),
                message: req.flash("success_msg"),
            })
        } catch (err) {
            console.log(err.message);
            get500(req, res);
        }
    }

    // ? desc ==> create banners
    // ? path ==> /createBanner
    async createBanner(req, res) {
        try {
            // ! get items
            const { title } = req.body;
            // ! validation
            if (!title, !req.file) {
                req.flash("error", "لطفا تمام اطلاعات را وارد کنید")
                return this.back(req, res)
            }
            // ! create banner 
            await Banner.create({
                title, image: req.file.filename
            });
            // ! send message 
            req.flash("success_msg", "بنر با موفقیت ثبت شد")
            return res.redirect("/admin/banners");
        } catch (err) {
            fs.unlinkSync(`${appRoot}/public/uploads/images/blogs/` + req.file.filename);
            console.log(err.message);
            get500(req, res);
        }
    }


}
module.exports = new settingController;