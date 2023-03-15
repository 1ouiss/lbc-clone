const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  uploadFiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadFile",
    },
  ],
  location: {
    type: Object,
  },
});

module.exports = mongoose.model("Post", Post);
