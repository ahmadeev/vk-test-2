import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import AllCats from './pages/AllCats/AllCats.tsx';
import Fallback from './pages/Fallback/Fallback.tsx';
import FavoriteCats from './pages/FavoriteCats/FavoriteCats.tsx';
import { FavoriteCatsProvider } from './contexts/FavoriteCats/provider.tsx';

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
    <StrictMode>
        <FavoriteCatsProvider>
            <RouterProvider router={router} />
        </FavoriteCatsProvider>
    </StrictMode>,
);
