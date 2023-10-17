import express from 'express'
import { register } from '../controllers/userController.js';

const router = express.Router(); 

// Autenticación, registro y confirmación de usuarios

router.post("/", register)  // Crea un nuevo usuario



export default router  