import express from "express";
import router from "./notesRoutes";
import { login } from "../controllers/authController";
import { register } from "../controllers/authController";

router.post("/login", login);

router.post("/register", register);
