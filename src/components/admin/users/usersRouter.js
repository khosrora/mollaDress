const { Router } = require('express');
const router = new Router();

// ! controllers
const usersController = require('./usersController');


// ! middleware
const handle = require('../../../middleware/handle');


router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})

// ? desc ==> get All Users Page
// ? path ==> /users
router.get("/users", handle.isAdmin, usersController.getAllUsersPage);

// ? desc ==> get All Admins Page
// ? path ==> /admins
router.get("/admins", handle.isAdmin, usersController.getAllAdminsPage);

// ? desc ==> get single Users Page
// ? path ==> /singleUser/:id
router.get("/singleUser/:id", handle.isAdmin, usersController.getSingleUser);

// ? desc ==> change role user 
// ? path ==> /changeRole/:id
router.post("/changeRole/:id", handle.isAdmin, usersController.changeRole);




module.exports = router;