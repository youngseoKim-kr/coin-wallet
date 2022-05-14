import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import styled from 'styled-components';

function Gnb() {
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState(
    localStorage.getItem('userId') || ''
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/data/user.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserId(data[0].id);
      });
  }, []);

  const logout = () => {
    setUserId('');
    navigate(`/`);
  };

  return (
    <GnbSection>
      <img src="/images/svgexport-1.svg" alt="logo" />
      {userToken !== '' ? (
        <>
          <MenuList>
            <li>입출금</li>
            <li>입출금 내역</li>
          </MenuList>
          <LoginList>
            <li>{userId}</li>
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
