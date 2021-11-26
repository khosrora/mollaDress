exports.get404 = (req, res) => {
    res.render("public/errors/404", {
        title: "صفحه پیدا نشد | 404",
        bread: "صفحه پیدا نشد | 404"
    })
}



exports.get500 = (req, res) => {
    res.render("public/errors/500", {
        title: "مشکل سرور | 500",
        bread: "مشکل سرور | 500"
    })
}