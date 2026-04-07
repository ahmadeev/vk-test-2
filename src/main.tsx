import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import AllCats from './pages/AllCats/AllCats.tsx';
import Fallback from './pages/Fallback/Fallback.tsx';
import FavoriteCats from './pages/FavoriteCats/FavoriteCats.tsx';
import { GlobalPropertiesProvider } from './contexts/GlobalProperties/provider.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient.ts';

const router = createHashRouter([
    {
        element: <App />,
        children: [
            {
                index: true,
                path: '/',
                element: <AllCats />,
            },
            {
                path: '/favorite',
                element: <FavoriteCats />,
            },
        ],
        errorElement: <Fallback />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <GlobalPropertiesProvider>
            <RouterProvider router={router} />
        </GlobalPropertiesProvider>
    </QueryClientProvider>,
);
