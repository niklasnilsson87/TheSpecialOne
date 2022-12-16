const mongoose = require('mongoose')

/**
 * Schema for User
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  face: {
    type: Object
  },
  password: {
    type: String,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Edit profile to change description'
  },
  favPlayer: {
    type: String,
    default: ''
  },
  favTeam: {
    type: String,
    default: ''
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  totalPoints: {
    type: Number,
    default: 10
  },
  lastPlayed: {
    type: Number,
    default: 0
  }
})

// Creates a model for User
const User = mongoose.model('User', userSchema)

// Exports
module.exports = User
