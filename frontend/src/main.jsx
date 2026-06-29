import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Sectors from './pages/Sectors.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import './styles.css';

function Protected({ children }) {
  return localStorage.getItem('b2n_token') ? children : <Navigate to="/login" />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="secteurs" element={<Sectors />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Protected><Admin /></Protected>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
