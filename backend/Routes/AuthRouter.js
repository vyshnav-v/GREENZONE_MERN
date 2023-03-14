import express from "express";
import { login, Register } from "../Controllers/AuthController.js";

const router = express.Router();


router.post('/register',Register)
router.post("/login", login); 


export default router;
