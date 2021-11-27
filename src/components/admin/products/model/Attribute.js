const { model, Schema } = require('mongoose');

const attributeSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    title: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, default: 1 },
})




module.exports = model("Attribute", attributeSchema)