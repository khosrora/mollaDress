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

// ? desc ==> getAllProductPage
// ? path ==> /admin/Allproduct
router.get("/allProduct", handle.isAdmin, productController.getAllProductPage);

// ? desc ==> getCreateProductPage
// ? path ==> /admin/createproduct
router.get("/createproduct", handle.isAdmin, productController.getCreateProductPage);

// ? desc ==> createProductPage
// ? path ==> /admin/createproduct
router.post("/createproduct", handle.isAdmin, uploadMultiple, productController.createProduct);

// ? desc ==> product is Active 
// ? path ==> /admin/changeisactive/:id
router.get("/changeisactive/:id", handle.isAdmin, productController.changeIsActive);

// ? desc ==> edit product 
// ? path ==> /admin/editProduct
router.get("/editProduct/:id", handle.isAdmin, productController.getEditProduct);

// ? desc ==> edit product 
// ? path ==> /admin/editProduct
router.post("/editProduct", handle.isAdmin, productController.editProduct);

// ? desc ==> single product 
// ? path ==> /admin/singleProduct/:id
router.get("/singleProduct/:id", handle.isAdmin, productController.getsingleProductPage);




module.exports = router;