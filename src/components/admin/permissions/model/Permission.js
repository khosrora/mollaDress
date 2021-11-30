const { Schema, model } = require('mongoose');



const permissionSchema = new Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });

permissionSchema.virtual("roles", {
    ref: "Role",
    localField: "_id",
    foreignField: "permissions"
})

module.exports = model("Permission", permissionSchema);