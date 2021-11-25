const { Router } = require('express');
const router = new Router();
const passport = require('passport');

// ! controllers
const userController = require('./userController');

// ? desc ==> register user
// ? path ==> /user/register
router.post("/register", userController.register);

// ? desc ==> login user
// ? path ==> /user/login
router.post("/login", userController.login);

// ? desc ==> logout user
// ? path ==> /user/logout
router.get("/logout", userController.logout);

// ? desc ==> connect to google
// ? path ==> /user/google
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

// ? desc ==>  verify from google
// ? path ==> /user/callback
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/register",
    failureFlash: true
}));

// ? desc ==> forgot Password user
// ? path ==> /forgotPass
router.post("/forgotPass", userController.forgotPass);

// ? desc ==> change Password user
// ? path ==> /changePass
router.post("/changePass", userController.changePass);


module.exports = router;