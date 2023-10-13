import express from 'express'

const app = express(); 

console.log('desde index.js')

app.listen(4000, () => {
    console.log('servidor corriendo en el puerto 4000')
})