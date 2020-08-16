import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Palette from '../components/Palette';
import FileSelector from '../components/FileSelector';
import api from '../services/api';
import { StyledButton as Button } from '../styles/StyledComponents';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 10px 10px 0px 10px;
`;

const CreatePalettePage = ({ setBackground }) => {
  const history = useHistory();
  const [colours, setColours] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imageSource, setImageSource] = useState('');

  useEffect(() => () => setBackground(''), []);

  const setImageSourceFromFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSource(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    api.createPalette(formData)
      .then((res) => {
        setImageFile(file);
        setColours(res.colours);
        setImageSourceFromFile(file);
        setBackground(`linear-gradient(${res.colours[0]}, ${res.colours[1]}, ${res.colours[2]})`);
      })
      .catch((err) => { console.log(err); });
  };

  const resetState = () => {
    setColours([]);
    setImageFile();
    setImageSource('');
    setBackground('');
  };

  const savePalette = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('colours', JSON.stringify(colours));
    const result = await api.savePalette(formData);
    history.push(`/palettes/${result.id}`);
  };

  const isPaletteGenerated = colours.length > 0 && imageSource;

  return (
    <Container>
      {isPaletteGenerated
        ? (
          <>
            <Palette colours={colours} imageSource={imageSource} />
            <ButtonContainer>
              <StyledButton onClick={savePalette}>Save</StyledButton>
              <StyledButton onClick={resetState}>Back</StyledButton>
            </ButtonContainer>
          </>
        ) : (
          <>
            <h1>Create a colour palette</h1>
            <FileSelector uploadFile={uploadFile} />
          </>
        )}
    </Container>
  );
};

export default CreatePalettePage;
