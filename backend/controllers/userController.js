import User from '../models/User.js'

const register = async (req, res) => {

    try {
        const user = new User(req.body)
        const storedUser = await user.save()
        res.json(storedUser);
    } catch (error) {
        console.log(error)
    }

}

export {register}