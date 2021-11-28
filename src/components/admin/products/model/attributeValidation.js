const yup = require('yup');



exports.attributeValidation = yup.object().shape({
    title: yup.string().required("وارد کردن  عنوان الزامی است"),
    color: yup.string().required("وارد کردن  رنگ الزامی است"),
    price: yup.string().required("وارد کردن  قیمت الزامی است"),
    count: yup.string().required("وارد کردن  تعداد الزامی است"),
});