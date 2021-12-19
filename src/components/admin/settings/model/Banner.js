const { model, Schema } = require('mongoose');

const bannerSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true })



module.exports = model("Banner", bannerSchema)