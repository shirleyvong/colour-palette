import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Palette from '../components/Palette';
import FileSelector from '../components/FileSelector';
import api from '../services/api';
import { StyledButton as Button } from '../styles/StyledComponents';
import { ReactComponent as Image } from '../images/undraw_add_color_19gv.svg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

const Section = styled.div`
`;
// max-width: 50vw;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 10px 10px 0px 10px;
`;

const StyledImage = styled(Image)`
  max-height: 600px;
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: 20px;
`;

const CreatePalettePage = ({ isAuthenticated: checkAuth, authData }) => {
  const history = useHistory();
  const [colours, setColours] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imageSource, setImageSource] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkAuth(authData));
  }, [authData, checkAuth])

  const setImageSourceFromFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSource(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadFile = (file) => {
    api.generatePalette(file)
      .then((res) => {
        setImageFile(file);
        setColours(res.colours);
        setImageSourceFromFile(file);
      })
      .catch((err) => { 
        if (err.response && err.response.status < 500 && err.response.data) {
          toast.error(err.response.data);
        } else {
          toast.error('Something unexpected happened, try again later.');
        }
      });
  };

  const resetState = () => {
    setColours([]);
    setImageFile();
    setImageSource('');
  };

  const savePalette = async () => {
    if (isAuthenticated) {
      api.savePalette(imageFile, colours, authData.authToken)
        .then((res) => {
          history.push(`/palettes/${res.id}`);
          toast.success('Palette saved!');
        })
        .catch((err) => {
          if (err.response && err.response.status < 500 && err.response.data) {
            toast.error(err.response.data);
          } else {
            toast.error('Something unexpected happened, try again later.');
          }
        });

    }
  };

  const isPaletteGenerated = colours.length > 0 && imageSource;

  return (
    <Container>
      {isPaletteGenerated
        ? (
          <>
            <Palette colours={colours} imageSource={imageSource} />
              <ButtonContainer>
                {isAuthenticated && <StyledButton onClick={savePalette}>Save</StyledButton>}
                <StyledButton onClick={resetState}>Back</StyledButton>
              </ButtonContainer>
          </>
        ) : (
          <>
            {/* <Section> */}
              <h1>Create a colour palette</h1>
              <FileSelector uploadFile={uploadFile} />
            {/* </Section>
            <Section> */}
              {/* <StyledImage /> */}
            {/* </Section> */}
          </>
        )}
    </Container>
  );
};

export default CreatePalettePage;
