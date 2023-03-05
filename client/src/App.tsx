import axios from 'axios';
import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import reactLogo from './assets/react.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Context } from './Context/ContextProvider';
import NavBar from './Components/NavBar/NavBar';
const AllCampuses = lazy(() => import('./Components/Campuses/AllCampuses'));
const AllStudents = lazy(() => import('./Components/Students/AllStudents'));
const SingleStudent = lazy(() => import('./Components/Students/SingleStudent'));
const SingleCampus = lazy(() => import('./Components/Campuses/SingleCampus'));

export default function App() {
  const { setContext } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      const { data: students } = await axios.get('/api/students');
      const { data: campuses } = await axios.get('/api/campuses');
      setContext({ students, campuses });
    }
    fetchData();
  }, []);

  return (
    <Router>
      <NavBar />
      <Suspense>
        <Routes>
          <Route path="/" element={<AllCampuses />} />
          <Route path="/campuses" element={<AllCampuses />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/students/:id" element={<SingleStudent />} />
          <Route path="/campuses/:id" element={<SingleCampus />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
