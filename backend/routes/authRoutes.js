import express from "express"
import { authUser,loginUser } from "../controllers/authControllers.js"


const router =express.Router()

router.post('/register',authUser);
router.post('/login',loginUser)

export default router;