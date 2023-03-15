const UploadFileModel = require("../models/uploadFile.model");
const uploadOneFileInAws = require("../utils/aws-s3");
const Post = require("../models/post.model");

const PostController = {
  async createPost(req, res) {
    const { title, content, location } = req.body;
    console.log(location);

    try {
      const post = new Post({
        title,
        content,
        location: JSON.parse(location),
      });

      await post.save();

      await Promise.all(
        req.files.map(async (file) => {
          console.log("file", file);
          const uploadFileAws = await uploadOneFileInAws(file, post._id);

          const uploadFile = new UploadFileModel({
            ...uploadFileAws,
            post: post._id,
          });

          await uploadFile.save();
          post.uploadFiles.push(uploadFile._id);
        })
      );
      await post.save();

      res.status(201).json(post);
    } catch (error) {
      res.status(409).send({ message: error.message });
    }
  },
  async getPosts(req, res) {
    try {
      const posts = await Post.find().populate("uploadFiles");
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("uploadFiles");
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      post.title = req.body.title;
      post.content = req.body.content;
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async deletePost(req, res) {
    try {
      await Post.deleteOne(req.params.id);
      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = PostController;
