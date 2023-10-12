import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
          navigate('/'); // Redirect to login if no token is found
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/userDetails`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log('Response:', response);

        if (response.status === 200) {
          console.log('UserData:', response.data);
          setUserData(response.data);
        } else {
          console.error('Error response:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='container'>
      <div className='home-container'>
        <h1 className='title'>Welcome to the Home Page</h1>
        {userData && (
          <div className='user-details'>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>
        )}
        <button className='form-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
