import { useState, useEffect } from 'react';
import { FiSearch, FiRotateCw, FiFileText } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination';
import DetailListCard from './DetailListCard';
import styled from 'styled-components';

function Detail() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCheck, setIsCheck] = useState([false, false, false]);
  const [detailData, setDetailData] = useState([]);
  const [page, setPage] = useState(1);

  const checkList = ['입금', '출금', '전체'];

  const handlePageChange = page => {
    setPage(page);
  };

  const changeBackgroundColor = e => {
    const id = e.target.id;
    const result = isCheck.slice();

    for (let i = 0; i < result.length; i++) {
      i == id ? (result[i] = true) : (result[i] = false);
    }
    setIsCheck(result);
  };

  const searchList = () => {};

  useEffect(() => {
    fetch(`/data/depositWithdraw.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setDetailData(data);
      });
  }, []);

  return (
    <DetailSection>
      <HeaderTitle>입출금내역</HeaderTitle>
      <DetailSearch>
        <CoinNameSearch>
          <span>코인:</span>
          <input type="text"></input>
          <FiSearch className="icon" />
        </CoinNameSearch>
        <DetailTerm>
          <span>기간:</span>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd"
          />
          <span className="hyphen"> ⎺ </span>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy.MM.dd"
          />
        </DetailTerm>
        <DetailSelect>
          {checkList.map((value, index) => {
            return (
              <div key={index} className="selects">
                <div
                  className="selectClick"
                  onClick={changeBackgroundColor}
                  id={index}
                  style={{
                    backgroundColor: isCheck[index] === true ? 'blue' : '',
                  }}
                ></div>
                <span>{value}</span>
              </div>
            );
          })}
        </DetailSelect>
        <div className="searchButton">
          <FiSearch className="icon" onClick={searchList} />
          <button className="clear">초기화</button>
        </div>
        <DetailSubHeader>
          <FiRotateCw className="icon" />
          <span>새로고침</span>
          <FiFileText className="icon" />
          <span>CSV 다운로드</span>
          <input type="checkbox" />
          <span>진행 항목만 보기</span>
        </DetailSubHeader>
      </DetailSearch>
      <DetailTableHeader>
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="10%" />
          <col width="18%" />
          <col width="18%" />
          <col width="7%" />
          <col width="17%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>구분</th>
            <th>코인명</th>
            <th>블록체인 타입</th>
            <th>수량</th>
            <th>평가금액</th>
            <th>상태</th>
            <th>주소</th>
            <th>일시</th>
          </tr>
        </thead>
      </DetailTableHeader>
      <DetailTableBody>
        <table>
          <colgroup>
            <col width="5%" />
            <col width="10%" />
            <col width="10%" />
            <col width="18%" />
            <col width="18%" />
            <col width="7%" />
            <col width="17%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            {detailData.map((value, index) => {
              return (
                <DetailListCard
                  key={index}
                  id={value.id}
                  name={value.name}
                  type={value.type}
                  division={value.division}
                  quantity={value.quantity}
                  price={value.price}
                  status={value.status}
                  create={value.create_at}
                  address={value.withdrawal_address}
                />
              );
            })}
          </tbody>
        </table>
      </DetailTableBody>
      <Pagination
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={60}
        pageRangeDisplayed={7}
        prevPageText="‹"
        nextPageText="›"
        onChange={handlePageChange}
      />
    </DetailSection>
  );
}

const DetailSection = styled.section`
  width: 100%;
  max-width: 1200px;
  height: 800px;
  margin: auto;
  padding-top: 30px;
  .searchButton {
    display: flex;
    align-items: center;
    .icon {
      margin-left: 15px;
      font-size: 22px;
      cursor: pointer;
    }
    .clear {
      width: 70px;
      height: 25px;
      margin-left: 10px;
      border: none;
      color: white;
      background-color: ${props => props.theme.blue};
      cursor: pointer;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    li {
      display: inline-block;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      border-radius: 50%;
    }
    li:first-child {
      border-radius: 5px 0 0 5px;
    }
    li:last-child {
      border-radius: 0 5px 5px 0;
    }
    a {
      text-decoration: none;
      color: #337ab7;
      font-size: 1rem;
    }
    li.active a {
      color: white;
    }
    li.active {
      background-color: #337ab7;
    }
    li a.active,
    li a:hover {
      color: blue;
    }
  }
`;

const HeaderTitle = styled.div`
  color: #6658d3;
  font-size: 24px;
  font-weight: 600;
`;

const DetailSearch = styled.div`
  display: flex;
  margin-top: 50px;
`;

const CoinNameSearch = styled.div`
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  input {
    width: 120px;
    border: none;
    outline: none;
    border-bottom: 2px solid ${props => props.theme.blue};
    margin-left: 20px;
    font-size: 16px;
  }
  .icon {
    position: absolute;
    top: 5px;
    left: 150px;
    font-size: 22px;
    cursor: pointer;
  }
`;

const DetailTerm = styled.div`
  width: 300px;
  align-items: center;
  justify-content: space-around;
  display: flex;
  margin-left: 20px;
  .react-datepicker-wrapper {
    width: 100px;
    input {
      width: 100px;
      border: none;
      border-bottom: 2px solid ${props => props.theme.blue};
      outline: none;
      padding-left: 10px;
      font-size: 16px;
    }
  }
  .hyphen {
    color: ${props => props.theme.blue};
  }
`;

const DetailSelect = styled.div`
  display: flex;
  align-items: center;
  .selectClick {
    width: 15px;
    height: 15px;
    margin: 0 5px 0;
    border: 1px solid ${props => props.theme.blue};
    border-radius: 50%;
    cursor: pointer;
  }
  .selects {
    display: flex;
  }
`;

const DetailSubHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 10px 0;
  padding-left: 10px;
  input {
    margin-left: 40px;
  }
  span {
    padding-right: 10px;
  }
  .icon {
    font-size: 20px;
    color: ${props => props.theme.blue};
    margin-right: 5px;
    cursor: pointer;
  }
`;

const DetailTableHeader = styled.table`
  width: 100%;
  border-top: 2px solid black;
  th {
    height: 50px;
    background-color: ${props => props.theme.gray};
    text-align: center;
    vertical-align: middle;
    font-weight: 600;
  }
`;

const DetailTableBody = styled.div`
  width: 100%;
  height: 550px;
  overflow: scroll;
`;

export default Detail;
