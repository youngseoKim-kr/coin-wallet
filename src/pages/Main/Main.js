import MainLeftSection from './MainCoinList';
import MainRightSection from './MainMenuSection';
import { GlobalContextProvider } from './Context';
import styled from 'styled-components';

function Main() {
  return (
    <MainSection>
      <MainTitle>입출금</MainTitle>
      <SubSection>
        <GlobalContextProvider>
          <MainLeftSection />
          <MainRightSection />
        </GlobalContextProvider>
      </SubSection>
    </MainSection>
  );
}
const MainSection = styled.section`
  width: 100%;
  max-width: 1200px;
  height: 800px;
  margin: auto;
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
