const autoBind = require('auto-bind');



module.exports = class Helpers {
    constructor(req, res) {
        autoBind(this)
        this.req = req;
        this.res = res;
    }

    getObjects() {
        return {
            auth: this.auth(),
            // old : this.old
        }
    }

    auth() {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user
        }
    }

    // old(field, defaultValue = '') {
    //     let formData = this.req.flash("formData")[0];
    //     return formData && formData.hasOwnProperty(field) ? formData[field] : defaultValue;
    // }
}