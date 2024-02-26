import { ChangeEventHandler, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import * as catService from '@/services/cats';
import { Cat, SelectItem } from '@/types';
import Select from '@/components/Select';
import Button from '@/components/Button';

const CatList: FC = (): ReactElement => {
  const navigate = useNavigate();
  const breedList = useLoaderData();
  const breeds = useMemo(() => breedList, [breedList]) as SelectItem[];
  const [cats, setCats] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    if (selectedBreed) {
      getCats(selectedBreed);
    }
  }, [selectedBreed]);

  const selectBreed: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedBreed(e.target.value);
  };

  const getCats = async (breed: string) => {
    const result = await catService.getCats({ breed, limit: 10, page: 1 });
    setCats(result.data);
  };

  const viewCat = useCallback(
    (id: string) => {
      navigate(`/cats/${id}`);
    },
    [navigate],
  );

  return (
    <div>
      {/* Breed filter */}
      <Select label="Breed" items={breeds} onChange={selectBreed} />
      {/* Cat list */}
      <div>
        {cats.map((cat: Cat) => (
          <div key={cat.id}>
            <img src={cat.url} alt={cat.id} width={200} />
            <Button onClick={() => viewCat(cat.id)}>View details</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatList;
