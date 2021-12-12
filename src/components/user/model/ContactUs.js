const { Schema, model } = require('mongoose');
const { contactUsValidation } = require('./contactUsValidation');


const contactUsSchema = new Schema({

    fullname: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    phone: { type: String, required: true },
    text: { type: String, required: true },
    isShow: { type: Boolean, default: false },
    profile: { type: String, required: true }

}, { timestamps: true });


contactUsSchema.statics.contactUsValidate = body => {
    return contactUsValidation.validate(body)
}



module.exports = model("ContactUs", contactUsSchema);