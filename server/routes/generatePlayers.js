const Player = require('../models/Player')
const chance = require('chance').Chance()
const faces = require('facesjs')

/**
 * Creates a new random player.
 *
 * @param {String} owner id of manager that owns the player
 * @param {String} team Team name of the player
 */
function generatePlayer(owner, team) {
  const birthday = chance.birthday({
    year: chance.year({ min: 1979, max: 2006 })
  })
  const newPlayer = new Player({
    team: team,
    owner: owner,
    firstname: chance.first({ gender: 'male' }),
    lastname: chance.last(),
    age: new Date().getFullYear() - birthday.toString().substring(11, 15),
    face: faces.generate(),
    birthday: birthday,
    country: chance.country({ full: true }),
    attributes: {
      tecnical: {
        finishing: chance.integer({ min: 1, max: 20 }),
        dribbling: chance.integer({ min: 1, max: 20 }),
        heading: chance.integer({ min: 1, max: 20 }),
        marking: chance.integer({ min: 1, max: 20 }),
        tackling: chance.integer({ min: 1, max: 20 }),
        passing: chance.integer({ min: 1, max: 20 }),
        crossing: chance.integer({ min: 1, max: 20 })
      },
      mental: {
        aggression: chance.integer({ min: 1, max: 20 }),
        bravery: chance.integer({ min: 1, max: 20 }),
        composure: chance.integer({ min: 1, max: 20 }),
        concentration: chance.integer({ min: 1, max: 20 }),
        leadership: chance.integer({ min: 1, max: 20 }),
        positioning: chance.integer({ min: 1, max: 20 }),
        teamWork: chance.integer({ min: 1, max: 20 }),
        workRate: chance.integer({ min: 1, max: 20 })
      },
      physical: {
        speed: chance.integer({ min: 1, max: 20 }),
        balance: chance.integer({ min: 1, max: 20 }),
        jumping: chance.integer({ min: 1, max: 20 }),
        stamina: chance.integer({ min: 1, max: 20 }),
        strength: chance.integer({ min: 1, max: 20 })
      }
    }
  })

  // Counts the values of the players attributes.
  const tecnicalValues = Object.values(newPlayer.attributes.tecnical).reduce(
    (a, b) => a + b
  )
  const mentalValues = Object.values(newPlayer.attributes.mental).reduce(
    (a, b) => a + b
  )
  const physicalValues = Object.values(newPlayer.attributes.physical).reduce(
    (a, b) => a + b
  )

  newPlayer.totalValue = tecnicalValues + mentalValues + physicalValues

  return newPlayer.save()
}

// Exports
module.exports = {
  generatePlayer
}
