import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import NoCoinInfo from './NoCoinInfo';
import styled from 'styled-components';

function Deposit(props) {
  const [isCopy, setIsCopy] = useState(false);
  const inputRef = useRef();

  const copyAddress = () => {
    navigator.clipboard.writeText(props.coinsInfo.address);
    setIsCopy(true);

    setTimeout(() => {
      setIsCopy(false);
    }, 3000);
  };

  return (
    <>
      {props.coinsInfo === '' ? (
        <NoCoinInfo />
      ) : (
        <DepositMain>
          <MainHeader>
            <span>블록체인 타입 선택</span>
            <span>{props.coinsInfo.type_name}</span>
          </MainHeader>
          <MainAddress>
            <span>입금주소</span>
            <div className="inputSection">
              <div className="inputAddress" ref={inputRef}>
                {props.coinsInfo.address}
              </div>
              <button type="submit" onClick={copyAddress}>
                복사
              </button>
            </div>
            {isCopy ? (
              <span className="alret">입금 주소가 복사되었습니다!</span>
            ) : (
              ''
            )}
          </MainAddress>
          <MainQr>
            <span>QR CODE</span>
            <div className="qrcodeSection">
              <QRCodeSVG className="qrcode" value={props.coinsInfo.address} />
            </div>
          </MainQr>
        </DepositMain>
      )}
    </>
  );
}

const DepositMain = styled.div``;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  span {
    padding: 10px;
    padding-right: 80px;
  }
`;

const MainAddress = styled.div`
  margin-bottom: 20px;
  span {
    padding: 10px;
  }
  .inputSection {
    display: flex;
    margin: 10px;
  }
  .inputAddress {
    width: 85%;
    height: 35px;
    border: 2px solid ${props => props.theme.gray};
    padding: 5px 0 0 10px;
    overflow: scroll;
  }
  input:focus {
    outline: none;
  }
  button {
    width: 14%;
    height: 35px;
    margin-left: 5px;
    color: white;
    background-color: ${props => props.theme.blue};
    outline: 0;
    border: 0;
    cursor: pointer;
  }
  .alret {
    color: red;
  }
`;

const MainQr = styled.div`
  span {
    padding: 10px;
  }
  .qrcodeSection {
    width: 100%;
    height: 300px;
    padding-left: 35%;
    line-height: 300px;
  }
  .qrcode {
    width: 200px;
    height: 200px;
    padding: 30px;
    border: 2px solid ${props => props.theme.lightGray};
  }
`;

export default Deposit;
