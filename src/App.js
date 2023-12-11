import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import SignupForm from './components/SignupForm';

import CoursesIndex from './pages/courses/Index';
import CourseShow from './pages/courses/Show';
import CourseCreate from './pages/courses/Create';

import LecturersIndex from './pages/lecturers/Index';
import LecturerShow from './pages/lecturers/Show';

import EnrolmentsIndex from './pages/enrolments/Index';
import EnrolmentsShow from './pages/enrolments/Show';

import User from './pages/User';
import PageNotFound from './pages/PageNotFound';

function App() {
  const { authenticated, onAuthenticated } = useAuth();

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      onAuthenticated(true);
    }
  }, []);


  if(authenticated){
    protectedRoutes = (
      <>
        <Route path='/courses' element={<CoursesIndex />} />
        <Route path='/courses/:id' element={<CourseShow />} />
        <Route path='/courses/create' element={<CourseCreate />} />

        <Route path='/lecturers' element={<LecturersIndex />} />
        <Route path='/lecturers/:id' element={<LecturerShow />} />

        <Route path='/enrolments' element={<EnrolmentsIndex />} />
        <Route path='/enrolments/:id' element={<EnrolmentsShow />} />
        
        <Route path='/user' element={<User />} />
      </>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/logout' element={<Logout />} />
        {protectedRoutes}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
