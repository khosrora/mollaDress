const { Router } = require('express');
const router = new Router();

// ! controllers
const publicController = require('./publicController');


// ! middleware
const Handle = require('../../middleware/handle');


// ? desc ==> home page
// ? path ==> /page
router.get("/", publicController.home);

// ? desc ==> login page
// ? path ==> /login
router.get("/login", Handle.isLogged, publicController.getLoginPage);

// ? desc ==> register page
// ? path ==> /register
router.get("/register", Handle.isLogged, publicController.getRegisterPage);






module.exports = router;