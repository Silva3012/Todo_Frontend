import React, { useEffect, useState } from 'react';
import { Container, Typography, Skeleton, Link, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuAppBar from './AppBar';
import { toast } from 'react-toastify';
import AddTask from './AddTask';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Just copyright footer for fun :)
  function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://ntsika.producedbysilva.co.za" target="_blank">
        Ntsika Silvano
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
  }

  // Fetch all the tasks for the user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the 'Authorization' header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          toast.error(`Failed to fetch tasks: ${response.statusText}`);
        }
      } catch (error) {
        toast.error('An error occurred:', error);
      } finally {
        setLoading(false); // Set loading to false once the response is received
      }
    };

    fetchTasks();
  }, []);

  async function handleDeleteTask(taskId) {
  // Implementing the delete task functionality
  try { 
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      // Remove the deleted task from the task list
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully');
    } else {
      toast.error(`Failed to delete task: ${response.statusText}`);
    }
    } catch (error) {
      toast.error('An error occurred while deleting the task:', error);
    } 
  }

  return (
    <div>
       <MenuAppBar />
        <Container>
        <Typography variant="h5" component="h1" align="center">
            Welcome to your To-Do List 🙂
        </Typography>

        {/* Render the AddTask component */}
        <AddTask />

        <Typography variant="h6" component="h2" align="center">
          Task List
        </Typography>

        {/* Render the list of tasks or skeleton loading placeholders */}
        {loading ? (
            <>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            </>
        ) : (
            tasks.map((task) => (
              <Paper key={task._id} sx={{ my: 2, p: 2 }} elevation={10}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
              <Link to={`/tasks/${task._id}/edit`} component={RouterLink}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={() => handleDeleteTask(task._id)}>Delete</Button>
            </Paper>
            ))
        )}
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container> 
    </div> 
  );
};

