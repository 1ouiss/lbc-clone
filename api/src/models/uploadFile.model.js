const mongoose = require("mongoose");

const UploadFileSchema = new mongoose.Schema({
  ETag: {
    type: String,
  },
  Location: {
    type: String,
  },
  key: {
    type: String,
  },
  Key: {
    type: String,
  },
  Bucket: {
    type: String,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const UploadFile = mongoose.model("UploadFile", UploadFileSchema);

module.exports = UploadFile;
