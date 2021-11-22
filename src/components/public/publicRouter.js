const { Router } = require('express');
const router = new Router();

// ! controllers
const publicController = require('./publicController');



// ? desc ==> home page
// ? path ==> /page
router.get("/", publicController.home);

// ? desc ==> login page
// ? path ==> /login
router.get("/login", publicController.getLoginPage);

// ? desc ==> register page
// ? path ==> /register
router.get("/register", publicController.getRegisterPage);






module.exports = router;