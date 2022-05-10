import styled from 'styled-components';
import { FiPower } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Gnb() {
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

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

  const logout = () => {
    setUserId('');
    navigate(`/`);
  };

  return (
    <GnbSection>
      <GnbWrapper>
        <img src="/images/svgexport-1.svg" alt="logo" />
        {userId !== '' ? (
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
      </GnbWrapper>
    </GnbSection>
  );
}

const GnbSection = styled.section`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #f9f9f9;
`;

const GnbWrapper = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  width: 1200px;
  height: 100%;
  margin: auto;
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
