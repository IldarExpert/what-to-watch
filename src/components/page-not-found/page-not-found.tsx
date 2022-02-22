import React from 'react';
import {Link} from 'react-router-dom';
import st from 'styled-components';
import {AppRoute} from '../../consts';

const Colored = st(Link)`
  color: #dfcf77;
  font-weight: bold;
  text-decoration: none;
`;

const FlexCentered = st.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

const PageNotFound = () => {
  return (
    <FlexCentered>
      Page not found. Please, go to&nbsp;<Colored to={AppRoute.Main}>main</Colored>&nbsp;page
    </FlexCentered>
  );
};

export default PageNotFound;
