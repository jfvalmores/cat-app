import Button from '@/components/Button';
import { Cat } from '@/types';
import { FC, ReactElement } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const CatDetail: FC = (): ReactElement => {
  const data = useLoaderData() as Cat;
  const navigate = useNavigate();
  const [breed] = data.breeds;

  console.log('!!! data', data);

  const back = () => {
    navigate('/cats');
  };

  return (
    <div>
      <div>
        <Button onClick={back}>Back</Button>
      </div>
      <img src={data.url} alt={data.id} height={400} />
      <div>
        <h4>{breed.name}</h4>
        <h5>Origin: {breed.origin}</h5>
        <h6>{breed.temperament}</h6>
        <p>{breed.description}</p>
      </div>
    </div>
  );
};

export default CatDetail;
