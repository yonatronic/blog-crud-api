import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(404)
        .json({ message: "Title and Content are required" });
    }

    const image = req.file ? req.file.filename : null;

    const post = await Post.create({
      title,
      content,
      image,
      user: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email"); //using populate for showing name and email on frontend. we can't show id as a frontend showcase stuff
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!post) return res.status(400).json({ message: "Post not found" });

    if (title && title !== "string") post.title = title;
    if (content && content !== "string") post.content = content;

    const updated = await post.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.deleteOne();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
