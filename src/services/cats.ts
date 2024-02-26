import { GetCatOptions } from '@/types';
import request from './request';

const { REACT_APP_CATS_API_URL } = process.env;
request.defaults.baseURL = REACT_APP_CATS_API_URL;

// Get cat breeds
export const getBreeds = () => request.get('/breeds');

// Get list of cats based on breed, page limit, and page filters
export const getCats = ({ breed, limit = 10, page = 1 }: GetCatOptions) =>
  request.get(`/images/search?page=${page}&limit=${limit}&breed_id=${breed}`);

// Get cat details
export const getCat = (id: string) => request.get(`/images/${id}`);
