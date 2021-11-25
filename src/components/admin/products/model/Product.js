const { model, Schema } = require('mongoose');
const { productValidation } = require('./productValidation');



const productModel = new Schema({
    
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    desc: { type: String, required: true },
    image: [{ type: String, required: true }],
    isActive: { type: Boolean, default: true },
    view: { type: Number, default: 0 },
    categories: { type: String, required: false },
    brand: { type: String, required: false },
    price: { type: String, required: true },
    sell: { type: Number, default: 0 },

}, { timestamps: true })

productModel.statics.productValidate = body => {
    return productValidation.validate(body)
}



module.exports = model("Product", productModel)