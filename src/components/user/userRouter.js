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

// ? desc ==> dashboard user
// ? path ==> /user/dashboard
router.get("/dashboard", userController.getDashboardUserPage);

// ? desc ==> dashboard user
// ? path ==> /user/addressuser
router.get("/addressuser", userController.getAddressUserPage);

// ? desc ==> dashboard user
// ? path ==> /user/addressuser
router.post("/addressuser", userController.AddressUser);

// ? desc ==> add Mobile user
// ? path ==> /user/addMobile
router.post("/addMobile", userController.addMobile);

// ? desc ==> address User Delete
// ? path ==> /user/addressDelete
router.get("/addressDelete/:id", userController.addressDelete);

// ? desc ==>  User edit
// ? path ==> /user/editUser
router.get("/editUser", userController.getEditUserPage);

// ? desc ==>  User edit
// ? path ==> /user/editUser
router.post("/editUser", userController.editUser);

// ? desc ==> check out user
// ? path ==> user/checkout
router.get("/payment", userController.payment);

// ? desc ==> verify check out user
// ? path ==> user/verifyPayment
router.get("/verifyPayment", userController.verifyPayment);

// ? desc ==> change address active
// ? path ==> user/changeisActive/:id
router.get("/changeisActive/:id", userController.changeisActive);

// ? desc ==> change address active
// ? path ==> user/myOrders
router.get("/myOrders", userController.getUserOrdersPage);

// ? desc ==> change address active
// ? path ==> user/myOrder/:code
router.get("/myOrder/:code", userController.getUserOrderPage);



module.exports = router;