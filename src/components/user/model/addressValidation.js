const yup = require('yup');


exports.addressValidation = yup.object().shape({
    city: yup.string()
        .required("وارد کردن نام شهر الزامی است"),
    state: yup.string()
        .required("وارد کردن نام استان الزامی است"),
    address: yup.string()
        .required("وارد کردن آدرس الزامی است"),
    reciver: yup.string()
        .required("وارد کردن نام گیرنده الزامی است"),
    postalCode: yup.string().required("وارد کردن کد پستی الزامی است")
        // .matches("/^\d{10}$/", " کد پستی خود را چک کنید"),
});