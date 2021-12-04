const { Schema, model } = require('mongoose');
const { addressValidation } = require('./addressValidation');


const addressSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    reciver: { type: String, required: true },

}, { timestamps: true });


addressSchema.statics.addressValidate = body => {
    return addressValidation.validate(body)
}



module.exports = model("Address", addressSchema);