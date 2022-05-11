import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import LeftCoinCard from './LeftCoinCard';
import Pagination from 'react-js-pagination';

function MainLeftSection() {
  const [coinInfo, setCoinInfo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/data/coindata.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setCoinInfo(data);
      });
  }, []);

  const handlePageChange = page => {
    setPage(page);
  };
  console.log(page);
  return (
    <LeftSection>
      <LeftSectionHeader>
        <LeftSectionTitle>총 보유자산</LeftSectionTitle>
        <LeftTotal>₩ 48,290,000,000</LeftTotal>
      </LeftSectionHeader>
      <LeftSectionSearch>
        <span>코인 검색</span>
        <div className="inputWrap">
          <input type="text" className="inputCoinName" />
          <FiSearch className="icon" />
        </div>
        <div>
          <input type="checkbox" name="보유화페만 보기" />
          <span>보유화폐만 보기</span>
        </div>
      </LeftSectionSearch>
      <table className="table">
        <colgroup>
          <col width="20%"></col>
          <col width="20%"></col>
          <col width="30%"></col>
          <col width="30%"></col>
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
        <tbody></tbody>
      </table>
      <LeftTable>
        <table className="table">
          <colgroup>
            <col width="20%"></col>
            <col width="20%"></col>
            <col width="30%"></col>
            <col width="30%"></col>
          </colgroup>
          <thead></thead>
          <tbody>
            {coinInfo.map((item, index) => {
              return (
                <LeftCoinCard
                  key={index}
                  name={item.coin_name}
                  type={item.blockchain_type}
                  quantity={item.quantity}
                  price={item.price}
                />
              );
            })}
          </tbody>
        </table>
      </LeftTable>
      <Pagination
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={150}
        pageRangeDisplayed={7}
        prevPageText="‹"
        nextPageText="›"
        onChange={handlePageChange}
      />
    </LeftSection>
  );
}

const LeftSection = styled.section`
  width: 48%;
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
    td {
      text-align: center;
      vertical-align: middle;
      height: 50px;
      border-top: 2px dotted ${props => props.theme.gray};
    }
  }
  ul {
    display: flex;
    justify-content: center;
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
  padding: 10px;
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
  height: 450px;
  overflow: scroll;
`;

export default MainLeftSection;
