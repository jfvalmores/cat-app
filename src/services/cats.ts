import { QUERY_PAGE_LIMIT } from '@/constants';
import { GetCatOptions } from '@/types';
import request from './request';

const { REACT_APP_CATS_API_URL, REACT_APP_CATS_API_KEY } = process.env;
request.defaults.baseURL = REACT_APP_CATS_API_URL;

const headers = {
  'x-api-key': REACT_APP_CATS_API_KEY,
};

// Get cat breeds
export const getBreeds = () => request.get('/breeds', { headers });

// Get list of cats based on breed, page limit, and page filters
export const getCats = ({ breed, limit = QUERY_PAGE_LIMIT, page = 1 }: GetCatOptions) =>
  request.get(`/images/search?page=${page}&limit=${limit}&breed_id=${breed}`, { headers });

// Get cat details
export const getCat = (id: string) => request.get(`/images/${id}`, { headers });
