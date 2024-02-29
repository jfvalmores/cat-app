import { useCookies } from 'react-cookie';
import { Cat, Filters, SelectItem, TCatContext } from '@/types';
import { createContext, FC, ReactElement, ReactNode, useContext, useState } from 'react';
import { CAT_BREED_COOKIE_NAME, QUERY_DEFAULT_PAGE, QUERY_DEFAULT_LIMIT } from '@/constants';

const ContextDefaults: TCatContext = {
  cats: [],
  breeds: [],
  filters: {
    breed: '',
    limit: QUERY_DEFAULT_LIMIT,
    page: QUERY_DEFAULT_PAGE,
  },
  selectedCatId: null,
  setBreeds: () => null,
  setCats: () => null,
  setFilters: () => null,
  setSelectedCatId: () => null,
};

const CatContext = createContext<TCatContext>(ContextDefaults);

export const useCatContext = () => useContext(CatContext);

type Props = {
  children: ReactNode;
};

export const CatProvider: FC<Props> = ({ children }): ReactElement => {
  const [cookies] = useCookies();
  const [breeds, setBreeds] = useState<SelectItem[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    breed: cookies[CAT_BREED_COOKIE_NAME],
    limit: QUERY_DEFAULT_LIMIT,
    page: QUERY_DEFAULT_PAGE,
  });

  return (
    <CatContext.Provider
      value={{ breeds, cats, filters, selectedCatId, setBreeds, setCats, setFilters, setSelectedCatId }}
    >
      {children}
    </CatContext.Provider>
  );
};
