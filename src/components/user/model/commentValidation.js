const yup = require('yup');


exports.commentValidation = yup.object().shape({
    name: yup.string().required("وارد کردن نام  الزامی است"),
    email: yup.string()
        .required("وارد کردن پست الکترونیک الزامی است")
        .email("فرمت پست الکترونیک اشتباه است"),
    text: yup.string().required("وارد کردن متن الزامی است").min(5, "لطفا پیام خود را بیشتر از 5 کاراکتر انتخاب کنید")
        .max(100, "لطفا پیام خود را کمتر از 100 کاراکتر انتخاب کنید"),
});