const router = require('express').Router()
require('dotenv').config()

const { sign, saltAndHash } = require('../../config/helper/jwt')
const { generatePlayer } = require('../generatePlayers')
const User = require('../../models/User')

// @route   POST api/signup
// @desc    Register new user
// @access  Public
router.post('/', async (req, res) => {
  console.log(req.body)
  const { name, email, password, teamName } = req.body

  // validation
  if (!name || !email || !password || !teamName) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  const user = await User.findOne({ email })

  if (user) return res.status(400).json({ msg: 'User already exist' })

  // Creates new user
  const newUser = new User({
    name,
    email,
    password,
    teamName
  })

  await saltAndHash(newUser)
  newUser.save()

  const token = await sign(newUser)

  // Generate 15 players to the new user
  for (let i = 0; i <= 15; i++) {
    generatePlayer(newUser.id, newUser.teamName)
  }

  res.json({
    token,
    user: {
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      teamName: newUser.teamName,
      description: newUser.description,
      favTeam: newUser.favTeam,
      favPlayer: newUser.favPlayer,
      totalPoints: newUser.totalPoints,
      lastPlayed: newUser.lastPlayed
    }
  })
})

// Exports
module.exports = router
