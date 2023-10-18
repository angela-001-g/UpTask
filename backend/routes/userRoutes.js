import express from 'express'
import { register, authenticate, confirm, forgotPassword, checkToken, newPassword } from '../controllers/userController.js';

const router = express.Router(); 

// Autenticación, registro y confirmación de usuarios

router.post("/", register)  // Crea un nuevo usuario
router.post("/login", authenticate)
router.get("/confirm/:token", confirm)
router.post("/forgot-password", forgotPassword)
router.route("/forgot-password/:token").get(checkToken).post(newPassword)


export default router  