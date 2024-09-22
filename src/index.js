import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import StickersPage from './StickersPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/stickers" element={<StickersPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
