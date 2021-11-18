const jwt = require('jsonwebtoken')

// check token
const Authenticate = async(req, res, next) => {
    const authHeader = req.header('Authorization')

    if (!authHeader){
        return res.json('Token not found !')
    }

    const token = authHeader.split(" ")[1]
   
    try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.userId = decoded.userId 
		next()
	} catch (error) {
		console.log(error)
		return res.status(401).json({ success: false, message: error.message })
	}
}

module.exports = { Authenticate }