import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Checkbox, List, ListItem, MenuItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function App() {
  console.log(localStorage.getItem("tasks"));
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
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [showCompletedTasks, setShowCompletedTasks] = useState(true)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };
  const filteredTasks = tasks.filter(task =>
    task.completed === showCompletedTasks
  );
  const handleTaskDueDateChange = (e) => {
    setTaskDueDate(e.target.value);
  };

  const handleAddTask = () => {
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
        priority: taskPriority,
        dueDate: taskDueDate,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
      setTaskPriority('medium');
      setTaskDueDate('');
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
  const handleTaskPriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  let taskContainer = (task) => {
    return <ListItem key={task.id} dense button className={task.completed ? 'task-completed' : ''}>
      <Checkbox
        edge="start"
        checked={task.completed}
        tabIndex={-1}
        disableRipple
        onChange={() => handleToggleComplete(task.id)}
      />

      <div className='task-container'>
        <div className='task-box'>
          <ListItemText
            primary={task.title}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          />
          <div>
            {task.description && <p>{task.description}</p>}
            <div className='duedate'>
              <>{task.dueDate && <p><label>DueDate:</label> {task.dueDate}</p>}</>

            </div>
          </div>
        </div>
        <div>
          {task.priority && <div className={`priority ${task.priority == 'medium' ? 'medium' : task.priority == 'low' ? 'low' : 'high'}`}> {task.priority}</div>}
        </div>
      </div>

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>

    </ListItem>
  }

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
        <TextField
          label="Priority"
          variant="outlined"
          select
          fullWidth
          value={taskPriority}
          onChange={handleTaskPriorityChange}
          margin="normal"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          label="Due Date"
          type="date"
          variant="outlined"
          fullWidth
          value={taskDueDate}
          onChange={handleTaskDueDateChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" className='add-task' onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <div>
        <h2>Tasks</h2>
        <p>Total tasks: {tasks.length}</p>
        <List>
          {tasks.map(task => (
            taskContainer(task)
          ))}
        </List>
        <div className='show-completed-task'>
          <label>Show completed tasks:</label>
          <input
            type="checkbox"
            checked={showCompletedTasks}
            onChange={() => setShowCompletedTasks(!showCompletedTasks)}
          />
        </div>

        <List>
          {filteredTasks?.length > 0 ? showCompletedTasks && filteredTasks.map(task => {

            if (task.completed) {
              return taskContainer(task)
            }
          }) : <p className='no-completed-task'>No completed task</p>}
        </List>
      </div>
    </Container>
  );
};

export default App;