
import React, { useState } from 'react';
import './TodoList.css'; 

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task.trim()]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="main-wrapper">
    <div className="todo-container">
      <h1 className="todo-title">Lista de Tareas</h1>
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Escribe una nueva tarea..."
        />
        <button onClick={addTask} className="todo-button">
          Añadir
        </button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">
            {task}
            <button onClick={() => deleteTask(index)} className="todo-delete-button">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TodoList;
