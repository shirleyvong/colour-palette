import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Nav>
      <LeftSection>
        <Logo src="/logo.svg" alt="logo" />
        <List>
          <ListItem>
            <StyledLink to="/">Create</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/palettes">My Palettes</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/create">Explore</StyledLink>
          </ListItem>
        </List>
      </LeftSection>

      <RightSection>
        <List>
          <ListItem>
            <StyledLink to="/login">Login</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/signup">Sign Up</StyledLink>
          </ListItem>
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
  background-color: white;
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
  color: #737373;

  &:hover {
    font-weight: bold;
  }
`;

const Logo = styled.img`
  max-height: 100%;
`;

export default Navbar;
