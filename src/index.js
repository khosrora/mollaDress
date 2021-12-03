const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const gate = require('./helper/gate');



// * Helpers
const Helpers = require('./helper');

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        app.listen("3000", () => {
            console.log(`listening on port ${3000}`)
        })
    }
    setConfig() {
        // !passport Config
        require('../config/passport');
        require('../config/passportGoogle');
        // ! cookie parser
        app.use(cookieParser());
        //!DATABASE
        const connectDB = require('../config/db');
        connectDB();
        // ! Body Parser 
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        // ! flash
        app.use(flash());
        // ! session
        app.use(session({ ...config.session }))
        // !passport
        app.use(passport.initialize());
        app.use(passport.session());
        // !VIEW ENGINE
        app.set("view engine", "ejs");
        // ! DIR VIEWS
        app.set("views", "views");
        // ! EXPRESS_LAYOUTS
        app.set("layout", "./layouts/layouts.ejs");
        app.use(expressLayouts);
        app.set("layout extractScripts", true)
        // !Public Routes
        app.use(express.static(path.join(__dirname, "../public")))
        // ! connect roles
        app.use(gate.middleware());
        // ! validation login user
        app.use((req, res, next) => {
            app.locals = new Helpers(req, res).getObjects();
            next();
        })
    }
    setRouters() {
        // ! PUBLIC ROUTES
        app.use("/", require('./components/public/publicRouter'))
        // ! USER ROUTES
        app.use("/user", require('./components/user/userRouter'))
        // ! ADMIN ROUTES
        app.use("/admin", require('./components/admin/public/adminRouter'))
        app.use("/admin", require('./components/admin/products/productRouter'))
        app.use("/admin", require('./components/admin/categories/categoriesRouter'))
        app.use("/admin", require('./components/admin/brands/brandsRouter'))
        app.use("/admin", require('./components/admin/users/usersRouter'))
        app.use("/admin", require('./components/admin/blogs/blogsRouter'))
        // ! ERROR HANDLER
        app.use(require('./components/errorHandler').get404)

    }
}