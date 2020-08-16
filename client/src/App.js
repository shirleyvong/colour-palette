import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import CreatePalettePage from './pages/CreatePalettePage';
import PalettesPage from './pages/PalettesPage';
import Navbar from './components/Navbar';
import TestPage from './pages/TestPage';
import Theme from './styles/Theme';

const Content = styled.div`
  box-sizing: border-box;
  background-color: white;
  margin: 20px;
  align-self: center;
  padding: 20px;
  flex-grow: 1;
  width: 100%;
  max-width: 768px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.background || props.theme.colours.backgroundGradient};
`;

function App() {
  const [background, setBackground] = useState('rgb(247,195,139)');

  return (
    <Theme>
      <Router>
        <Container background={background}>
          <Navbar />
          <Content>
            <Switch>
              <Route path="/palettes/:id">
                <TestPage />
              </Route>
              <Route path="/palettes">
                <PalettesPage />
              </Route>
              <Route path="/">
                <CreatePalettePage setBackground={setBackground} />
              </Route>
            </Switch>
          </Content>
        </Container>
      </Router>
    </Theme>
  );
}

export default App;
