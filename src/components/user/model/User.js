const { Schema, model } = require('mongoose');
const { userValidation } = require('./userValidation');

const bcrypt = require('bcrypt');

const userSchema = new Schema({

    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    isBloocked: { type: Boolean, default: false },
    isAdmin: { type: String, enum: ["User", "Admin"], default: "User" },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    mobileActiveCode: { type: Number, required: true },
    isMobileActive: { type: Boolean, default: false },
    Newsletters: { type: Number, default: 0 },
    address: { type: String, required: false },
    fav: [{ type: Schema.Types.ObjectId, ref: "Product" }],


}, { timestamps: true });

userSchema.methods.hasRole = function(roles) { 
    let result = roles.filter(role => {
        return this.roles.indexOf(role) > -1;
    })

    return !! result.length;
}

userSchema.statics.userValidate = body => {
    return userValidation.validate(body)
}

userSchema.pre("save", function (next) {
    let user = this;

    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    })
});





module.exports = model("User", userSchema);