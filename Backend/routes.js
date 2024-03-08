//routes.js
import express from "express";
import {signupRouter,loginRouter} from "./controller.js";
export const router = express.Router();

router.post("/signup",signupRouter);
router.post("/login", loginRouter);

