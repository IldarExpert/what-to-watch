import React from 'react';
import styled from 'styled-components';

const FlexCenter = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const LoadingScreen = (): JSX.Element => {
  return (
    <FlexCenter>
      Loading...
    </FlexCenter>
  );
};

export default LoadingScreen;
