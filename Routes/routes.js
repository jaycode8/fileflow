const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/token");
const {gallery, uploadFile, noPage, uploadMultiples, deleteFile} = require("../controlers/files.controlers");
const {signForms, addUser, logInUser, fetchUser, profile, updateUser} = require("../controlers/users.controlers");
let {upload, profile_uploads} = require("../utils/upload");

router.get("/forms", signForms);
router.post("/signup", addUser);
router.post("/user", logInUser);
router.get("/user", verifyToken, fetchUser);
router.get("/profile", profile);
router.post("/profile", verifyToken, profile_uploads.single("profile_pic"), updateUser);

router.post("/file", verifyToken, upload.single("myFile"), uploadFile);
router.delete("/file/:id", verifyToken, deleteFile);
router.get("/gallery/:id", gallery);

router.post("/test", upload.single("myFile"), (req, res) => {
    res.json({imageUrl: req.file.path, publicId: req.file});
    console.log(req);
});

router.delete("/test/:folder/:id", (req, res) => {
    const publicId = `${req.params.folder}/${req.params.id}`;
    try {
        const del = cloudinary.uploader.destroy(publicId);
        res.json({msg: "successfully deleted image"});
    } catch (err) {
        console.log(err);
        res.json({msg: "an error occured"});
    }
});

router.post("/uploadFiles", upload.array("myFiles", 10), uploadMultiples);

router.use(noPage);

module.exports = router;
