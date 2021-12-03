const { Router } = require('express');
const router = new Router();

// * controllers
const blogsController = require('./blogsController');


// * middleware
const handle = require('../../../middleware/handle');
const { upload } = require('../../../middleware/multerSingle');
const gate = require('../../../helper/gate');

router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})


// ? dec ==> get create blog page
// ? path ==> /admin/createBlog
router.get("/createBlog", blogsController.getCreateBlog);

// ? dec ==> get create blog page
// ? path ==> /admin/createBlog
router.post("/createBlog", upload.single('image'), blogsController.createBlog);

// ? dec ==> get All Blogs
// ? path ==> /admin/getAllBlogs
router.get("/getAllBlogs", blogsController.getAllBlogs);

// ? dec ==> blogDelete
// ? path ==> /admin/blogDelete/:id
router.get("/blogDelete/:id", blogsController.blogDelete);

// ? dec ==> edit Delete
// ? path ==> /admin/blogDelete/:id
router.get("/editBlog/:id", blogsController.getEditBlogPage);

// ? dec ==> edit Delete
// ? path ==> /admin/blogDelete/:id
router.post("/editBlog", blogsController.editBlog);


module.exports = router;