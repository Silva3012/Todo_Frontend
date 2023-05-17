import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Protected route component
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');

    if (!token) {
      // If token doesn't exist, navigate to the register page
      navigate('/register');
    }
  }, [navigate]);

  return children;
};
 