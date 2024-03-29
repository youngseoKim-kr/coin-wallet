import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';

function Gnb() {
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  const cookies = new Cookies();
  const userId = cookies.get('userId');

  useEffect(() => {
    if (!(!userId || (typeof userId === 'string' && !userId.length))) {
      fetch(`${process.env.REACT_APP_SERVICE_PORT}/users/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: cookies.get('userId'),
        },
      })
        .then(res => res.json())
        .then(data => {
          setUserEmail(data.userEmail);
        });
    }
  }, [userId]);

  const logout = () => {
    setUserEmail('');
    cookies.set('userId', '');
    navigate(`/login`);
  };

  const goToHome = () => {
    userId === '' ? navigate(`/login`) : navigate(`/`);
  };

  const goToMain = () => {
    navigate(`/`);
  };

  const goToDetail = () => {
    navigate(`/detail`);
  };

  return (
    <GnbSection>
      <div onClick={goToHome}>YOUNGSEO BIT</div>
      {userId ? (
        <>
          <MenuList>
            <li onClick={goToMain}>입출금</li>
            <li onClick={goToDetail}>입출금 내역</li>
          </MenuList>
          <LoginList>
            <li>{userEmail}</li>
            <FiPower className="icon" onClick={logout} />
          </LoginList>
        </>
      ) : (
        ''
      )}
    </GnbSection>
  );
}

const GnbSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 55px;
  margin: auto;
  border-bottom: 1px solid #f9f9f9;
  img {
    cursor: pointer;
  }
  div {
    font-size: 18px;
    font-weight: 800;
    color: blue;
    cursor: pointer;
  }
`;

const MenuList = styled.ul`
  display: flex;
  li {
    margin-left: 50px;
    color: #a9a9a9;
    font-size: 14px;
  }
  li:hover {
    color: #6658d3;
    cursor: pointer;
  }
`;

const LoginList = styled.ul`
  display: flex;
  position: absolute;
  right: 0;
  li {
    padding-right: 50px;
    color: #6658d3;
    font-size: 14px;
  }
  .icon {
    margin-right: 50px;
    color: #6658d3;
    font-size: 20px;
  }
  .icon:hover {
    color: #a9a9a9;
    cursor: pointer;
  }
`;

export default Gnb;
