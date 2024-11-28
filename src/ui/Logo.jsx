import styled from "styled-components";

const StyledLogo = styled.div`
`;

const Img = styled.img`
  height: 9.6rem;
  display : block;
  margin: 0px auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
