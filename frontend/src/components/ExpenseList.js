import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'

const ExpenseList = ({ expenses, onDelete }) => {
  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken')

    try {
      await axios.delete(`/api/expenses/${id}`, {
        headers: { 'x-auth-token': token },
      })
      onDelete(id)
    } catch (err) {
      alert('Error deleting expense')
      console.error(
        'Error deleting expense:',
        err.response ? err.response.data : err.message
      )
    }
  }

  return (
    <ListGroup>
      {expenses.map((expense) => (
        <ListGroup.Item key={expense._id}>
          {expense.description} - ${expense.amount} - {expense.category}
          <Button
            variant="danger"
            onClick={() => handleDelete(expense._id)}
            style={{ float: 'right' }}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ExpenseList
