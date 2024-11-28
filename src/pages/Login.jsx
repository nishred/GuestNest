import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;


const LogoLoginContainer = styled.div`

  width : 48rem;
  display: flex;
  flex-direction: column;
  gap : 3.2rem;
  

`

function Login() {
  return (
    <LoginLayout className="login-layout">
      <LogoLoginContainer className = "layout-container">
      <Logo />
      <Heading as="h1">Log in to your account</Heading>
      <LoginForm />
      </LogoLoginContainer>
    </LoginLayout>
  );
}

export default Login;
