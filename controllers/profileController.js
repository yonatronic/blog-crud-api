import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("-password");

  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findOne({ _id: req.user.id });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (name && name !== "string") user.name = name;
  if (email && email !== "string") user.email = email;

  await user.save();

  res.status(200).json({ message: "Profile updated successfully" });
};

export const uploadProfilePicture = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Profile picture not uploaded" });

  const user = await User.findOne({ _id: req.user.id });
  user.avatar = req.file.filename;
  await user.save();

  res.status(200).json({ message: "Profile Picture uploaded successfully" });
};
