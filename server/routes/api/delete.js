const router = require('express').Router()
const User = require('../../models/User')
const Player = require('../../models/Player')
const auth = require('../../middleware/authMiddleware')

// @route   POST api/delete
// @desc    Removing user and players thats been created from test.
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.body.id })
    await Player.deleteMany({ owner: req.body.id })
    res.json({ Success: true })
  } catch (error) {
    res.json({ err: error })
  }
})

// Exports
module.exports = router
