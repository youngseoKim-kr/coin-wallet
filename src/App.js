import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
