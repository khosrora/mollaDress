const { Router } = require('express');
const router = new Router();

// ! controllers
const userController = require('./userController');



// ? desc ==> register user
// ? path ==> /register
router.post("/register", userController.register);

// ? desc ==> login user
// ? path ==> /login
router.post("/login", userController.login);




module.exports = router;