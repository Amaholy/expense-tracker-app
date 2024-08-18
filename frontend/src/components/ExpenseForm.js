import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const ExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('authToken')
    console.log('Submitting expense:', { description, amount, category })

    try {
      const res = await axios.post(
        '/api/expenses',
        {
          description,
          amount,
          category,
        },
        {
          headers: { 'x-auth-token': token },
        }
      )
      onAddExpense(res.data)
      setDescription('')
      setAmount('')
      setCategory('')
    } catch (err) {
      alert('Error adding expense')
      console.error(
        'Error adding expense:',
        err.response ? err.response.data : err.message
      )
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option>Food</option>
          <option>Entertainment</option>
          <option>Housing</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Expense
      </Button>
    </Form>
  )
}

export default ExpenseForm
