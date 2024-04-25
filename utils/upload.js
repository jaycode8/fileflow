let multer = require('multer');
const cloudinary = require("./cloudinary");
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'fileflow/files/',
        // allowed_formats: ['jpg', 'png', 'gif'],
    },
});

const profile_storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'fileflow/users/',
        // allowed_formats: ['jpg', 'png', 'gif'],
    },
});

let storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
});

let upload = multer({storage: storage});
let profile_uploads = multer({storage: profile_storage});

module.exports = {upload, profile_uploads};
