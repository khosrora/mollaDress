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





module.exports = router;