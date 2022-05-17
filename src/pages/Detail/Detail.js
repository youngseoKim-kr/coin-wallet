import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

function Detail() {
  return (
    <DetailSection>
      <DetailHeader>
        <HeaderTitle>입출금내역</HeaderTitle>
        <DetailSearch>
          <CoinNameSearch>
            <span>코인:</span>
            <input type="text"></input>
            <FiSearch className="icon" />
          </CoinNameSearch>
        </DetailSearch>
      </DetailHeader>
    </DetailSection>
  );
}

const DetailSection = styled.section`
  width: 100%;
  max-width: 1200px;
  height: 800px;
  margin: auto;
  padding-top: 30px;
`;

const DetailHeader = styled.header``;

const HeaderTitle = styled.div`
  color: #6658d3;
  font-size: 24px;
  font-weight: 600;
`;

const DetailSearch = styled.div`
  margin-top: 50px;
`;

const CoinNameSearch = styled.div`
  position: relative;
  display: flex;
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
    top: -5px;
    left: 150px;
    font-size: 22px;
    cursor: pointer;
  }
`;

export default Detail;
