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
  // async getPosts(req, res) {
  //   console.log("getPosts : ", req.query);

  //   const { lat, lng } = req.query;

  //   const maxDistance = 1;
  //   try {
  //     if (lat && lng) {
  //       // filter posts with lat + or - 5 and lat + or - 0.6
  //       const posts = await Post.find().populate("uploadFiles");
  //       const filteredPosts = posts.filter((post) => {
  //         return (
  //           post.location.lat > lat - maxDistance / 6371 ||
  //           post.location.lat < lat + maxDistance / 6371 ||
  //           post.location.lng > lng - maxDistance / 6371 ||
  //           post.location.lng < lng + maxDistance / 6371
  //         );
  //       });
  //       res.status(200).json(filteredPosts);
  //     } else {
  //       const posts = await Post.find().populate("uploadFiles");
  //       res.status(200).json(posts);
  //     }
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // },
  async getPosts(req, res) {
    console.log("getPosts : ", req.query);

    const { lat, lng } = req.query;

    const maxDistance = 10;
    try {
      if (lat && lng) {
        // Filter posts within maxDistance
        const posts = await Post.find().populate("uploadFiles");
        const filteredPosts = posts.filter((post) => {
          const distance =
            Math.acos(
              Math.sin((post.location.lat * Math.PI) / 180) *
                Math.sin((lat * Math.PI) / 180) +
                Math.cos((post.location.lat * Math.PI) / 180) *
                  Math.cos((lat * Math.PI) / 180) *
                  Math.cos(((lng - post.location.lng) * Math.PI) / 180)
            ) * 6371; // Calculate distance in km
          return distance <= maxDistance;
        });
        res.status(200).json(filteredPosts);
      } else {
        const posts = await Post.find().populate("uploadFiles");
        res.status(200).json(posts);
      }
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
  async filterPosts(req, res) {
    console.log("yoooo");
    try {
      const { lat, long } = req.query;
      console.log(lat, long);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = PostController;
