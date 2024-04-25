const mongoose = require("mongoose");

let usersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile_pic: {
            type: String,
        },
        file_size: {
            type: String,
        },
        public_ID: {
            type: String,
        },
    },
    {timestamps: true}
);

module.exports = {usersSchema};
