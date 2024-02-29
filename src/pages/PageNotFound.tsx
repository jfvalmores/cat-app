import { FC, ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding-top: 1.5rem;
`;

const PageNotFound: FC = (): ReactElement => (
  <StyledContainer>
    <h1>{'Error 404 — Page not found'}</h1>
    <Link to="/cats">Back to Cat Browser</Link>
  </StyledContainer>
);

export default PageNotFound;
