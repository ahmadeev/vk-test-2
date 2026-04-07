import { type ReactNode } from 'react';
import { GlobalPropertiesContext } from './context.ts';

export const GlobalPropertiesProvider = ({ children }: { children: ReactNode }) => {
    return (
        <GlobalPropertiesContext.Provider value={{}}>
            {children}
        </GlobalPropertiesContext.Provider>
    );
};