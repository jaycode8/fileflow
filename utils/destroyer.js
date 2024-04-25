const cloudinary = require("cloudinary").v2;

const destroy_file = (public_ID) => {
    cloudinary.uploader.destroy(public_ID);
}

module.exports = destroy_file;