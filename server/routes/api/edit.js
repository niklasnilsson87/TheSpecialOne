const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')

// User Model
const User = require('../../models/User')

router.post('/', auth, async (req, res) => {
  const { desc, favPlayer, favTeam, email } = req.body

  const userUpdate = await User.findOne({ email }).select('-password')
  userUpdate.description = desc
  userUpdate.favPlayer = favPlayer
  userUpdate.favTeam = favTeam
  await userUpdate.save()
  res.json(userUpdate)
})

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({}).select('-password')
    res.json(allUsers)
  } catch (err) {
    res.status(500).json({ msg: 'Could not find any users' })
  }
})

router.post('/points', auth, async (req, res) => {
  const { homeTeam, awayTeam, lastGame, point, decider } = req.body
  try {
    const homeTeamUpdate = await User.findById({ _id: homeTeam._id }).select('-password')
    const awayTeamUpdate = await User.findById({ _id: awayTeam._id }).select('-password')
    console.log(awayTeamUpdate.totalPoints)
    console.log(homeTeamUpdate.totalPoints)
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

    console.log(awayTeamUpdate)
    console.log(homeTeamUpdate)

    await awayTeamUpdate.save()
    await homeTeamUpdate.save()
    await res.json(homeTeamUpdate)
  } catch (error) {
    console.log('error from post: ', error)
    res.json(homeTeam)
  }
})

module.exports = router
