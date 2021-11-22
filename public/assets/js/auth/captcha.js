// const runVerify = e => {
//     e.preventDefault();
//     runCaptcha();
// }
// document.getElementById("myform").addEventListener("submit", runVerify);

const runCaptcha = () => {
    grecaptcha.ready(function () {
        grecaptcha.execute('6Lc2RkwdAAAAAFkWDXKj2d5v7zc4JaR0Is4i3PbN', { action: 'submit' }).then(function (token) {
            const captchaV3 = document.getElementById("captcha").value = token;
            // const email = document.getElementById("email").value;
            // const password = document.getElementById("password").value;
            // const mobile = document.getElementById("mobile").value;
            // const captcha = token;
            // sendData(email, password, mobile, captcha)
        });
    });
}
window.onload = runCaptcha;

// const sendData = (email, password, mobile, captcha) => {
//     const info = JSON.stringify({ email, password, mobile, captcha });
//     fetch("/user/register", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json , text/plain , */*",
//             "Content-type": "application/json"
//         },
//         body: info
//     })
//         .then(res => res.json())
//         .then(data => console.log(data.msg))
// }