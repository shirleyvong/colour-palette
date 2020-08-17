import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import CreatePalettePage from './pages/CreatePalettePage';
import SavedPalettesPage from './pages/SavedPalettesPage';
import ViewPalettePage from './pages/ViewPalettePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Theme from './styles/Theme';
import AuthContext from './context/auth';

const Content = styled.div`
  background-color: white;
  align-self: center;
  flex-grow: 1;
  width: 100%;
  max-width: 768px;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.background || props.theme.colours.backgroundGradient};
`;

function App() {
  const [background, setBackground] = useState('');

  return (
    <Theme>
      <Router>
        <Container background={background}>
          <Navbar />
          <Content>
            <Switch>
              <Route path="/palettes/:id">
                <ViewPalettePage setBackground={setBackground} />
              </Route>
              <Route path="/palettes">
                <SavedPalettesPage />
              </Route>
              <Route path="/register">
                <RegisterPage setBackground={setBackground} />
              </Route>
              <Route path="/login">
                <LoginPage setBackground={setBackground} />
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
