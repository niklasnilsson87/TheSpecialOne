const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')
const User = require('../../models/User')

// @route   POST api/edit
// @desc    Update manager description
// @access  Private
router.post('/', auth, async (req, res) => {
  const { desc, favPlayer, favTeam, email } = req.body
  try {
    const userUpdate = await User.findOne({ email }).select('-password')
    userUpdate.description = desc
    userUpdate.favPlayer = favPlayer
    userUpdate.favTeam = favTeam
    await userUpdate.save()
    res.json(userUpdate)
  } catch (error) {
    res.json({ msg: 'Could not update player' })
  }
})

// @route   GET api/edit
// @desc    Sends all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({}).select('-password')
    res.json(allUsers)
  } catch (err) {
    res.status(500).json({ msg: 'Could not find any users' })
  }
})

// @route   POST api/edit/points
// @desc    Update manager points and last played game
// @access  Private
router.post('/points', auth, async (req, res) => {
  const { homeTeam, awayTeam, lastGame, point, decider } = req.body
  try {
    const homeTeamUpdate = await User.findById({ _id: homeTeam._id }).select(
      '-password'
    )
    const awayTeamUpdate = await User.findById({ _id: awayTeam._id }).select(
      '-password'
    )
    if (decider === 'win') {
      homeTeamUpdate.totalPoints = homeTeamUpdate.totalPoints + point
      homeTeamUpdate.lastPlayed = lastGame
    } else if (decider === 'lose') {
      homeTeamUpdate.lastPlayed = lastGame
      awayTeamUpdate.totalPoints = awayTeamUpdate.totalPoints + point
    } else if (decider === 'draw') {
      homeTeamUpdate.totalPoints = homeTeamUpdate.totalPoints + point
      homeTeamUpdate.lastPlayed = lastGame
      awayTeamUpdate.totalPoints = awayTeamUpdate.totalPoints + point
    }

    await awayTeamUpdate.save()
    await homeTeamUpdate.save()
    res.json(homeTeamUpdate)
  } catch (error) {
    res.json({ msg: 'Could not update points' })
  }
})

// Exports
module.exports = router
