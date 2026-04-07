import { useContext } from 'react';
import { GlobalPropertiesContext } from './context.ts';

export const useGlobalPropertiesContext = () => {
    const context = useContext(GlobalPropertiesContext);

    if (!context) {
        throw new Error('useGlobalPropertiesContext must be used within GlobalPropertiesProvider');
    }

    return context;
};
