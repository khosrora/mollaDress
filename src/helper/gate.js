const ConnectRoles = require('connect-roles');

// * model 
// const Permission = require('../components/admin/permissions/model/Permission');

const gate = new ConnectRoles({
    failureHandler: function (req, res, action) {
        var accept = req.headers.accept || '';
        res.status(403);
        if (accept.indexOf('html')) {
            res.render('public/errors/403', {
                title: "403 error",
                bread : "سطح دسترسی"
            });
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});

gate.use('show-products', function (req) {
    switch (req.user.role) {
        case "Manager":
            return true;
        case "Seller":
            return true;
        case "Assistant":
            return false;
        case "Client":
            return false;
    }
})

gate.use('show-brands', function (req) {
    switch (req.user.role) {
        case "Manager":
            return true;
        case "Seller":
            return true;
        case "Assistant":
            return false;
        case "Client":
            return false;
    }
})

gate.use('show-categories', function (req) {
    switch (req.user.role) {
        case "Manager":
            return true;
        case "Seller":
            return true;
        case "Assistant":
            return false;
        case "Client":
            return false;
    }
})

gate.use('show-users', function (req) {
    switch (req.user.role) {
        case "Manager":
            return true;
        case "Seller":
            return false;
        case "Assistant":
            return true;
        case "Client":
            return false;
    }
})

gate.use('show-blog', function (req) {
    switch (req.user.role) {
        case "Manager":
            return true;
        case "Seller":
            return false;
        case "Assistant":
            return true;
        case "Client":
            return false;
    }
})

gate.use('show-order', function (req) {
    switch (req.user.role) {
        case "Manager":
            return true;
        case "Seller":
            return true;
        case "Assistant":
            return false;
        case "Client":
            return false;
    }
})

gate.use('show-setting', function (req) {
    switch (req.user.role) {
        case "Manager":
            return true;
        case "Seller":
            return false;
        case "Assistant":
            return true;
        case "Client":
            return false;
    }
})



module.exports = gate;