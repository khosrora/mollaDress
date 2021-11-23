const { Router } = require('express');
const router = new Router();

// ! controllers
const userController = require('./userController');

// ? desc ==> register user
// ? path ==> /user/register
router.post("/register", userController.register);

// ? desc ==> login user
// ? path ==> /user/login
router.post("/login",  userController.login);

// ? desc ==> logout user
// ? path ==> /user/logout
router.get("/logout", userController.logout);




module.exports = router;