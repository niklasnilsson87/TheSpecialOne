const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')
const Player = require('../../models/Player')
const User = require('../../models/User')

// @Route  POST api/players
// @desc   Sends Managers Players
// access  Private
router.post('/', auth, async (req, res) => {
  const { _id } = req.body
  try {
    const players = await Player.find({ owner: _id }).exec()
    res.json(players)
  } catch (error) {
    res.status(400).json({ msg: 'Could not find any players' })
  }
})

// @route   POST api/player/update
// @desc    Update player training
// @access  Private
router.post('/update', auth, async (req, res) => {
  const _id = req.body.trainplayer._id
  const updatePlayer = req.body.trainplayer
  const user = req.body.user
  const updatePoints = req.body.traningPoints

  try {
    await Player.replaceOne({ _id }, updatePlayer)
    await User.updateOne({ _id: user._id }, {
      $set: { totalPoints: updatePoints }
    })
    res.json(updatePoints)
  } catch (error) {
    res.status(400).json({ msg: 'Could not update player..' })
  }
})

// Exports
module.exports = router
