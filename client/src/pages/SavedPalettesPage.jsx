import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';
import PalettePreview from '../components/PalettePreview';
import { StyledButton } from '../styles/StyledComponents';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SavedPalettesPage = () => {
  const themeContext = useContext(ThemeContext);
  const history = useHistory();
  const { username } = useParams();
  const [palettes, setPalettes] = useState(undefined);

  useEffect(() => {
    if (username) {
      api.getPalettesByUsername(username)
        .then((res) => {
          const results = res.palettes.map((palette) => ({
            id: palette.id,
            colours: palette.colours,
          }));
          setPalettes(results);
        });
    } else {
      api.getAllPalettes()
        .then((res) => {
          const results = res.palettes.map((palette) => ({
            id: palette.id,
            colours: palette.colours,
          }));
          setPalettes(results);
        });
    }
  }, [username]);

  const onButtonClick = () => {
    history.push('/');
  };

  return (
    <Container>
      {username
        ? <h1>{username}'s Palettes</h1>
        : <h1>Explore Palettes</h1>
      }
      {palettes && palettes.length > 0
        ? (
          <Palettes>
            {palettes.map((p) => <PalettePreview colours={p.colours} key={p.id} id={p.id} />)}
          </Palettes>
        )
        : (
          <>
            <p>There are no saved colour palettes.</p>
            {/* <StyledButton onClick={onButtonClick} type="button" colour={themeContext.colours.primary}>
              Create a palette
            </StyledButton> */}
          </>
        )}
    </Container>
  );
};

const Palettes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  overflow: auto;
`;

export default SavedPalettesPage;
