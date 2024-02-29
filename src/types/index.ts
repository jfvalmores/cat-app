import { Dispatch, SetStateAction } from 'react';

export type GetCatOptions = {
  breed: string;
  limit: number;
  page: number;
};

export type Breed = {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
};

export type Cat = {
  id: string;
  url: string;
  breeds: Breed[];
};

export type SelectItem = {
  label: string;
  value: string;
};

export type Filters = {
  breed: string;
  limit: number;
  page: number;
};

export type TCatContext = {
  breeds: SelectItem[];
  cats: Cat[];
  filters: Filters;
  selectedCatId: string | null;
  setBreeds: Dispatch<SetStateAction<SelectItem[]>>;
  setCats: Dispatch<SetStateAction<Cat[]>>;
  setFilters: Dispatch<SetStateAction<Filters>>;
  setSelectedCatId: Dispatch<SetStateAction<string | null>>;
};
