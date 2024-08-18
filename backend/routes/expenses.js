const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
  const { description, amount, category } = req.body

  if (!description || !amount || !category) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    console.log('Received data:', { description, amount, category })
    const newExpense = new Expense({
      description,
      amount,
      category,
      user: req.user.id,
    })

    const savedExpense = await newExpense.save()
    res.status(201).json(savedExpense)
  } catch (err) {
    console.error('Error adding expense:', err)
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id)
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' })
    }
    res.json({ message: 'Expense deleted' })
  } catch (err) {
    console.error('Error deleting expense:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
