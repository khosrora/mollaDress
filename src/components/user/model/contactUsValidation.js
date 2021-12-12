const yup = require('yup');


exports.contactUsValidation = yup.object().shape({
    fullname: yup.string()
        .required("وارد کردن نام کاربری الزامی است"),
    email: yup.string()
        .required("وارد کردن پست الکترونیک الزامی است")
        .email("فرمت پست الکترونیک اشتباه است"),
    phone: yup.string().required("وارد کردن شماره همراه الزامی است")
        .matches("09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}", "شماره همراه خود را چک کنید"),
    subject: yup.string().required("وارد کردن عنوان الزامی است").min(4, "عنوان نباید کمتر از 5 کاراکتر باشد")
        .max(40, "عنوان نباید بیشتر از 40 کاراکتر باشد"),
    text: yup.string().required("وارد کردن پیام الزامی است"),
});