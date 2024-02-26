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
