import User from "../models/User.js";
import { generateToken } from "../utils/jwtUtils.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail.js";
import { v4 as uuidv4 } from "uuid";

// controller for registering user
// POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  await sendMail({
    to: user.email,
    subject: "👋 Welcome to BlogAPI!",
    html: `<h2>Hi ${user.name},</h2><p>Thanks for joining BlogAPI!</p>`,
  });

  res.status(201).json({
    message: "User registered successfully",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// in case user forgot password (get email for resetting)
// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  // generating token for a certain period of time
  const resetToken = uuidv4();
  user.resetToken = resetToken;
  user.resetTokenExpire = Date.now() + 30 * 60 * 100; // 10 minutes
  await user.save();

  const resetUrl = `http://localhost:3000/api/auth/reset-password/${resetToken}`;

  await sendMail({
    to: user.email,
    subject: "Password Reset Request",
    html: `
      <h3>Hello ${user.name},</h3>
      <p>You requested to reset your password. Click below:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link is valid for 10 minutes.</p>
    `,
  });

  res.status(200).json({ message: "Reset Link sent to user via email" });
};

// reset password with token
// POST /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() }, // not expired yet
  });

  if (!user)
    return res.status(404).json({ message: "Invalid token or expired" });

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
};

// incase user wants to change their password
// POST /api/auth/change-password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.matchPassword(oldPassword);
  if (!isMatch)
    return res.status(400).json({ message: "Old Password is not matching" });

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
};

// controller for login user
// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Account not verified by admin" });
  }

  res.status(201).json({
    message: "Login done successfully",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// GET /api/auth/me
// for gettig information of user
export const getMe = async (req, res) => {
  res.json(req.user);
};
