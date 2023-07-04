import React, { useState } from 'react';

export default function MyCustomWidget() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleTaskComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
  const updatedTasks = [...tasks];
  const newTaskName = prompt('Enter the new task name:');
  if (newTaskName.trim() !== '') {
    updatedTasks[index].task = newTaskName;
    setTasks(updatedTasks);
  }
};

  const handleToggleMenu = (index) => {
    const menuElement = document.getElementById(`menu-${index}`);
    menuElement.style.display = menuElement.style.display === 'block' ? 'none' : 'block';
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <form onSubmit={handleAddTask} style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="New Todo"
          value={newTask}
          onChange={handleInputChange}
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskComplete(index)}
              />
              <span
                style={{
                  marginLeft: '0.5rem',
                  textDecoration: task.completed ? 'line-through solid' : 'none',
                  color: task.completed ? 'lightgray' : 'inherit',
                }}
              >
                {task.task}
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  padding: '0.2rem 0.5rem',
                  backgroundColor: '#808080',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                }}
                onClick={() => handleToggleMenu(index)}
              >
                &#8942;
              </button>
              <div
                id={`menu-${index}`}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                  display: 'none',
                }}
              >
                <button
                  style={{
                    display: 'block',
                    padding: '0.2rem 0.5rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
                <button
                  style={{
                    display: 'block',
                    padding: '0.2rem 0.5rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleEditTask(index)}
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
