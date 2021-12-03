const yup = require('yup');



exports.blogValidation = yup.object().shape({
    title: yup.string().required("وارد کردن  عنوان الزامی است"),
    desc: yup.string().required("وارد کردن  توضیحات الزامی است"),
    tags: yup.string().required("وارد کردن  تگ ها الزامی است"),
});