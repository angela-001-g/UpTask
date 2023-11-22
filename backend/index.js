import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
 
const app = express(); 
app.use(express.json())

dotenv.config()

connectDB();

// Configurar CORS

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){

        if(whitelist.indexOf(origin) !== -1 || !origin){
            // Puede consultar la API
            callback(null, true)
        } else {
            // No está permitido
            callback(new Error('Cors error'))
        }
    }
}

app.use(cors(corsOptions))

// Routing 

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 4000 

const serv = app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
}) 

// Socket.io

import { Server } from 'socket.io'
const io = new Server(serv, {
    pingTimeout: 60000,
    cors: {
    origin: process.env.FRONTEND_URL
    }
})

io.on('connection', (socket) => {
    console.log('Conected to socket.io'); 

    // Define socket.io events
})