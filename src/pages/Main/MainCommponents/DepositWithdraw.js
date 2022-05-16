import { useState, useEffect } from 'react';
import NoCoinInfo from './NoCoinInfo';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { FiSearch, FiRotateCw, FiFileText } from 'react-icons/fi';
import styled from 'styled-components';
import DepositWithdrawCard from './DepositWithdrawCard';

function DepositWithdraw(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCheck, setIsCheck] = useState([false, false, false]);
  const [depositWithdrawData, setDepositWithdrawData] = useState([]);

  const checkList = ['입금', '출금', '전체'];

  const changeBackgroundColor = e => {
    const id = e.target.id;
    const result = isCheck.slice();

    for (let i = 0; i < result.length; i++) {
      i == id ? (result[i] = true) : (result[i] = false);
    }
    setIsCheck(result);
  };

  useEffect(() => {
    fetch(`/data/depositWithdraw.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setDepositWithdrawData(data);
      });
  }, []);

  return (
    <>
      {props.coinsInfo === '' ? (
        <NoCoinInfo />
      ) : (
        <DepositWithdrawSection>
          <DepositWithdrawHeader>
            <DepositWithdrawTerm>
              <span>기간 검색</span>
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
            </DepositWithdrawTerm>
            <DepositWithdrawSelect>
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
            </DepositWithdrawSelect>
            <FiSearch className="icon" />
            <button className="clear">초기화</button>
          </DepositWithdrawHeader>
          <DepositWithdrawSubHeader>
            <input type="checkbox" />
            <span>진행 항목만 보기</span>
            <FiRotateCw className="icon" />
            <span>새로고침</span>
            <FiFileText className="icon" />
            <span>CSV 다운로드</span>
          </DepositWithdrawSubHeader>
          <DepositWithdrawTable>
            <TableHeader>
              <ul>
                <li>구분</li>
                <li>수량</li>
                <li className="price">평가금액</li>
                <li className="status">상태</li>
                <div className="address">
                  <div className="date">일시</div>
                  <div>주소</div>
                </div>
              </ul>
            </TableHeader>
            <TableSection>
              <TableAllSection>
                {depositWithdrawData.map((value, index) => {
                  return (
                    <DepositWithdrawCard
                      key={index}
                      id={value.id}
                      division={value.division}
                      quantity={value.quantity}
                      price={value.price}
                      status={value.status}
                      create={value.create_at}
                      address={value.withdrawal_address}
                    />
                  );
                })}
              </TableAllSection>
            </TableSection>
          </DepositWithdrawTable>
        </DepositWithdrawSection>
      )}
    </>
  );
}

const DepositWithdrawSection = styled.section``;

const DepositWithdrawHeader = styled.header`
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding-left: 10px;
  .icon {
    margin-left: 10px;
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
`;

const DepositWithdrawTerm = styled.div`
  width: 300px;
  align-items: center;
  justify-content: space-around;
  display: flex;
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

const DepositWithdrawSelect = styled.div`
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

const DepositWithdrawSubHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 10px 0;
  padding-left: 10px;
  input {
    margin-right: 5px;
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

const DepositWithdrawTable = styled.div``;

const TableHeader = styled.div`
  height: 70px;
  padding-left: 15px;
  background-color: ${props => props.theme.blue};
  border-top: 1px solid black;
  ul {
    display: flex;
    align-items: center;
    height: 100%;
    color: white;
    li {
      flex-basis: 17%;
    }
    .status {
      text-align: end;
    }
    .price {
      text-align: center;
    }
    .address {
      padding-left: 30px;
      width: 250px;
      text-align: center;
      .date {
        border-bottom: 1px solid ${props => props.theme.gray};
      }
      div {
        padding: 10px;
      }
    }
  }
`;

const TableSection = styled.div`
  width: 100%;
  height: 380px;
  overflow-y: scroll;
`;

const TableAllSection = styled.ul`
  width: 100%;
  height: 100%;
`;

export default DepositWithdraw;
