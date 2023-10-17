import express from 'express'

const router = express.Router(); 

router.get("/", (req, res) => {
    res.send('From API/USERS')
})

export default router 