import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import LeftCoinCard from './LeftCoinCard';

function MainLeftSection() {
  const [searchCoinInfo, setSearchCoinInfo] = useState([]);
  const [allCoinInfo, setAllCoinInfo] = useState([]);
  const [myCoin, setMyCoin] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [coinListNow, setCoinListNow] = useState(0);

  useEffect(() => {
    fetch(`/data/coindata.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setAllCoinInfo(data);
        setSearchCoinInfo(data);
        setMyCoin(data);
      });
  }, []);

  const inputCoinName = useRef();

  const searchCoin = () => {
    const searchName = inputCoinName.current.value;
    const result1 = allCoinInfo.filter(word => {
      return word.coin_name.includes(searchName);
    });
    const result2 = searchCoinInfo.filter(word => {
      return word.coin_name.includes(searchName);
    });
    isCheck === true ? setSearchCoinInfo(result2) : setSearchCoinInfo(result1);
    setMyCoin(result1);
    isSearch === true ? setIsSearch(false) : setIsSearch(true);
  };

  const searchMyCoin = () => {
    const result = myCoin.filter(word => {
      return word.quantity !== 0.0;
    });
    isCheck === true ? setSearchCoinInfo(myCoin) : setSearchCoinInfo(result);
    isCheck === true ? setIsCheck(false) : setIsCheck(true);
  };

  const setColor = id => {
    setCoinListNow(id);
  };

  //총보유자산 구하기
  const MoneyList = allCoinInfo.map(value => value.price * value.quantity);
  const MoneyAll = MoneyList.reduce((pre, current) => pre + current, 0);
  const totalAssets = MoneyAll.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 15);
  return (
    <LeftSection>
      <LeftSectionHeader>
        <LeftSectionTitle>총 보유자산</LeftSectionTitle>
        <LeftTotal>₩ {totalAssets}</LeftTotal>
      </LeftSectionHeader>
      <LeftSectionSearch>
        <span>코인 검색</span>
        <div className="inputWrap">
          <input type="text" className="inputCoinName" ref={inputCoinName} />
          <FiSearch className="icon" onClick={searchCoin} />
        </div>
        <div>
          <input
            type="checkbox"
            name="보유화페만 보기"
            onChange={searchMyCoin}
          />
          <span>보유화폐만 보기</span>
        </div>
      </LeftSectionSearch>
      <table className="table">
        <colgroup>
          <col width="20%" />
          <col width="20%" />
          <col width="30%" />
          <col width="30%" />
        </colgroup>
        <thead>
          <tr>
            <th>코인명</th>
            <th>
              블록체인 <br />
              타입
            </th>
            <th>보유수량</th>
            <th>평가금액</th>
          </tr>
        </thead>
      </table>
      <LeftTable>
        <table className="table">
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="30%" />
            <col width="30%" />
          </colgroup>
          <tbody>
            {searchCoinInfo.map((item, index) => {
              return (
                <LeftCoinCard
                  key={index}
                  id={item.id}
                  name={item.coin_name}
                  type={item.blockchain_type}
                  quantity={item.quantity}
                  price={item.price}
                  firstClick={coinListNow}
                  setColor={setColor}
                  isCheck={isCheck}
                  isSearch={isSearch}
                />
              );
            })}
          </tbody>
        </table>
      </LeftTable>
    </LeftSection>
  );
}

const LeftSection = styled.section`
  width: 49%;
  height: 100%;
  .table {
    width: 100%;
    th {
      text-align: center;
      vertical-align: middle;
      background-color: ${props => props.theme.gray};
      height: 50px;
      font-weight: 600;
      border-right: 2px solid white;
      border-left: 3px solid white;
    }
  }
`;

const LeftSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 20px;
  border: 1px solid ${props => props.theme.gray};
`;

const LeftSectionTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const LeftTotal = styled.span`
  font-size: 20px;
`;

const LeftSectionSearch = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0 15px 0;
  border-bottom: 3px solid ${props => props.theme.blue};
  .inputWrap {
    display: flex;
    align-items: center;
  }
  .icon {
    font-size: 20px;
    cursor: pointer;
  }
  .inputCoinName {
    width: 200px;
    height: 25px;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 8px;
    outline: none;
  }
`;

const LeftTable = styled.div`
  width: 100%;
  height: 500px;
  overflow: scroll;
`;

export default MainLeftSection;
