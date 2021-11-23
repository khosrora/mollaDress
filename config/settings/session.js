const MongoStore = require('connect-mongo');

module.exports = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}