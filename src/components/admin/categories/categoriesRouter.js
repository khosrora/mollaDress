const { Router } = require('express');
const router = new Router;


// * controller
const categoriesController = require('./categoriesController');

// * middleware
const { upload } = require('../../../middleware/multerSingleCategory');

// * helper
const gate = require('../../../helper/gate');

// ? dec ==> get category page
// ? path ==> /admin/createCategory
router.get("/createCategory", gate.can("show-categories"), categoriesController.getCategoryPage);

// ? dec ==> create category 
// ? path ==> /admin/createCategory
router.post("/createCategory", upload.single('image'), categoriesController.createCategory);

// ? dec ==> get All Category  
// ? path ==> /admin/getAllCategory
router.get("/getAllCategory", gate.can("show-categories"), categoriesController.getAllCategory);

// ? dec ==> delete Category  
// ? path ==> /admin/deleteCategory/:id
router.get("/deleteCategory/:id", categoriesController.deleteCategory);



module.exports = router;