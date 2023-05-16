import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

export default function AddTask() {
  // State variables to track the task title and description
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // Event handler for task title change
  const handleTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  // Event handler for task description change
  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  // Event handler for adding a task
  const handleAddTask = async () => {
    try {
      // Make a POST request to the server to add the task
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the 'Authorization' header
        },
        body: JSON.stringify({ title: taskTitle, description: taskDescription }),
      });

      if (response.ok) {
        // Task added successfully
        toast.success('Task added successfully');
        // Reset task title and description
        setTaskTitle('');
        setTaskDescription('');
        window.location.href = '/dashboard';
      } else {
        // Error adding the task, display the error message from the server
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      // An error occurred while making the request
      console.error('An error occurred:', error);
      toast.error('An error occurred while adding the task');
    }
  };

  return (
    <div>
      {/* Input field for task title */}
      <TextField
        label="Title"
        value={taskTitle}
        onChange={handleTitleChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      {/* Input field for task description */}
      <TextField
        label="Description"
        value={taskDescription}
        onChange={handleDescriptionChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      {/* Button to add the task */}
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};

