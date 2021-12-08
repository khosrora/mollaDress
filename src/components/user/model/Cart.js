const { Schema, model } = require('mongoose');


const productSchema = new Schema({
    count: { type: Number, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, required: true },
})


const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [productSchema],
    isSuccess: { type: Boolean, default: false },
    codePayment: { type: Number, default: 0 },
    priceProduct: { type: Number, required: true },
    status: { type: String, enum: ["Processing", "Posted", "Unseen"], default: "Unseen" },
}, { timestamps: true })

module.exports = model("Cart", cartSchema)