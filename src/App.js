import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Gnb from './components/header/Gnb';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <BrowserRouter>
      <Gnb />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </ThemeProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
