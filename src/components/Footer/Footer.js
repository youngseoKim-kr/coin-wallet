import styled from 'styled-components';

function Footer() {
  return (
    <FooterSection>
      <Copyright>2018-2021 YOUNGSEO All Right Reserved</Copyright>
    </FooterSection>
  );
}

const FooterSection = styled.footer`
  width: 100%;
  max-width: 1200px;
  height: 25px;
  margin: auto;
  background-color: ${props => props.theme.blue};
  line-height: 25px;
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 13px;
  color: white;
`;

export default Footer;
