import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTodos = localStorage.getItem("tasks");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');



  useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAddTask = () => {
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <Container maxWidth="md" className="App">
      <h1>To-Do List</h1>
      <div>
        <TextField
          label="Enter task title"
          variant="outlined"
          fullWidth
          value={taskTitle}
          onChange={handleTaskTitleChange}
          margin="normal"
        />
        <TextField
          label="Enter task description"
          variant="outlined"
          fullWidth
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" className='add-task' onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <div>
        <div className='total-task'>
          <h2>Tasks</h2>
          <p>Total tasks: {tasks.length}</p>
        </div>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} className={task.completed ? 'task-completed' : ''}  >
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
                onChange={() => handleToggleComplete(task.id)}
              />
              <div >
                <ListItemText
                  primary={task.title}
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                />
                {task.description && <p>{task.description}</p>}
              </div>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default App;
