import { useEffect, useRef, useState, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import LeftCoinCard from './LeftCoinCard';
import { CoinInfoDispatchContext } from './Context';
import styled from 'styled-components';

function MainLeftSection() {
  const [searchCoinInfo, setSearchCoinInfo] = useState([]);
  const [allCoinInfo, setAllCoinInfo] = useState([]);
  const [myCoin, setMyCoin] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [coinListNow, setCoinListNow] = useState(0);

  const CoinInfoDispatch = useContext(CoinInfoDispatchContext);

  const inputCoinName = useRef();

  //총보유자산 구하기
  const MoneyList = allCoinInfo.map(value => value.price * value.quantity);
  const MoneyAll = MoneyList.reduce((pre, current) => pre + current, 0);
  const totalAssets = MoneyAll.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 15);

  const searchCoin = () => {
    const searchName = inputCoinName.current.value.toUpperCase();
    const result1 = allCoinInfo.filter(word => {
      return word.coin_name.includes(searchName);
    });
    const result2 = searchCoinInfo.filter(word => {
      return word.coin_name.includes(searchName);
    });
    isCheck === true ? setSearchCoinInfo(result2) : setSearchCoinInfo(result1);
    isSearch === true ? setIsSearch(false) : setIsSearch(true);
    setMyCoin(result1);
  };

  const searchMyCoin = () => {
    const result = myCoin.filter(word => {
      return word.quantity !== 0.0;
    });
    isCheck === true ? setSearchCoinInfo(myCoin) : setSearchCoinInfo(result);
    isCheck === true ? setIsCheck(false) : setIsCheck(true);
  };

  const CardClick = id => {
    setCoinListNow(id);

    //클릭한 코인 정보를 오른쪽 컴포넌트로 넘겨줌
    let coinArrayInfo = {};
    for (let i = 0; i < allCoinInfo.length; i++) {
      if (allCoinInfo[i].coins_blockchain_types_id === id) {
        coinArrayInfo = allCoinInfo[i];
      }
    }
    //클릭한 곳의 주소값 받아오기
    fetch(`http://3.36.65.166:8000/assets/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('userId'),
      },
      body: JSON.stringify({
        coinId: coinArrayInfo.coin_id,
        coinBlockchainTypeId: coinArrayInfo.coins_blockchain_types_id,
        blockchainTypeId: coinArrayInfo.blockchain_type_id,
      }),
    })
      .then(res => res.json())
      .then(data => {});

    CoinInfoDispatch({ type: 'NAME_UPDATE', coinInfo: coinArrayInfo });
  };

  useEffect(() => {
    fetch(`http://3.36.65.166:8000/assets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('userId'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setAllCoinInfo(data.assetList);
        setSearchCoinInfo(data.assetList);
        setMyCoin(data.assetList);
      });
  }, []);

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
                  id={item.coins_blockchain_types_id}
                  asset_id={item.asset_id}
                  coin_id={item.coin_id}
                  blockchain_id={item.blockchain_type_id}
                  name={item.coin_name}
                  type={item.type_name}
                  quantity={item.quantity}
                  price={item.price}
                  firstClick={coinListNow}
                  CardClick={CardClick}
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
      height: 50px;
      background-color: ${props => props.theme.gray};
      border-right: 2px solid white;
      border-left: 3px solid white;
      text-align: center;
      vertical-align: middle;
      font-weight: 600;
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
