import styled from 'styled-components';

function Main() {
  return (
    <MainSection>
      <MainTitle>입출금</MainTitle>
    </MainSection>
  );
}
const MainSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 700px;
`;

const MainTitle = styled.span`
  color: #6658d3;
  font-size: 24px;
  font-weight: 600;
`;

export default Main;
