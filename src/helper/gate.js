const ConnectRoles = require('connect-roles');

// * model 
const Permission = require('../components/admin/permissions/model/Permission');

const gate = new ConnectRoles({
    failureHandler: function (req, res, action) {
        var accept = req.headers.accept || '';
        res.status(403);
        if (accept.indexOf('html')) {
            res.render('public/errors/403', {
                title: "403 error"
            });
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});


const permissions = async () => {
    return await Permission.find({}).populate('roles').exec();
}


permissions()
    .then(permissions => {
        permissions.forEach(permission => {
            let roles = permission.roles.map(item => item._id);
            gate.use(permission.name, (req) => {
                return (req.isAuthenticated())
                    ? req.user.hasRole(roles)
                    : false;
            });
        })
    });


module.exports = gate;