import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import CreatePalettePage from './pages/CreatePalettePage';
import PalettePage from './pages/PalettePage';
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
              <PalettePage />
            </Route>
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
`;

export default App;
