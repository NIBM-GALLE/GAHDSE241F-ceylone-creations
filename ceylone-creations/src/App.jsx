//import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="white-gradient">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
