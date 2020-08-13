import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  background-color: ${(props) => props.colour || props.theme.colours.tertiary};
  border: none;
  font: inherit;
  border-radius: 50px;
  margin: 14px;
  min-width: 180px;
  min-height: 48px;
`;

const StyledHeader = styled.h1`
  color: ${(props) => props.colour || props.theme.colour.primary};
`;

export {
  StyledButton,
  StyledHeader,
};
