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
router.get("/createBlog", gate.can("show-blog"), blogsController.getCreateBlog);

// ? dec ==> get create blog page
// ? path ==> /admin/createBlog
router.post("/createBlog", gate.can("show-blog"), upload.single('image'), blogsController.createBlog);

// ? dec ==> get All Blogs
// ? path ==> /admin/getAllBlogs
router.get("/getAllBlogs", gate.can("show-blog"), blogsController.getAllBlogs);

// ? dec ==> blogDelete
// ? path ==> /admin/blogDelete/:id
router.get("/blogDelete/:id", gate.can("show-blog"), blogsController.blogDelete);

// ? dec ==> edit Delete
// ? path ==> /admin/blogDelete/:id
router.get("/editBlog/:id", gate.can("show-blog"), blogsController.getEditBlogPage);

// ? dec ==> edit Delete
// ? path ==> /admin/blogDelete/:id
router.post("/editBlog", gate.can("show-blog"), blogsController.editBlog);


module.exports = router;