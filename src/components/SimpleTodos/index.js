import React, {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todosList: [
        {
          id: 1,
          title: 'Book the ticket for today evening',
          completed: false,
        },
        {
          id: 2,
          title: 'Rent the movie for tomorrow movie night',
          completed: false,
        },
        {
          id: 3,
          title: 'Confirm the slot for the yoga session tomorrow morning',
          completed: false,
        },
        {
          id: 4,
          title: 'Drop the parcel at Bloomingdale',
          completed: false,
        },
        {
          id: 5,
          title: 'Order fruits on Big Basket',
          completed: false,
        },
        {
          id: 6,
          title: 'Fix the production issue',
          completed: false,
        },
        {
          id: 7,
          title: 'Confirm my slot for Saturday Night',
          completed: false,
        },
        {
          id: 8,
          title: 'Get essentials for Sunday car wash',
          completed: false,
        },
      ],
      newTodoTitle: '',
    }
  }

  onDeleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  onAddTodo = () => {
    const {newTodoTitle, todosList} = this.state
    if (!newTodoTitle.trim()) return

    const parts = newTodoTitle.trim().split(' ')
    const lastPart = parts[parts.length - 1]
    const count = parseInt(lastPart, 10)

    if (!Number.isNaN(count) && parts.length > 1) {
      const baseTitle = parts.slice(0, -1).join(' ')
      const newTodos = Array.from({length: count}, (_, i) => ({
        id:
          todosList.length > 0
            ? Math.max(...todosList.map(t => t.id)) + i + 1
            : i + 1,
        title: baseTitle,
        completed: false,
      }))
      this.setState(prevState => ({
        todosList: [...prevState.todosList, ...newTodos],
        newTodoTitle: '',
      }))
    } else {
      const newTodo = {
        id:
          todosList.length > 0 ? Math.max(...todosList.map(t => t.id)) + 1 : 1,
        title: newTodoTitle.trim(),
        completed: false,
      }
      this.setState(prevState => ({
        todosList: [...prevState.todosList, newTodo],
        newTodoTitle: '',
      }))
    }
  }

  onToggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  onUpdateTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  handleInputChange = e => {
    this.setState({newTodoTitle: e.target.value})
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onAddTodo()
    }
  }

  render() {
    const {todosList, newTodoTitle} = this.state
    return (
      <div className="app-container">
        <div className="todo-app-container">
          <h1 className="main-heading" data-testid="main-heading">
            Simple Todos
          </h1>
          <div className="input-container">
            <input
              type="text"
              className="todo-input"
              value={newTodoTitle}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              placeholder="What needs to be done?"
              data-testid="todo-input"
            />
            <button
              type="button"
              className="add-button"
              onClick={this.onAddTodo}
              data-testid="add-button"
            >
              Add
            </button>
          </div>
          <ul className="todos-list" data-testid="todosList">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                onDeleteTodo={this.onDeleteTodo}
                onToggleComplete={this.onToggleComplete}
                onUpdateTodo={this.onUpdateTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
