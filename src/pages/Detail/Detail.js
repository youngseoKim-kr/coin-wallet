import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiRotateCw, FiFileText } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination';
import CsvDownload from 'react-json-to-csv';
import DetailListCard from './DetailListCard';
import styled from 'styled-components';

let now = new Date();
let year = now.getFullYear();
let month = ('00' + now.getMonth()).slice(-2);
let day = ('00' + now.getDate()).slice(-2);

function Detail() {
  const [startDate, setStartDate] = useState(
    new Date(`${year}.${month}.${day}`)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [isCheck, setIsCheck] = useState([false, false, true]);
  const [detailData, setDetailData] = useState([]);
  const [isStatus, setIsStatus] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchCoinName, setSearchCoinName] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [csv, setCsv] = useState([]);
  const [reData, setReDate] = useState([
    new Date(`${year}.${month}.${day}`),
    new Date(),
    '',
  ]);
  const [searchName, setSearchName] = useState('');

  const coinRef = useRef();

  const checkList = ['입금', '출금', '전체'];

  const startDay =
    reData[0].getFullYear() +
    '.' +
    (reData[0].getMonth() + 1) +
    '.' +
    reData[0].getDate();
  const EndDay =
    reData[1].getFullYear() +
    '.' +
    (reData[1].getMonth() + 1) +
    '.' +
    reData[1].getDate();

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

  const searchList = () => {
    let result = [];
    let detailTypeName = '';
    for (let i = 0; i < isCheck.length; i++) {
      if (isCheck[i] === true && checkList[i] !== '전체') {
        detailTypeName = checkList[i];
      }
    }
    result[0] = startDate;
    result[1] = endDate;
    result[2] = detailTypeName;
    setReDate(result);
  };

  const searchNameList = () => {
    setSearchName(coinRef.current.value);
  };

  //초기화 버튼 클릭시
  const clearState = () => {
    setIsCheck([false, false, true]);
    setStartDate(new Date(`${year}.${month}.${day}`));
    setEndDate(new Date());
    coinRef.current.value = '';
  };

  const changeState = () => {
    isStatus === false ? setIsStatus(true) : setIsStatus(false);
  };
  const setClickType = () => {
    isRefresh === false ? setIsRefresh(true) : setIsRefresh(false);
  };

  const setCoinName = e => {
    setSearchCoinName(e.target.value);
  };

  useEffect(() => {
    let statusName = '';
    isStatus === true ? (statusName = '진행') : (statusName = '');

    fetch(
      `http://3.36.65.166:8000/details?pageCount=${page}&startDate=${startDay}&endDate=${EndDay}&detailType=${reData[2]}&status=${statusName}&search=${searchCoinName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('userId'),
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        setDetailData(data.detailList);
        setTotalPage(data.detailTotalPageCount[0].total_row);
      });
    fetch(
      `http://3.36.65.166:8000/details?startDate=${startDay}&endDate=${EndDay}&detailType=${reData[2]}&status=${statusName}&search=${searchCoinName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('userId'),
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        setCsv(data.detailList);
      });
  }, [isStatus, reData, isRefresh, page, searchName]);

  return (
    <DetailSection>
      <HeaderTitle>입출금내역</HeaderTitle>
      <DetailSearch>
        <CoinNameSearch>
          <span>코인:</span>
          <input type="text" onChange={setCoinName} ref={coinRef}></input>
          <FiSearch className="icon" onClick={searchNameList} />
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
          <button className="clear" onClick={clearState}>
            초기화
          </button>
        </div>
        <DetailSubHeader>
          <FiRotateCw className="icon" onClick={setClickType} />
          <span>새로고침</span>
          <CsvDownload data={csv} filename="DetailList.csv" className="csv">
            <FiFileText className="icon" />
          </CsvDownload>
          <span>CSV 다운로드</span>
          <input type="checkbox" onClick={changeState} />
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
                  id={value.row_id}
                  name={value.coin_name}
                  type={value.type_name}
                  division={value.detail_type}
                  quantity={value.quantity}
                  price={value.price}
                  status={value.status}
                  create={value.update_at}
                  address={value.address}
                />
              );
            })}
          </tbody>
        </table>
      </DetailTableBody>
      <Pagination
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={totalPage}
        pageRangeDisplayed={5}
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
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
  .csv {
    border: none;
    background-color: transparent;
    padding: 0;
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
