import { useEffect, useState } from 'react';
import styled from 'styled-components';

function MainRightSection() {
  const menuName = ['입금', '출금', '입출금 내역'];

  const [className, setClassName] = useState([false, false, false]);

  const classNameChange = e => {
    const id = e.target.id;
    const result = className.slice();

    for (let i = 0; i < result.length; i++) {
      i == id ? (result[i] = true) : (result[i] = false);
    }
    setClassName(result);
  };

  return (
    <RightSection>
      <RightHeaderSection>비트코인</RightHeaderSection>
      <RightMenuBar>
        {menuName.map((value, index) => {
          return (
            <li
              key={index}
              id={index}
              onClick={classNameChange}
              className={className[index] === true ? 'onClick' : ''}
            >
              {value}
            </li>
          );
        })}
      </RightMenuBar>
    </RightSection>
  );
}

const RightSection = styled.section`
  width: 49%;
  height: 100%;
  margin-top: 15px;
`;

const RightHeaderSection = styled.header`
  font-size: 20px;
  font-weight: 600;
  height: 62px;
  padding: 20px;
  border: 1px solid ${props => props.theme.gray};
`;

const RightMenuBar = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  font-size: 18px;
  li {
    width: 100%;
    height: 94%;
    text-align: center;
    padding-top: 25px;
    border-bottom: 3px solid ${props => props.theme.gray};
    cursor: pointer;
  }
  .onClick {
    font-weight: 800;
    color: ${props => props.theme.blue};
    border-bottom: 3px solid ${props => props.theme.blue};
  }
`;

export default MainRightSection;
