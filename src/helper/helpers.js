const autoBind = require('auto-bind');
const moment = require('jalali-moment');
const { customAlphabet } = require('nanoid')

module.exports = class helpers {

    constructor() {
        autoBind(this);
    }

    jalaliMoment(time) {
        return moment(time.date).locale('fa').format('D / MMM / YYYY');
    }

    nanoId(number) {
        const nanoId = customAlphabet('123456789', number)
        return nanoId();
    }

    slug(str) {
        return str.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }

    truncate(str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = new_str.length > 0 ? new_str : str.substr(0, len);
            return new_str + "...";
        }
        return str;
    }
}