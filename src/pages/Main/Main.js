import styled from 'styled-components';
import MainLeftSection from './MainLeftSection';
import MainRightSection from './MainRightSection';

function Main() {
  return (
    <MainSection>
      <MainTitle>입출금</MainTitle>
      <SubSection>
        <MainLeftSection />
        <MainRightSection />
      </SubSection>
    </MainSection>
  );
}
const MainSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 800px;
  padding-top: 30px;
`;

const SubSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

const MainTitle = styled.span`
  color: #6658d3;
  font-size: 24px;
  font-weight: 600;
`;

export default Main;
