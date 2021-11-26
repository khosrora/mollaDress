const { Schema, model } = require('mongoose');



const categorySchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

module.exports = model("Category", categorySchema);