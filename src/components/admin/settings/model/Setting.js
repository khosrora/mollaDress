const { model, Schema } = require('mongoose');

const settingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    phoneNumber: { type: String },
    phoneNumber2: { type: String },
    address: { type: String },
    address2: { type: String },
    googleaddress: { type: String },
    text: { type: String },
    text2: { type: String },
    email: { type: String },
    email2: { type: String },
    isActive: { type: Boolean, default: false }
}, { timestamps: true })



module.exports = model("Setting", settingSchema)