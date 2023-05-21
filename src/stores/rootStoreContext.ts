import {createContext} from 'react';
import {RootStore} from '.';

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;
