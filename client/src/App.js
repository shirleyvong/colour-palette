import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import CreatePalettePage from './pages/CreatePalettePage';
import Navbar from './components/Navbar';
import Theme from './styles/Theme';

function App() {
  return (
    <Theme>
      <Router>
        <Navbar />
        <Div>
          <Switch>
            <Route path="/">
              <CreatePalettePage />
            </Route>
          </Switch>
        </Div>
      </Router>
    </Theme>
  );
}

const Div = styled.div`
  display: flex;
  flex-grow: 1;
  background: ${(props) => props.theme.backgroundGradient};
`;

export default App;
