import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({ isAuthenticated: checkAuth, authData, logout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkAuth(authData));
  }, [authData, checkAuth])

  return (
    <Nav>
      <LeftSection>
        <Logo src="/logo.svg" alt="logo" />
        <List>
          <ListItem>
            <StyledLink to="/">Generate</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/palettes">Explore</StyledLink>
          </ListItem>
          {isAuthenticated && authData.username && (
            <ListItem>
              <StyledLink to={`/palettes/users/${authData.username}`}>
                {authData.username}
              </StyledLink>
            </ListItem>
          )}
        </List>
      </LeftSection>

      <RightSection>
        <List>
          {isAuthenticated
            ? (
              <ListItem>
                <StyledLink to="/" onClick={logout}>Logout</StyledLink>
              </ListItem>
            ) : (
              <>
                <ListItem>
                  <StyledLink to="/login">Login</StyledLink>
                </ListItem>
                <ListItem>
                  <StyledLink to="/register">Register</StyledLink>
                </ListItem>
              </>
            )}
        </List>
      </RightSection>
    </Nav>
  );
};

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
  margin: 8px;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 15px;
`;

const LeftSection = styled.div`
  display: flex;
  height: 100%;
  flex-grow: 1;
`;

const RightSection = styled.div`
  display: flex;
  height: 100%;
`;

const ListItem = styled.li`
  padding-left: 1.5em;
  padding-right: 1.5em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colours.tertiary};

  &:hover {
    font-weight: bold;
  }
`;

const Logo = styled.img`
  height: 100%;

  @media (max-width: 425px) {
    display: none;
  }
`;

export default Navbar;
