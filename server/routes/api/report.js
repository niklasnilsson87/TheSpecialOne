const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')
const Report = require('../../models/Report')

// @route   GET api/report
// @desc    Sends all match reports
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find({})
    res.json(reports)
  } catch (error) {
    res.json({ msg: 'something went wrong', err: error })
  }
})

// @route   POST api/report
// @desc    Creates new report and saves it to MongoAtlas
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newReport = new Report({
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      homeTeamGoals: req.body.homeTeamGoals,
      awayTeamGoals: req.body.awayTeamGoals,
      report: req.body.report
    })

    await newReport.save()
    res.json(newReport)
  } catch (error) {
    res.json({ msg: 'something went wrong', err: error })
  }
})

// Exports
module.exports = router
