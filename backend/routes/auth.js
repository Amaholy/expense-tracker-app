const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateToken } = require('../utils/token')
const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'User registered' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = generateToken(user)
    console.log('Generated token:', token)
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
