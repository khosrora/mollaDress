jQuery.extend(jQuery.validator.messages, {
    required: "وارد کردن این فیلد ضروری است",
    email: "پست الکترونیک درست وارد نشده است",
    number: "لطفا بصورت عدد وارد کنید",
    maxlength: jQuery.validator.format("کلمه عبور خود را بیشتر از 30 کاراکتر انتخاب نکنید"),
    minlength: jQuery.validator.format(".کلمه عبور خود را کمتر از 8 کاراکتر انتخاب نکنید"),
});

$(document).ready(function () {
    $.validator.setDefaults({
        highlight: function (element) {
            $(element)
                .closest(".form-group")
                .addClass("has-error")
        }
    });

    $('#registerForm').validate(
        {
            rules: {
                email: {
                    required: true,
                    email: true
                },
                mobile: {
                    required: true,
                },
                password: {
                    required: true,
                    minlength: 8
                }
            }
        });
});