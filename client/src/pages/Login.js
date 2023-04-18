import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/Signup";
import { Button } from "../styles";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Wrapper>
      <Logo>NBA</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
  );
}

const Logo = styled.h1`
  font-family: 'Bangers', cursive;
  font-size: 4rem;
  color: #fff;
  margin: 32px 0 64px;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 64px auto;
  padding: 24px;
  background-color: #1d428a;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #fff;
  margin: 32px 0;
`;

export default Login;
