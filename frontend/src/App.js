import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Register from './components/Register'
import Login from './components/Login'
import axios from 'axios'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (token) {
      axios
        .get('/api/expenses', { headers: { 'x-auth-token': token } })
        .then((res) => setExpenses(res.data))
        .catch((err) => console.log(err))
    }
  }, [token])

  const addExpense = (expense) => {
    axios
      .post('/api/expenses', expense, { headers: { 'x-auth-token': token } })
      .then((res) => setExpenses([...expenses, res.data]))
      .catch((err) => console.log(err))
  }

  const deleteExpense = (id) => {
    axios
      .delete(`/api/expenses/${id}`, { headers: { 'x-auth-token': token } })
      .then(() => setExpenses(expenses.filter((expense) => expense._id !== id)))
      .catch((err) => console.log(err))
  }

  const handleLogin = (newToken) => {
    localStorage.setItem('authToken', newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setToken('')
  }

  if (!token) {
    return (
      <div>
        <h2>Register</h2>
        <Register />
        <h2>Login</h2>
        <Login onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <Button onClick={handleLogout}>Logout</Button>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  )
}

export default App
