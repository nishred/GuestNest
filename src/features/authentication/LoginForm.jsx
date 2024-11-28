import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import { useLogin } from "./useLogin";


import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";


const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`

font-weight: 600;

`

const FormRowVertical = ({ label, children }) => {
  return (
    <StyledFormRowVertical>
      <Label htmlFor={children.props.id}>{label}</Label>
      {children}
    </StyledFormRowVertical>
  );
};


const StyledForm = styled(Form)`


display: flex;
flex-direction: column;

gap: 3.2rem;

`

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loginMutate, isLoading} = useLogin();  

  function handleSubmit(e) {

    e.preventDefault();

    if(!email || !password)
    return
    loginMutate({email,password}) 

  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled= {isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled = {isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled = {isLoading} size="large">{(isLoading)?(<SpinnerMini />):("Log in")}</Button>
      </FormRowVertical>
    </StyledForm>
  );
}

export default LoginForm;
