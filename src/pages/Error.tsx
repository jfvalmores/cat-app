import { useToastContext } from '@/providers/ToastProvider';
import { FC, ReactElement, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding-top: 1.5rem;
`;

const ErrorPage: FC = (): ReactElement => {
  const { showToast } = useToastContext();

  useEffect(() => {
    showToast({ type: 'error', message: 'Apologies but we could not load the cat for you at this time! Miau!' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledContainer>
      <h1>{'Cat not found :('}</h1>
      <p>Something went wrong — the link for the cat must be invalid or the server is currently unavailable.</p>
      <Link to="/cats">Back to Cat Browser</Link>
    </StyledContainer>
  );
};

export default ErrorPage;
