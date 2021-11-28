const helpers = require('./helpers');
const fetch = require('node-fetch');

module.exports = class controller extends helpers {


    async recaptchaVerify(captcha) {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}`;
        const response = await fetch(verifyUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        });
        const json = await response.json();
        if (!json.success || json.score < 0.4) {
            req.flash("error", "کد ریکپچای شما تایید نشد.لطفا دوباره امتحان کنید");
            this.back(req, res)
        }
    }

    back(req, res) {
        req.flash("formData", req.body)
        return res.redirect(req.header('Referer') || '/');
    }

    backURL(req, res) {
        const backUrl = req.header('Referer') || "/allProduct";
        return res.redirect(backUrl);
    }

}