const mongoose = require('mongoose');

let filesSchema = new mongoose.Schema({
    file_url: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    file_size: {
        type: String,
        required: true
    },
    public_ID: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

module.exports = {filesSchema}
