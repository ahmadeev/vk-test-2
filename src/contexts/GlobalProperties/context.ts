import { createContext } from 'react';

type GlobalProperties = Record<string, unknown>

export const GlobalPropertiesContext = createContext<GlobalProperties | undefined>(undefined);
