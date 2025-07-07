import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserInfo,
  verifyUser,
  deleteUser,
} from "../controllers/adminController.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create a new user (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created and welcome email sent
 *       400:
 *         description: User already exists
 */
router.post("/", createUser);

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: verified
 *         schema:
 *           type: string
 *         description: Filter unverified users (use ?verified=false)
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Get user details by ID (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details (excluding password)
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update user info and role (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:id", updateUserInfo);

/**
 * @swagger
 * /api/admin/{id}/verify:
 *   put:
 *     summary: Manually verify a user account (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User verified successfully
 *       404:
 *         description: User not found
 */
router.put("/:id/verify", verifyUser);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete a user from the system (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", deleteUser);

export default router;
