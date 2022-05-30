import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Gnb from './components/header/Gnb';
import theme from './styles/theme';
import { Cookies } from 'react-cookie';
import { ThemeProvider } from 'styled-components';

function App(props) {
  const cookies = new Cookies();
  const userId = cookies.get('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === '') {
      navigate('/login');
    }
  }, [userId]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Gnb />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
