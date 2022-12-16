const mongoose = require('mongoose')

/**
 * Schema for Player
 */
const playerSchema = new mongoose.Schema({
  owner: { type: String },
  team: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  country: { type: String },
  birthday: { type: String },
  face: { type: Object },
  attributes: {
    tecnical: {
      dribbling: Number,
      finishing: Number,
      heading: Number,
      marking: Number,
      tackling: Number,
      passing: Number,
      crossing: Number
    },
    mental: {
      aggression: Number,
      bravery: Number,
      composure: Number,
      concentration: Number,
      leadership: Number,
      positioning: Number,
      teamWork: Number,
      workRate: Number
    },
    physical: {
      speed: Number,
      balance: Number,
      jumping: Number,
      stamina: Number,
      strength: Number
    }
  },
  totalValue: {
    type: Number
  }
})

// Creates a model for Player
const Player = mongoose.model('Player', playerSchema)

// Exports
module.exports = Player
