const { Router } = require('express');
const router = new Router;


// * controller
const brandsController = require('./brandsController');

// * middleware
const { upload } = require('../../../middleware/multerSingleBrands');


// ? dec ==> get Brand page
// ? path ==> /admin/createBrand
router.get("/createBrand", brandsController.getCreateBrandPage);

// ? dec ==> create Brand 
// ? path ==> /admin/createBrand
router.post("/createBrand", upload.single('image'), brandsController.createBrand);

// ? dec ==> get All Brand  
// ? path ==> /admin/getAllBrand
router.get("/getAllBrands", brandsController.getAllBrand);

// ? dec ==> delete Brand  
// ? path ==> /admin/deleteBrand/:id
router.get("/deleteBrand/:id", brandsController.deleteBrand);



module.exports = router;