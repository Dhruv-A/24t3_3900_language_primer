import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Groups from './components/Groups';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
          </Routes>
        </div>
        <nav className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/groups">Groups</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
