const { Router } = require('express');
const router = new Router();

// * controllers
const settingController = require('./settingController');


// * middleware
const handle = require('../../../middleware/handle');
const { upload } = require('../../../middleware/multerSingle');

// * helper
const gate = require('../../../helper/gate');

router.use((req, res, next) => {
    res.locals.layout = "layouts/adminLayout"
    next();
})

// ? desc ==> create setting web site
// ? path ==> /settings
router.get("/settings", handle.isAdmin, gate.can("show-setting"), settingController.getSettingWebsitePage);

// ? desc ==> create setting web site
// ? path ==> /settings
router.get("/createSetting", handle.isAdmin, gate.can("show-setting"), settingController.getCreateSettingPage);

// ? desc ==> create setting web site
// ? path ==> /settings
router.post("/createSetting", handle.isAdmin, gate.can("show-setting"), settingController.createSetting);

// ? desc ==> change is active setting
// ? path ==> /changeisActive/:id
router.get("/changeisActive", handle.isAdmin, gate.can("show-setting"), settingController.changeIsActive);

// ? desc ==> delete setting web site
// ? path ==> /deleteSetting/:id
router.get("/deleteSetting/:id", handle.isAdmin, gate.can("show-setting"), settingController.deleteSetting);

// ? desc ==> get All banners
// ? path ==> /banners
router.get("/banners", handle.isAdmin, gate.can("show-setting"), settingController.getAllBanners);

// ? desc ==> get page create banners
// ? path ==> /createBanner
router.get("/createBanner", handle.isAdmin, gate.can("show-setting"), settingController.getCreateBannerPage);

// ? desc ==> create banners
// ? path ==> /createBanner
router.post("/createBanner", upload.single('image'), handle.isAdmin, gate.can("show-setting"), settingController.createBanner);



module.exports = router;