import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import Navbar from "./components/Navbar";
import Home from './pages/Home';
import CoursesIndex from './pages/courses/Index';
import LecturersIndex from './pages/lecturers/Index';
import EnrolmentsIndex from './pages/enrolments/Index';
import User from "./pages/User";

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
        <Route path='/lecturers' element={<LecturersIndex />} />
        <Route path='/enrolments' element={<EnrolmentsIndex />} />
        <Route path='/user' element={<User />} />
      </>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {protectedRoutes}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
