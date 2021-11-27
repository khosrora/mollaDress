const { Schema, model } = require('mongoose');



const brandSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

module.exports = model("Brand", brandSchema);