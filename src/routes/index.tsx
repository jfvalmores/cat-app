import { createBrowserRouter, Navigate } from 'react-router-dom';
import CatDetail from '@/containers/CatDetail';
import CatList from '@/containers/CatList';
import { getBreeds, getCat } from '@/services/cats';
import { Breed } from '@/types';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/cats" replace />,
  },
  {
    path: '/cats',
    element: <CatList />,
    async loader() {
      const result = await getBreeds();
      const breeds = result.data?.map((item: Breed) => ({ label: item.name, value: item.id })) ?? [];
      return breeds;
    },
  },
  {
    path: '/cats/:id',
    element: <CatDetail />,
    async loader({ params }) {
      const result = await getCat(params.id as string);
      return result.data;
    },
  },
]);
