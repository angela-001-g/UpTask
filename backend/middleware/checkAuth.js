
const checkAuth = (req, res, next) => {
    console.log('from checkauth.js')

    next()
}

export default checkAuth