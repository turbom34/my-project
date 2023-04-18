import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">NBA Page</Link>
      </Logo>
      <Nav>
        <Link to="/login">
            <Button variant="outline">Login</Button>
        </Link>
        <Link to="/signup">
            <Button variant="outline">Sign Up</Button>
        </Link>
        <Link to="/sports">
            <Button variant="outline">Sports</Button>
        </Link>
        <Link to="/blog">
            <Button variant="outline">Blog</Button>
        </Link>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #000;
`;

const Logo = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 2px;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  position: absolute;
  right: 16px;

  a {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #ff4500;
    }
  }
`;

export default NavBar;

