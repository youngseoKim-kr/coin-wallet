import styled from 'styled-components';

function Footer() {
  return (
    <FooterSection>
      <FooterWrapper>
        <FooterTitle>2018-2021 YOUNGSEO All Right Reserved</FooterTitle>
      </FooterWrapper>
    </FooterSection>
  );
}

const FooterSection = styled.section`
  width: 100%;
  height: 25px;
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  line-height: 25px;
  margin: auto;
  background-color: #6658d3;
`;

const FooterTitle = styled.footer`
  color: white;
  font-size: 13px;
  text-align: center;
`;

export default Footer;
