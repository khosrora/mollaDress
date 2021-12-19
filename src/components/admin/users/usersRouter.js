const { Router } = require('express');
const router = new Router();

// * controllers
const usersController = require('./usersController');


// * middleware
const handle = require('../../../middleware/handle');

// * helper
const gate = require('../../../helper/gate');

router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})

// ? desc ==> get All Users Page
// ? path ==> /users
router.get("/users", handle.isAdmin, gate.can("show-users"), usersController.getAllUsersPage);

// ? desc ==> get All Admins Page
// ? path ==> /admins
router.get("/admins", handle.isAdmin, gate.can("show-users"), usersController.getAllAdminsPage);

// ? desc ==> get single Users Page
// ? path ==> /singleUser/:id
router.get("/singleUser/:id", handle.isAdmin, gate.can("show-users"), usersController.getSingleUser);


// ? desc ==> change is Admin 
// ? path ==> /changeAdmin/:id
router.get("/changeAdmin/:id", gate.can("show-users"),usersController.changeIsAdmin);

// ? desc ==> change role User
// ? path ==> /changeRole/:id
router.post("/changeRole/:id", gate.can("show-users"),usersController.changeRole);

// ? desc ==> get contact us
// ? path ==> /contactUs
router.get("/contactUs", gate.can("show-users"),usersController.getContactUsPage);

// ? desc ==> isShow contact us
// ? path ==> /isShow/:id
router.get("/isShow/:id", gate.can("show-users"),usersController.isShowContactUs);

// ? desc ==> get all comments
// ? path ==> /comments
router.get("/comments", gate.can("show-users"),usersController.getAllComments);

// ? desc ==> delete comment
// ? path ==> /deleteComment/:id
router.get("/deleteComment/:id", gate.can("show-users"),usersController.deleteComment);


module.exports = router;