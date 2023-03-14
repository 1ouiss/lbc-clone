const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller.js");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     let { title } = req.body;
//     title = title.replace(/ /g, "-").toLowerCase();
//     // delete all special characters
//     title = title.replace(/[^a-zA-Z0-9-]/g, "");
//     // replace accented characters with non-accented characters
//     title = title.replace(/á/g, "a");
//     title = title.replace(/é/g, "e");
//     title = title.replace(/í/g, "i");
//     title = title.replace(/ó/g, "o");
//     title = title.replace(/ú/g, "u");
//     title = title.replace(/ñ/g, "n");
//     title = title.replace(/ü/g, "u");

//     cb(null, `${Date.now()}-${title}-${file.originalname}`);
//   },
// });

const multer = require("multer");
const upload = multer({ dest: "uploads" });

router.post("/post", upload.array("photos", 8), PostController.createPost);
router.get("/post", PostController.getPosts);
router.get("/post/:id", PostController.getPost);
router.put("/post/:id", upload.array("photos", 8), PostController.updatePost);
router.delete("/post/:id", PostController.deletePost);

module.exports = router;
