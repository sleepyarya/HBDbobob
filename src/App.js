import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import Dashboard from './Dashboard';
import Photo from './components/Photo';
import Comments from './components/Comments';
import About from './components/About';
import PrivateRoute from './PrivateRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="page-container">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/photo"
            element={
              <PrivateRoute>
                <Photo />
              </PrivateRoute>
            }
          />
          <Route
            path="/comments"
            element={
              <PrivateRoute>
                <Comments />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
