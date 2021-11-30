const { Router } = require('express');
const router = new Router();

// * controllers
const perrmissionsController = require('./perrmissionsController');


// * middleware
const handle = require('../../../middleware/handle');

// * helper
const gate = require('../../../helper/gate');

router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})

// ? desc ==> create permission
// ? path ==> /admin/createPermissions
router.get("/createPermissions", handle.isAdmin, perrmissionsController.getCreatePermissionPage);

// ? desc ==> create permission
// ? path ==> /admin/usersPermissions
router.post("/createPermissions", handle.isAdmin, perrmissionsController.createPermission);

// ? desc ==> get All Permissions
// ? path ==> /admin/getAllPermissions
router.get("/getAllPermissions", handle.isAdmin, perrmissionsController.getAllPermissions);

// ? desc ==> dedlete permission
// ? path ==> /admin/deletePermissions
router.get("/deletePermissions/:id", handle.isAdmin, perrmissionsController.deletePermissions);

// ? desc ==> edit permission
// ? path ==> /admin/editPermissions
router.get("/editPermissions/:id", handle.isAdmin, perrmissionsController.getEditPermissionsPage);

// ? desc ==> edit permission
// ? path ==> /admin/editPermissions
router.post("/editPermissions", handle.isAdmin, perrmissionsController.editPermissions);


// ! roles
// ? desc ==> create role
// ? path ==> /admin/createroles
router.get("/createroles", handle.isAdmin, perrmissionsController.getCreateRolePage);

// ? desc ==> create role
// ? path ==> /admin/usersroles
router.post("/createroles", handle.isAdmin, perrmissionsController.createRole);

// ? desc ==> get All roles
// ? path ==> /admin/getAllroles
router.get("/getAllroles", handle.isAdmin, perrmissionsController.getAllRoles);

// ? desc ==> dlete role
// ? path ==> /admin/deleteroles
router.get("/deleteroles/:id", handle.isAdmin, perrmissionsController.deleteroles);

// ? desc ==> edit role
// ? path ==> /admin/editroles
router.get("/editroles/:id", handle.isAdmin, perrmissionsController.getEditRolesPage);

// ? desc ==> edit role
// ? path ==> /admin/editroles
router.post("/editroles", handle.isAdmin, perrmissionsController.editRoles);


module.exports = router;