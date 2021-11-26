const { Router } = require('express');
const router = new Router;


// * controller
const categoriesController = require('./categoriesController');

// * middleware
const { upload } = require('../../../middleware/multerSingleCategory');


// ? dec ==> get category page
// ? path ==> /admin/createCategory
router.get("/createCategory", categoriesController.getCategoryPage);

// ? dec ==> create category 
// ? path ==> /admin/createCategory
router.post("/createCategory", upload.single('image'), categoriesController.createCategory);

// ? dec ==> get All Category  
// ? path ==> /admin/getAllCategory
router.get("/getAllCategory", categoriesController.getAllCategory);

// ? dec ==> delete Category  
// ? path ==> /admin/deleteCategory/:id
router.get("/deleteCategory/:id", categoriesController.deleteCategory);



module.exports = router;