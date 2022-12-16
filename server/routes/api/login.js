const router = require('express').Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()

const auth = require('../../middleware/authMiddleware')
const { sign } = require('../../config/helper/jwt')
const User = require('../../models/User')

// @route   POST api/login
// @desc    Authenticate user
// @access  Public
router.post('/', async (req, res) => {
  console.log(req)
  const { email, password } = req.body

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ msg: 'User does not exist' })

  // validate password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

  const token = await sign(user)

  res.json({
    token,
    user: {
      _id: user.id,
      name: user.name,
      email: user.email,
      teamName: user.teamName,
      description: user.description,
      favTeam: user.favTeam,
      favPlayer: user.favPlayer,
      totalPoints: user.totalPoints,
      lastPlayed: user.lastPlayed
    }
  })
})

// @route   GET api/login/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  return res.json(user)
})

// Exports
module.exports = router
