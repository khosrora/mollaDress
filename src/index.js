const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

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
        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            unset: "destroy",
            store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
        }))
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
        // !Public Routes
        app.use(express.static(path.join(__dirname, "../public")))
    }
    setRouters() {
        // ! PUBLIC ROUTES
        app.use("/", require('./components/public/publicRouter'))
        // ! USER ROUTES
        app.use("/user", require('./components/user/userRouter'))
    }
}