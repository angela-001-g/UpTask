import User from '../models/User.js'
import generateId from '../helpers/generateId.js';

const register = async (req, res) => {
    // Evitar registros duplicados 
    const { email } = req.body;
    const userExists = await User.findOne({ email })

    if(userExists){
        const error = new Error('Alredy registred user')
        return res.status(400).json({msg: error.message})
    }

    try {
        const user = new User(req.body)
        user.token = generateId();
        const storedUser = await user.save()
        res.json(storedUser);
    } catch (error) {
        console.log(error)
    }

}

export {register}