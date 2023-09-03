const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

router.post("/register", async (req, res) => {
  const user = req.body
  user.password = await bcrypt.hash(user.password, 10)
  const newUser = await User.create(user)
  res.send(newUser)
})

router.post("/login", async (req, res) => { 
  const { email, password } = req.body
  const dbUser = await User.findOne({ email })
  if (!dbUser) {
    return res.status(404).send('User not found')
  }

  if (!password) {
    return res.status(400).send('Invalid username or password')
  }

  const isValidPassword = await bcrypt.compare(password, dbUser.password)
  if (!isValidPassword) {
    return res.status(401).send('Invalid username or password')
  }

  return res.status(200).send('Login successful')
})

module.exports = router