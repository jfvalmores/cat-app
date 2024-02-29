import { FC, ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding-top: 1.5rem;
`;

const ErrorPage: FC = (): ReactElement => (
  <StyledContainer>
    <h1>{'Cat not found :('}</h1>
    <p>Something went wrong — the link for the cat must be invalid or the server is currently unavailable.</p>
    <Link to="/cats">Back to Cat Browser</Link>
  </StyledContainer>
);

export default ErrorPage;
