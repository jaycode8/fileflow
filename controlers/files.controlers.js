const mongoose = require("mongoose");
const {filesSchema} = require("../models/files.model");
const {usersModel} = require("./users.controlers");
const filesModel = mongoose.model("files", filesSchema);
const destroy_file = require("../utils/destroyer");

const uploadFile = async (req, res, next) => {
    const file = req.file;
    try {
        if (!file) {
            res.render("error", {
                classes: "hide",
                warning: "Please make sure you choose a file to upload",
                code: "400",
            });
        } else {
            let data = {
                file_url: req.file.path,
                file_name: file.originalname,
                mimetype: req.file.mimetype,
                file_size: req.file.size,
                public_ID: req.file.filename,
                user: req.id.user,
            };
            // console.log(req.file)
            const file_data = new filesModel(data);
            await file_data.save();
            res.json({success: "true", msg: "successfully uploaded image", user: req.id.user});
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteFile = async (req, res) => {
    try {
        const filedata = await filesModel.findById({_id: req.params.id});
        await filesModel.findByIdAndDelete(req.params.id);
        await destroy_file(filedata.public_ID);
        res.json({success: "true"});
    } catch (e) {
        console.log(e);
        res.json({success: "false"});
    }
}

const uploadMultiples = (req, res, next) => {
    const files = req.myFiles;
    if (!files) {
        res.render("error", {
            classes: "hide",
            warning: "Please make sure you choose a file to upload",
            code: "400",
        });
    } else {
        res.redirect("/gallery");
    }
};

const gallery = async (req, res) => {
    const user_files = await filesModel.find({user: req.params.id, mimetype: /^(image|video)\//});
    const user_images = await filesModel.find({user: req.params.id, mimetype: /^image\//});
    const user_video = await filesModel.find({user: req.params.id, mimetype: /^video\//});
    const user_docs = await filesModel.find({user: req.params.id, mimetype: /^(text|application)\//});
    const userdata = await usersModel.findOne({_id: req.params.id});
    res.render("gallery", {
        title: "Photo Gallery",
        fileData: user_files,
        images: user_images,
        videos: user_video,
        documents: user_docs,
        heading: "GALLERY",
        user_profile: userdata.profile_pic,
    });
};

const noPage = (req, res) => {
    res.render("error", {
        classes: "show",
        warning: "We can't find that page",
        code: "404",
    });
};

module.exports = {
    gallery,
    uploadFile,
    noPage,
    uploadMultiples,
    deleteFile
};
