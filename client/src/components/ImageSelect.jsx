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
    </Container>
  );
};

const Container = styled.div`
  ${'' /* display: flex;
  flex-direction: column;
  align-items: center; */}
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
