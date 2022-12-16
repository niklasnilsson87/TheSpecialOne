const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')
const Comment = require('../../models/Comment')

// @route   POST api/comment
// @desc    Saves new comment in DB and sends it back.
// @access  Private
router.post('/', auth, async (req, res) => {
  const { sendTo, userid, teamName, comment, user } = req.body

  if (!comment)
    return res.status(400).json({ msg: 'Did you forget to write something?' })

  const newComment = new Comment({
    user,
    userid,
    sendTo,
    comment,
    teamName,
  })
  await newComment.save()
  res.json(newComment)
})

// @route   POST api/comment/getComment
// @desc    Finds owners comment and send it back.
// @access  Private
router.post('/getComment', auth, async (req, res) => {
  const { id } = req.body
  try {
    const comment = await Comment.find({ sendTo: id }).sort({ date: -1 })
    res.json(comment)
  } catch (error) {
    res.json({ msg: 'No comments with this user ID' })
  }
})

// Exports
module.exports = router
