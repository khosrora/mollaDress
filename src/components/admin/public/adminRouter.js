const { Router } = require('express');
const router = new Router();

// ! controllers
const adminController = require('./adminController');


// ! middleware
const handle = require('../../../middleware/handle');


router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})

// ? desc ==> home page
// ? path ==> /page
router.get("/dashboard", handle.isAdmin, adminController.home);




module.exports = router;