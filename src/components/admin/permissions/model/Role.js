const { Schema, model } = require('mongoose');



const roleSchema = new Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: "permission" }],
}, { timestamps: true, toJSON: { virtuals: true } });

module.exports = model("Role", roleSchema);