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

// ? desc ==> forgot Password user
// ? path ==> /forgotPass
router.get("/forgotPass", Handle.isLogged, publicController.getForgotPassPage);

// ? desc ==> change Password user
// ? path ==> /changePass
router.get("/changePass", Handle.isLogged, publicController.getChangePassPage);

// ? desc ==> get single product
// ? path ==> /product/:slug
router.get("/product/:slug", publicController.getProductSingle);

// ? desc ==> get cart page
// ? path ==> /cart
router.get("/cart", publicController.getCardPage);

// ? desc ==> get all products
// ? path ==> /products
router.get("/products", publicController.getAllProductsPage);

// ? desc ==> get all products
// ? path ==> /products
router.get("/products/brands", publicController.getAllProductsPage);

// ? desc ==> get category products
// ? path ==> /products/:name
router.get("/products/:name", publicController.getCategoryProductsPage);

// ? desc ==> single blog
// ? path ==> /blog/:id
router.get("/blog/:slug", publicController.getSingleBlogPage);

// ? desc ==> single blog
// ? path ==> /blog/:id
router.get("/blogs", publicController.getBlogsPage);

// ? desc ==> aboutUs
// ? path ==> /aboutUs
router.get("/aboutUs", publicController.getAboutUs);

// ? desc ==> contactUs
// ? path ==> /contactUs
router.get("/contactUs", publicController.getContactUs);

// ? desc ==> send  contactUs form 
// ? path ==> /contactUs
router.post("/contactUs", publicController.ContactUs);

// ? desc ==> create comment
// ? path ==> auth/comment
router.post("/comment", publicController.comment)

// ? desc ==> get page products with brand & cate
// ? path ==> /products/brand/category
router.get("/products/:categories/:subCate", publicController.getAllproductsBrands)

// ? desc ==> get page products with filters
// ? path ==> /productsFilter/:brand
router.get("/productsBrands/:brand", publicController.getFilterBrand)

router.post('/auto', publicController.getSearch);

module.exports = router;