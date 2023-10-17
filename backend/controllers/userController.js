import User from '../models/User.js'
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';

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

const authenticate = async (req, res) => {

    const{email, password} = req.body;

    // Comprobar si el usuario existe 
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('Username does not exist')
        return res.status(404).json({msg: error.message})
    }

    // Comprobar si el usuario está confirmado
    if(!user.confirmed){
        const error = new Error('Your account has not been confirmed')
        return res.status(403).json({msg: error.message})
    }

    // Comprobar su password
    if(await user.checkPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else {
        const error = new Error('Password is incorrect')
        return res.status(403).json({msg: error.message})
    }
}

const confirm = async(req, res) => {
    console.log(req.params)
}

export {register, authenticate, confirm}