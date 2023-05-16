import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import { useParams } from 'react-router-dom';

// Component for editing a task
export default function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTask = async () => {
    try {
      const response = await fetch(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const taskData = await response.json();
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
      } else {
        toast.error(`Failed to fetch task: ${response.statusText}`);
      }
    } catch (error) {
      toast.error('An error occurred while fetching the task:', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  
  const onCancel = () => {
    // Navigate back to the dashboard
    window.location.href = '/dashboard';
  };

  const onUpdate = (updatedTask) => {
    // Update the task in the state or refetch the task data
    setTitle(updatedTask.title);
    setDescription(updatedTask.description);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onUpdate(updatedTask); // Notify the parent component about the task update
        toast.success('Task updated successfully');
        window.location.href = '/dashboard';
      } else {
        toast.error(`Failed to update task: ${response.statusText}`);
      }
    } catch (error) {
      toast.error('An error occurred while updating the task:', error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  

  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Task
        </Button>{' '}
        <Button type="button" onClick={onCancel} variant="outlined" color="primary">
          Cancel
        </Button>
      </form>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://ntsika.producedbysilva.co.za" target="_blank">
          Ntsika Silvano
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}
