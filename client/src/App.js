import React, { useState, useEffect, useCallback } from 'react';
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
import api from './services/api';

const Content = styled.div`
  background-color: white;
  align-self: center;
  flex-grow: 1;
  width: 100%;
  max-width: 768px;
  overflow: hidden;
  margin: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.background || props.theme.colours.backgroundGradient};
`;

function App() {
  // const [background, setBackground] = useState('');

  /**
   * authToken: string
   * expiryDate: utc date and time
   * username: string
   * userID: integer
   */
  const [authData, setAuthData] = useState({});

  useEffect(() => {
    // Use auth data from LocalStorage if still valid
    const storedAuthToken = localStorage.getItem('token');
    const storedExpiryDate = localStorage.getItem('token_expiry');

    if (!storedAuthToken || !storedExpiryDate) {
      return;
    }

    const defaultAuthToken = JSON.parse(storedAuthToken);
    const defaultExpiryDate = JSON.parse(storedExpiryDate);

    //  If token is still valid, get user data 
    if (defaultAuthToken && defaultExpiryDate && Date.now() < Date.parse(defaultExpiryDate)) {
      api.getUserStatus(defaultAuthToken)
        .then((res) => {
          setAuthData({
            authToken: defaultAuthToken,
            expiryDate: defaultExpiryDate,
            username: res.username,
            userID: res.user_id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const setAuthorizationData = useCallback((authToken, expiryDate, username, userID) => {
    localStorage.setItem('token', JSON.stringify(authToken));
    localStorage.setItem('token_expiry', JSON.stringify(expiryDate));

    setAuthData({
      authToken,
      expiryDate,
      username,
      userID,
    });
  }, []);

  const isAuthenticated = useCallback((data) => {
    if (!data) { return false; }

    // check for missing authData keys
    const keys = ['authToken', 'expiryDate', 'username', 'userID'];
    if (!data || !keys.every((key) => data.hasOwnProperty(key))) { 
      return false;
    }

    // check if auth token is expired
    if (Date.now() > Date.parse(data.expiryDate)) {
      return false;
    }

    return true;
  }, []);

  const logout = () => {
    localStorage.clear();
    setAuthData({});
  };

  const props = {
    isAuthenticated,
    setAuthorizationData,
    authData,
    logout,
  };

  return (
    <Theme>
      <Router>
        <Container>
          <Navbar {...props} />
          <Content>
            <Switch>
              <Route path="/palettes/users/:username">
                <SavedPalettesPage />
              </Route>
              <Route path="/palettes/:id">
                <ViewPalettePage {...props} />
              </Route>
              <Route path="/palettes">
                <SavedPalettesPage />
              </Route>
              <Route path="/register">
                <RegisterPage {...props} />
              </Route>
              <Route path="/login">
                <LoginPage {...props} />
              </Route>
              <Route path="/">
                <CreatePalettePage {...props} />
              </Route>
            </Switch>
          </Content>
        </Container>
      </Router>
    </Theme>
  );
}

export default App;
