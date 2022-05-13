import styled from 'styled-components';
import { FiFileText } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function Deposit(props) {
  const inputref = useRef();
  const [isCopy, setIsCopy] = useState(false);

  const copyAddress = () => {
    const el = inputref.current;
    //value 값이 없는 경우 복사 안되게
    if (inputref.current.value !== '') {
      el.select();
      document.execCommand('copy');
      setIsCopy(true);

      setTimeout(() => {
        setIsCopy(false);
      }, 3000);
    }
  };
  return (
    <>
      {props.coinsInfo === '' ? (
        <DepositSection>
          <FiFileText className="icon" style={{ strokeWidth: '1' }} />
          <span>왼쪽 표에서 코인을 선택해 주세요</span>
        </DepositSection>
      ) : (
        <DepositMain>
          <MainHeader>
            <span>블록체인 타입 선택</span>
            <span>{props.coinsInfo.type_name}</span>
          </MainHeader>
          <MainAddress>
            <span>입금주소</span>
            <div className="inputSection">
              <input type="text" ref={inputref} />
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
              <QRCodeSVG className="qrcode" value="asdfsdfsdf@#$@#$WEFDWERF" />
            </div>
          </MainQr>
        </DepositMain>
      )}
    </>
  );
}

const DepositSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 550px;
  .icon {
    font-size: 38px;
    color: ${props => props.theme.blue};
  }
  span {
    color: ${props => props.theme.blue};
    padding-left: 10px;
  }
`;

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
    margin: 10px;
  }
  input {
    width: 85%;
    height: 35px;
    border: 2px solid ${props => props.theme.gray};
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
    line-height: 300px;
    padding-left: 35%;
  }
  .qrcode {
    padding: 30px;
    width: 200px;
    height: 200px;
    border: 2px solid ${props => props.theme.lightGray};
  }
`;

export default Deposit;
