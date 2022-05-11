import styled from 'styled-components';
import MainLeftSection from './MainLeftSection';
import MainRightSection from './MainRightSection';

function Main() {
  return (
    <MainSection>
      <MainTitle>입출금</MainTitle>
      <MainLeftSection />
      <MainRightSection />
    </MainSection>
  );
}
const MainSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 700px;
  padding-top: 20px;
`;

const MainTitle = styled.span`
  color: #6658d3;
  font-size: 24px;
  font-weight: 600;
`;

export default Main;
