import { createBrowserRouter, Navigate } from 'react-router-dom';
import { getCat } from '@/services/cats';
import CatListPage from '@/pages/CatList';
import CatDetailPage from '@/pages/CatDetail';
import ErrorPage from '@/pages/Error';
import PageNotFound from '@/pages/PageNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/cats" replace />,
  },
  {
    path: '/cats',
    element: <CatListPage />,
  },
  {
    path: '/cats/:id',
    element: <CatDetailPage />,
    async loader({ params }) {
      // Load cat details before redirect
      const result = await getCat(params.id as string);
      if (!result?.data?.breeds) {
        throw Error('Cat detail link is invalid');
      }
      return result.data;
    },
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);
