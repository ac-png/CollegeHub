// Importing necessary modules from React and external libraries
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Importing components
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import SignupForm from './components/SignupForm';

// Importing pages
import CoursesIndex from './pages/courses/Index';
import CourseShow from './pages/courses/Show';
import CourseCreate from './pages/courses/Create';

import LecturersIndex from './pages/lecturers/Index';
import LecturerShow from './pages/lecturers/Show';

import EnrollmentsIndex from './pages/enrollments/Index';
import EnrollmentsShow from './pages/enrollments/Show';

import User from './pages/User';
import PageNotFound from './pages/PageNotFound';

function App() {
  // Using the authentication
  const { authenticated, onAuthenticated } = useAuth();

  // Setting up protected routes
  useEffect(() => {
    // Checking if a token is stored in localStorage
    if (localStorage.getItem('token')) {
      // If token is found, user is authenticated
      onAuthenticated(true);
    }
  }, []);

  // Variable to hold protected routes if user is authenticated
  let protectedRoutes;

  // Checking if user is authenticated to determine if protected routes should be used
  if (authenticated) {
    protectedRoutes = (
      <>
        {/* Routes for Courses */}
        <Route path='/courses' element={<CoursesIndex />} />
        <Route path='/courses/:id' element={<CourseShow />} />
        <Route path='/courses/create' element={<CourseCreate />} />

        {/* Routes for Lecturers */}
        <Route path='/lecturers' element={<LecturersIndex />} />
        <Route path='/lecturers/:id' element={<LecturerShow />} />

        {/* Routes for Enrollments */}
        <Route path='/enrollments' element={<EnrollmentsIndex />} />
        <Route path='/enrollments/:id' element={<EnrollmentsShow />} />

        {/* Route for User profile */}
        <Route path='/user' element={<User />} />
      </>
    );
  }

  // Rendering the main structure of the app
  return (
    <Router>
      {/* Displaying the Navbar component */}
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/logout' element={<Logout />} />

        {/* Displaying protected routes if user is authenticated */}
        {protectedRoutes}

        {/* Catch-all route for Page Not Found */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

// Exporting the App
export default App;
