import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controller/post-controller.js";
import upload from "../util/upload.js";
import {
  deleteComment,
  getComments,
  newComment,
} from "../controller/comment-controller.js";
const router = express.Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
router.post("/create",authenticateToken, createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getPost);
router.put("/update/:id",authenticateToken, updatePost);
router.delete("/deletePost/:id",authenticateToken, deletePost);
router.post("/comment/new",authenticateToken, newComment);
router.get("/comments/:id", getComments);
router.delete("/comment/delete/:id",authenticateToken, deleteComment);
export default router;
