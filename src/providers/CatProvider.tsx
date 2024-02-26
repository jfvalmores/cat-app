import { createContext, Dispatch, FC, ReactElement, ReactNode, SetStateAction, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

type Filters = {
  breed: string;
  limit: number;
  page: number;
};

type Context = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

const CatContext = createContext<Context | null>(null);

export const useCatContext = () => useContext(CatContext);

export const CatProvider: FC<Props> = ({ children }): ReactElement => {
  const [filters, setFilters] = useState<Filters>({ breed: '', limit: 10, page: 1 });

  return <CatContext.Provider value={{ filters, setFilters }}>{children}</CatContext.Provider>;
};
