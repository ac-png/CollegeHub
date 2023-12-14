// Importing necessary modules from React and external libraries
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import CourseEdit from './pages/courses/Edit';

import LecturersIndex from './pages/lecturers/Index';
import LecturersShow from './pages/lecturers/Show';
import LecturersCreate from './pages/lecturers/Create';
import LecturersEdit from './pages/lecturers/Edit';

import EnrollmentsIndex from './pages/enrollments/Index';
import EnrollmentsShow from './pages/enrollments/Show';
import EnrollmentsCreate from './pages/enrollments/Create';
import EnrollmentsEdit from './pages/enrollments/Edit';

import User from './pages/User';
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';

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
  });

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
      <Route path='/' element={<Home />} />

      {!authenticated && (
        <>
          {/* Redirect to login page for all protected routes */}
          {[
            '/courses',
            '/courses/:id',
            '/courses/create',
            '/courses/edit/:id',
            '/lecturers',
            '/lecturers/:id',
            '/lecturers/create',
            '/lecturers/edit/:id',
            '/enrollments',
            '/enrollments/:id',
            '/enrollments/create',
            '/enrollments/edit/:id',
            '/user',
          ].map((path) => (
            <Route key={path} path={path} element={<Navigate to="/login" />} />
          ))}
        </>
      )}

      {/* Displaying protected routes if user is authenticated */}
      {authenticated && [
        // Routes for Courses
        <Route key="/courses" path='/courses' element={<CoursesIndex />} />,
        <Route key="/courses/:id" path='/courses/:id' element={<CourseShow />} />,
        <Route key="/courses/create" path='/courses/create' element={<CourseCreate />} />,
        <Route key="/courses/edit/:id" path='/courses/edit/:id' element={<CourseEdit />} />,

        // Routes for Lecturers
        <Route key="/lecturers" path='/lecturers' element={<LecturersIndex />} />,
        <Route key="/lecturers/:id" path='/lecturers/:id' element={<LecturersShow />} />,
        <Route key="/lecturers/create" path='/lecturers/create' element={<LecturersCreate />} />,
        <Route key="/lecturers/edit/:id" path='/lecturers/edit/:id' element={<LecturersEdit />} />,

        // Routes for Enrollments
        <Route key="/enrollments" path='/enrollments' element={<EnrollmentsIndex />} />,
        <Route key="/enrollments/:id" path='/enrollments/:id' element={<EnrollmentsShow />} />,
        <Route key="/enrollments/create" path='/enrollments/create' element={<EnrollmentsCreate />} />,
        <Route key="/enrollments/edit/:id" path='/enrollments/edit/:id' element={<EnrollmentsEdit />} />,

        // Route for User profile
        <Route key="/user" path='/user' element={<User />} />,
      ]}

      {/* Catch-all route for Page Not Found */}
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </Router>
);

}

// Exporting the App
export default App;
