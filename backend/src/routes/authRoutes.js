import express from "express";
import { login } from "../controllers/authController";
import { register } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);
