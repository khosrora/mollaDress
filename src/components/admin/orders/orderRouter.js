const { Router } = require('express');
const router = new Router();

// ! controllers
const orderController = require('./orderController');


// ! middleware
const handle = require('../../../middleware/handle');
const gate = require('../../../helper/gate');

router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})

// ? desc ==> get all orders
// ? path ==> /admin/allOrders
router.get("/allOrders", handle.isAdmin, gate.can("show-order"), orderController.getAllOrders);

// ? desc ==> get  single Order
// ? path ==> /admin/singleOrder/:id
router.get("/singleOrder/:id", handle.isAdmin, gate.can("show-order"), orderController.getSingleOrderPage);

// ? desc ==> get all noPayments
// ? path ==> /admin/noPayment
router.get("/noPayment", handle.isAdmin, gate.can("show-order"), orderController.noPayment);

// ? desc ==> get all processingOrder
// ? path ==> /admin/processingOrder
router.get("/processingOrder", handle.isAdmin, gate.can("show-order"), orderController.processingOrder);

// ? desc ==> get all SendOrders
// ? path ==> /admin/SendOrder
router.get("/SendOrder", handle.isAdmin, gate.can("show-order"), orderController.SendOrder);

// ? desc ==> get all unSeenOrder
// ? path ==> /admin/unSeenOrder
router.get("/unSeenOrder", handle.isAdmin, gate.can("show-order"), orderController.unSeenOrder);

// ? desc ==> get all unSeenOrder
// ? path ==> /admin/unSeenOrder
router.post("/changeStatus/:id", handle.isAdmin, gate.can("show-order"), orderController.changeStatus);






module.exports = router;