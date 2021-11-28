const { model, Schema } = require('mongoose');
const { attributeValidation } = require('./attributeValidation');

const attributeSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    title: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: [{ type: String, required: true }],
    count: { type: Number, default: 1 },
})

attributeSchema.statics.attributeValidate = body => {
    return attributeValidation.validate(body)
}



module.exports = model("Attribute", attributeSchema)