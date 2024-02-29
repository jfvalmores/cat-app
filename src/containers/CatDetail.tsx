import { FC, ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@/components/Button';
import { Cat } from '@/types';
import { Card } from '@/components/Card';
import { useCatContext } from '@/providers/CatProvider';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
`;

const CatDetail: FC = (): ReactElement => {
  const data = useLoaderData() as Cat;
  const navigate = useNavigate();
  const { setSelectedCatId } = useCatContext();
  const [breed] = data?.breeds;

  const back = () => {
    setSelectedCatId(null);
    navigate('/cats');
  };

  return (
    <StyledContainer>
      <Card header={<Button onClick={back}>Back</Button>} image={data.url}>
        <h4>{breed.name}</h4>
        <h5>Origin: {breed.origin}</h5>
        <h6>{breed.temperament}</h6>
        <p>{breed.description}</p>
      </Card>
    </StyledContainer>
  );
};

export default CatDetail;
