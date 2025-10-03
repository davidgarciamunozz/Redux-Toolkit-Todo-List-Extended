import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { addTodo, toggleTodo, deleteTodo } from './store/todosSlice'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const todos = useAppSelector((state) => state.todos.todos)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue))
      setInputValue('')
    }
  }

  const handleToggle = (id: string) => {
    dispatch(toggleTodo(id))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id))
  }

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To Do extended</h1>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Añadir nueva tarea..."
            className="todo-input"
          />
          <button type="submit" className="add-button">
            Añadir
          </button>
        </form>

        <div className="todos-list">
          {todos.length === 0 ? (
            <p className="empty-message">No hay tareas hasta ahora.</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className={todo.completed ? 'completed' : ''}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="todo-stats">
            <span>Total: {todos.length}</span>
            <span>Completadas: {todos.filter(t => t.completed).length}</span>
            <span>Pendientes: {todos.filter(t => !t.completed).length}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
