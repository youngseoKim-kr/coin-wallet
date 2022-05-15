import { useState, useContext, useEffect } from 'react';
import Deposit from './MainCommponents/Deposit';
import Withdraw from './MainCommponents/ Withdraw';
import DepositWithdraw from './MainCommponents/DepositWithdraw';
import { CoinInfoContext } from './Context';
import styled from 'styled-components';

function MainRightSection() {
  const [className, setClassName] = useState([true, false, false]);
  const [coinsInfo, setCoinsInfo] = useState({});
  const [section, setSection] = useState(0);

  const CoinInfo = useContext(CoinInfoContext);

  const menuName = ['입금', '출금', '입출금 내역'];

  const classNameChange = e => {
    const id = e.target.id;
    //선택한 메뉴에 따라 다른 페이지를 보여주기 위해 id를 넣어줌
    setSection(Number(id));
    const result = className.slice();

    for (let i = 0; i < result.length; i++) {
      i == id ? (result[i] = true) : (result[i] = false);
    }
    setClassName(result);
  };

  useEffect(() => {
    setCoinsInfo(CoinInfo.name);
  }, [CoinInfo]);

  return (
    <RightSection>
      <RightHeaderSection>{coinsInfo.coin_name}</RightHeaderSection>
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
      {section === 0 && <Deposit coinsInfo={coinsInfo} />}
      {section === 1 && <Withdraw coinsInfo={coinsInfo} />}
      {section === 2 && <DepositWithdraw coinsInfo={coinsInfo} />}
    </RightSection>
  );
}

const RightSection = styled.section`
  width: 49%;
  height: 800px;
  margin-top: 15px;
`;

const RightHeaderSection = styled.header`
  height: 62px;
  padding: 20px;
  border: 1px solid ${props => props.theme.gray};
  font-size: 20px;
  font-weight: 600;
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
    padding-top: 25px;
    border-bottom: 3px solid ${props => props.theme.gray};
    text-align: center;
    cursor: pointer;
  }
  .onClick {
    border-bottom: 3px solid ${props => props.theme.blue};
    color: ${props => props.theme.blue};
    font-weight: 800;
  }
`;

export default MainRightSection;
