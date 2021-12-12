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
router.get("/changeAdmin/:id", usersController.changeIsAdmin);

// ? desc ==> change role User
// ? path ==> /changeRole/:id
router.post("/changeRole/:id", usersController.changeRole);

// ? desc ==> get contact us
// ? path ==> /contactUs
router.get("/contactUs", usersController.getContactUsPage);

// ? desc ==> isShow contact us
// ? path ==> /isShow/:id
router.get("/isShow/:id", usersController.isShowContactUs);

// ? desc ==> get all comments
// ? path ==> /comments
router.get("/comments", usersController.getAllComments);

// ? desc ==> delete comment
// ? path ==> /deleteComment/:id
router.get("/deleteComment/:id", usersController.deleteComment);


module.exports = router;