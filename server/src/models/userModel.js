const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, require: true, minlength: 3, maxlength: 30 },
        email: {
            type: String,
            require: true,
            minlength: 3,
            maxlength: 500,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            minlength: 3,
            maxlength: 1024,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
