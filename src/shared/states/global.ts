import { createContext } from 'react';

export type AuthStateProps = {
  isLogged: boolean;
  myAccount?: {
    userId: string;
    username: string;
    email: string;
    token: string;
    phone?: string;
    image?: string;
  };
};

export type FormOrderStateProps = {
  isOpen: boolean;
};

export type GlobalStateSchema = {
  auth: AuthStateProps,
  setAuth: (auth: AuthStateProps) => void;
  formOrder: FormOrderStateProps;
  setFormOrder: (form: FormOrderStateProps) => void;
  refreshingOrders: boolean;
  setRefreshingOrders: (isRefreshing: boolean) => void;
  showNotification: (message: string, type: 'default' | 'info' | 'success' | 'warn' | 'error') => void;
};

export const initialGlobalState: GlobalStateSchema = {
  auth: {
    isLogged: true,
  },
  setAuth: () => { },
  formOrder: {
    isOpen: false,
  },
  setFormOrder: () => { },
  refreshingOrders: true,
  setRefreshingOrders: () => { },
  showNotification: () => { },
};

export const GlobalState = createContext<GlobalStateSchema>(initialGlobalState);
