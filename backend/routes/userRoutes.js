import express from 'express'
import { register, authenticate } from '../controllers/userController.js';

const router = express.Router(); 

// Autenticación, registro y confirmación de usuarios

router.post("/", register)  // Crea un nuevo usuario
router.post("/login", authenticate)


export default router  