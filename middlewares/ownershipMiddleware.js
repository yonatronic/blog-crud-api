import Post from "../models/Post.js";

export const isAuthorOrAdmin = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    console.log("Logged in user ID:", req.user.id);
    console.log("Post owner ID:", post.user.toString());

    const isAuthor = post.user.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isAdmin && !isAuthor) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
