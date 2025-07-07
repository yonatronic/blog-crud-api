import User from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";
import { v4 as uuid } from "uuid";

// this is for --> /api/admin
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) return res.status(404).json({ message: "User already exist" });

  const resetToken = uuid();
  const resetTokenExpire = Date.now() + 1000 * 60 * 30; // 30minutes

  const user = await User.create({
    name,
    email,
    role: "user",
    isVerified: false,
    resetToken,
    resetTokenExpire,
  });

  const link = `http://localhost:3000/api/auth/reset-password/${resetToken}`;

  console.log("sending email to : ", email);

  try {
    await sendMail({
      to: email,
      subject: "Set Password for Blog API Project",
      html: `
      <h2>Welcome to the Blog API!</h2>
      <p>You've been added by Admin <b>${req.user.name}</b>.</p>
      <p>Click the link below to set your password:</p>
      <a href="${link}">${link}</a>
    `,
    });
  } catch (error) {
    console.error(error);
  }

  console.log("✅ Email sendMail function executed");

  res.status(201).json({
    message: "User created & email sent",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
};

// this is for --> /api/admin
export const getAllUsers = async (req, res) => {
  const filter = req.query.verified === "false" ? { isVerified: false } : {};

  const users = await User.find(filter).select(
    "-password -resetToken -resetTokenExpire"
  );

  res.json(users);
};

// this is for --> /api/admin/
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "-password -resetToken -resetTokenExpire"
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// this is for --> /api/admin
export const updateUserInfo = async (req, res) => {
  const { name, email, role } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (name && name !== "string") user.name = name;
  if (email && email !== "string") user.email = email;

  // this will save us against roles like "adminnn" or "superuser" etc.
  if (role && role !== "string" && ["admin", "user"].includes(role)) {
    user.role = role;
  }

  await user.save();

  res.json({ message: "User updated successfully", user });
};

// this is for --> /api/admin
export const verifyUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isVerified = true;
  await user.save();

  res.json({ message: "User has been verified" });
};

// this is for --> /api/admin
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
};
