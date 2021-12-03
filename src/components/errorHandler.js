// * Model
const Category = require('./admin/categories/model/Category');




exports.get404 = async (req, res) => {
    // ! get items 
    const categories = await Category.find();
    res.render("public/errors/404", {
        title: "صفحه پیدا نشد | 404",
        breadCrumb: "صفحه پیدا نشد | 404",
        categories
    })
}



exports.get500 = async (req, res) => {
    // ! get items 
    const categories = await Category.find();
    res.render("public/errors/500", {
        title: "مشکل سرور | 500",
        breadCrumb: "مشکل سرور | 500",
        categories
    })
}