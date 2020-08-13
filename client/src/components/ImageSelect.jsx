import React, { useState } from 'react';
import styled from 'styled-components';
import ImageFile from './ImageFile';
import ImageLink from './ImageLink';

const sourceTypes = {
  UPLOAD: 'UPLOAD',
  LINK: 'LINK',
};

const ImageSelect = ({ uploadURL, uploadFile }) => {
  const [sourceType, setSourceType] = useState(sourceTypes.UPLOAD);

  return (
    <Container>
      <InnerContainer>
        <h1>Create a colour palette</h1>
        {/* <div>
          <button onClick={() => setSourceType(sourceTypes.UPLOAD)} type="button">Upload</button>
          <button onClick={() => setSourceType(sourceTypes.LINK)} type="button">Link</button>
        </div> */}
        <ImageSource>
          { sourceType === sourceTypes.UPLOAD
            ? <ImageFile uploadFile={uploadFile} />
            : <ImageLink uploadURL={uploadURL} /> }
        </ImageSource>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
  background: ${(props) => props.theme.colours.background};
  background: ${(props) => props.theme.colours.backgroundGradient};
  height: 100%;
  box-sizing: border-box;
`;

const InnerContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  max-width: 768px;
`;

const ImageSource = styled.div`
  height: 125px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ImageSelect;
