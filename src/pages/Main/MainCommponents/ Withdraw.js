import { useEffect, useRef, useState } from 'react';
import NoCoinInfo from './NoCoinInfo';
import styled from 'styled-components';
import notaionConversion from '../../../utils/ notationConversion';

function Withdraw(props) {
  const [coinAppraisalAmount, setcoinAppraisalAmount] = useState(0.0);
  const [isCoinAmount, setIsCoinAmount] = useState(true);
  const [isCoinValue, setIsCoinValue] = useState(true);
  const [coinCount, setCoinCount] = useState('');

  const inputRef = useRef();
  const addressInputRef = useRef();

  //props 값이 없으면 split를 못하는 오류 방지
  let CoinEnglishName = '';
  if (props.coinsInfo !== '') {
    CoinEnglishName = props.coinsInfo.coin_name.split(' ');
  }

  const checkAmount = e => {
    //빈 배열이 들어오면 true 값을 주고 평가 금액이 보이도록 함
    if (e.target.value === '') {
      setIsCoinAmount(true);
      setcoinAppraisalAmount(0);
      setIsCoinValue(true);
      setCoinCount('');
    }
    //-를 숫자로 판단해 입력 못하게 막는다.
    //setIsCoinValue를 false 로 줘서 올바른 값 입력하도록 경고문
    else if (e.target.value.includes('-')) {
      setIsCoinValue(false);
    }
    //숫자가 아닌 값이 들어오면 true 값을 주고 값에 변화가 없도록 함
    //setIsCoinValue를 false 로 줘서 올바른 값 입력하도록 경고문
    else if (isNaN(Number(e.target.value))) {
      setIsCoinValue(false);
    }
    //보유수량보다 작은 값을 입력시 평가 금액에 넣어준다.
    else if (Number(e.target.value) <= props.coinsInfo.quantity) {
      setIsCoinAmount(true);
      let price = notaionConversion(
        props.coinsInfo.price * Number(e.target.value)
      );
      setcoinAppraisalAmount(price);
      setIsCoinValue(true);
      setCoinCount(e.target.value);
    }
    //보유수량보다 초과된 수량 입력시 초과메시지를 출력
    else {
      setIsCoinAmount(false);
      setIsCoinValue(true);
    }
  };

  const withdraw = () => {
    const inputValue = inputRef.current.value;
    const addressValue = addressInputRef.current.value;

    if (
      inputValue.length !== 0 &&
      isCoinAmount !== false &&
      addressValue !== ''
    ) {
      fetch(`http://3.36.65.166:8000/withdrawals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.getItem('userId'),
        },
        body: JSON.stringify({
          assetId: props.coinsInfo.asset_id,
          blockchainTypeId: props.coinsInfo.blockchain_type_id,
          withdrawalAddress: addressValue,
          quantity: Number(inputValue),
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 201) {
            alert('출금에 성공했습니다.');
            inputRef.current.value = '';
            addressInputRef.current.value = '';
          }
        });
    }
  };

  //출금이 눌린 경우에서 다른 코인을 선택하면 출금 수량, 평가금액에 적힌 값 초기화
  useEffect(() => {
    //props 값이 없으면 초기화 시키지 않는다.
    if (props.coinsInfo !== '') {
      inputRef.current.value = '';
      setIsCoinAmount(true);
      setcoinAppraisalAmount(0);
    }
  }, [props]);

  return (
    <>
      {props.coinsInfo === '' ? (
        <NoCoinInfo />
      ) : (
        <WithdrawSection>
          <WithdrawHeader>
            <span>블록체인 타입 선택</span>
            <span>{props.coinsInfo.type_name}</span>
          </WithdrawHeader>
          <WithdrawAddress>
            <span>출금주소</span>
            <div className="inputSection">
              <input type="text" ref={addressInputRef} />
            </div>
          </WithdrawAddress>
          <WithdrawalQuantity>
            <span>출금수량</span>
            <div className="inputSection">
              <input
                type="text"
                onChange={checkAmount}
                ref={inputRef}
                value={coinCount}
              />
              <span className="CoinEnglishName">{CoinEnglishName[0]}</span>
            </div>
            <AppraisalAmount>
              <div>평가금액</div>
              {isCoinAmount === true ? (
                isCoinValue == true ? (
                  <div>₩ {coinAppraisalAmount}</div>
                ) : (
                  <span className="alret">올바른 값을 입력해 주세요</span>
                )
              ) : isCoinValue == true ? (
                <span className="alret">출금 가능 한도를 초과하였습니다</span>
              ) : (
                <span className="alret">올바른 값을 입력해 주세요</span>
              )}
            </AppraisalAmount>
          </WithdrawalQuantity>
          <WithdrawButton>
            <button onClick={withdraw}>{CoinEnglishName[0]} 출금</button>
          </WithdrawButton>
        </WithdrawSection>
      )}
    </>
  );
}

const WithdrawSection = styled.section`
  position: relative;
`;

const WithdrawHeader = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  span {
    padding: 10px;
    padding-right: 80px;
  }
`;

const WithdrawAddress = styled.div`
  margin-bottom: 20px;
  span {
    padding: 10px;
  }
  .inputSection {
    margin: 10px;
  }
  input {
    width: 100%;
    height: 35px;
    border: 2px solid ${props => props.theme.gray};
    padding-left: 10px;
  }
  input:focus {
    outline: none;
  }
`;

const WithdrawalQuantity = styled.div`
  span {
    padding: 10px;
  }
  .inputSection {
    position: relative;
    margin: 10px;
    .CoinEnglishName {
      position: absolute;
      top: 0px;
      right: 10px;
      color: ${props => props.theme.blue};
      font-weight: 500;
    }
  }
  input {
    width: 100%;
    height: 35px;
    border: 2px solid ${props => props.theme.gray};
    padding-left: 10px;
  }
  input:focus {
    outline: none;
  }
`;

const AppraisalAmount = styled.div`
  width: 50%;
  height: 50px;
  float: right;
  padding: 8px 0 0 20px;
  background-color: ${props => props.theme.gray};
  color: ${props => props.theme.blue};
  .alret {
    color: red;
  }
`;

const WithdrawButton = styled.div`
  position: absolute;
  top: 500px;
  right: 30%;
  button {
    width: 200px;
    height: 40px;
    color: white;
    background-color: ${props => props.theme.blue};
    border: none;
    cursor: pointer;
  }
`;

export default Withdraw;
