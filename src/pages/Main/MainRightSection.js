import styled from 'styled-components';

function MainRightSection() {
  return (
    <RightSection>
      <RightHeaderSection>비트코인</RightHeaderSection>
    </RightSection>
  );
}

const RightSection = styled.section`
  width: 48%;
  height: 100%;
  margin-top: 15px;
`;

const RightHeaderSection = styled.header`
  font-size: 20px;
  font-weight: 600;
  height: 62px;
  padding: 20px;
  border: 1px solid ${props => props.theme.gray};
`;

export default MainRightSection;
