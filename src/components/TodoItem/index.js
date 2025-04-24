import React, {useState} from 'react'
import './index.css'

const TodoItem = ({
  todoDetails,
  onDeleteTodo,
  onToggleComplete,
  onUpdateTodo,
}) => {
  const {id, title, completed} = todoDetails
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const handleDelete = () => onDeleteTodo(id)
  const handleToggleComplete = () => onToggleComplete(id)

  const handleEdit = () => {
    setEditedTitle(title)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdateTodo(id, editedTitle.trim())
      setIsEditing(false)
    }
  }

  const handleTitleChange = e => setEditedTitle(e.target.value)

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggleComplete}
        className="checkbox-input"
        data-testid="checkbox-input"
      />
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          className="edit-input"
          data-testid="edit-input"
        />
      ) : (
        <p className="todo-title" data-testid="todo-title">
          {title}
        </p>
      )}
      <div className="buttons-container">
        {isEditing ? (
          <button
            type="button"
            className="save-button"
            onClick={handleSave}
            data-testid="save-button"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            className="edit-button"
            onClick={handleEdit}
            data-testid="edit-button"
          >
            Edit
          </button>
        )}
        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          data-testid="delete-button"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
