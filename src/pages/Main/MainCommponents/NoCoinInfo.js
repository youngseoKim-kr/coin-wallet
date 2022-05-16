import { FiFileText } from 'react-icons/fi';
import styled from 'styled-components';

function NoCoinInfo() {
  return (
    <DepositSection>
      <FiFileText className="icon" style={{ strokeWidth: '1' }} />
      <span>왼쪽 표에서 코인을 선택해 주세요</span>
    </DepositSection>
  );
}
const DepositSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 550px;
  .icon {
    color: ${props => props.theme.blue};
    font-size: 38px;
  }
  span {
    padding-left: 10px;
    color: ${props => props.theme.blue};
  }
`;

export default NoCoinInfo;
