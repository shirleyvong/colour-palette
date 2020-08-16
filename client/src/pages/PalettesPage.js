import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import PalettePreview from '../components/PalettePreview';

import { StyledButton } from '../styles/StyledComponents';

const PalettesPage = () => {
  const themeContext = useContext(ThemeContext);
  const history = useHistory();
  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    api.getPalettes()
      .then((res) => {
        const results = res.palettes.map((palette) => ({
          id: palette.id,
          colours: palette.colours.map((colour) => `#${colour}`),
        }));
        setPalettes(results);
      });
  }, []);

  const onButtonClick = () => {
    history.push('/');
  };

  return (
    <Container>
      <h1>My Palettes</h1>
      {palettes.length > 0
        ? (
          <Palettes>
            {palettes.map((p) => <PalettePreview colours={p.colours} key={p.id} id={p.id} />)}
          </Palettes>
        )
        : (
          <>
            <p>There are no saved colour palettes.</p>
            <StyledButton onClick={onButtonClick} type="button" colour={themeContext.colours.primary}>
              Create a palette
            </StyledButton>
          </>
        )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 768px;
`;

const Palettes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
  
  // @media (min-width: 768px) {
  //   grid-template-columns: repeat(2, auto);
  // }

  // @media (min-width: 1024px) {
  //   grid-template-columns: repeat(3, auto);
  // }

  // @media (min-width: 1440px) {
  //   grid-template-columns: repeat(4, auto);
  // }
export default PalettesPage;
