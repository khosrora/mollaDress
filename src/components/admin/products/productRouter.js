const { Router } = require('express');
const router = new Router();

// ! controllers
const productController = require('./productController');


// ! middleware
const handle = require('../../../middleware/handle');
const { uploadMultiple } = require('../../../middleware/multerMultiple');


router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})

// ? desc ==> getCreateProductPage
// ? path ==> /admin/createproduct
router.get("/createproduct", handle.isAdmin, productController.getCreateProductPage);

// ? desc ==> createProductPage
// ? path ==> /admin/createproduct
router.post("/createproduct", handle.isAdmin, uploadMultiple, productController.createProduct);




module.exports = router;