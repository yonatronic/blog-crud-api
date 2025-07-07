import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { swaggerDocs } from "./swagger.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Blog API Project is running.");
});

swaggerDocs(app);
const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`👋 app is listening at http://localhost:${PORT}`);
});
