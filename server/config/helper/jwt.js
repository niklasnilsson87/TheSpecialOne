const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')

/**
 * Function that helps sign a JWT token.
 *
 * @param {String} user User Id
 */
const sign = (user) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (error, token) => (error ? reject(error) : resolve(token))
    )
  )

/**
 * Salts and hash the password
 *
 * @param {String} user User Id
 */
const saltAndHash = (user) =>
  new Promise((resolve, reject) =>
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return reject(err)
        user.password = hash
        return resolve(user)
      })
    })
  )

// Exports
module.exports = {
  sign,
  saltAndHash,
}
