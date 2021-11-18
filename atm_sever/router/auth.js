const router = require('express').Router();
const User = require('../models/user')
const { Authenticate } = require('../middleWares/auth')
const { register,
        login } = require('../controller/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/', Authenticate, async (req, res) => {
    try {
		const user = await User.findById(req.userId)
		if (!user)
			return res.json({ success: false, message: 'User not found' })
		res.json({ user })
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
})

module.exports = router; 