import styled from 'styled-components';

function Footer() {
  return (
    <FooterSection>
      <FooterWrapper>
        <FooterTitle>2018-2021 PROBIT All Right Reserved</FooterTitle>
      </FooterWrapper>
    </FooterSection>
  );
}

const FooterSection = styled.section`
  width: 100%;
  height: 25px;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  line-height: 25px;
  background-color: #6658d3;
  margin: auto;
`;

const FooterTitle = styled.footer`
  font-size: 13px;
  color: white;
  text-align: center;
`;

export default Footer;
