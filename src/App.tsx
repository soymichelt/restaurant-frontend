import { useEffect, useRef, useState } from 'react';
import { RouterComponent } from './routes';
import { AuthStateProps, FormOrderStateProps, GlobalState, initialGlobalState } from './shared/states/global';
import { getAuthData, verifyAuthToken } from './services/config';
import { Snackbar } from './shared/components/snackbar';

const App = () => {
  const userIsAuthenticated = verifyAuthToken();
  const userAuthData = getAuthData();
  const [auth, setAuth] = useState<AuthStateProps>({
    isLogged: userIsAuthenticated,
    myAccount: userAuthData
      ? {
        token: userAuthData.token as string,
        userId: userAuthData.userId as string,
        username: userAuthData.username as string,
        email: userAuthData.email as string,
        phone: userAuthData.phone as string,
        image: userAuthData.image as string,
      }
      : undefined,
  });
  const [formOrder, setFormOrder] = useState<FormOrderStateProps>(initialGlobalState.formOrder);
  const [refreshingOrders, setRefreshingOrders] = useState<boolean>(initialGlobalState.refreshingOrders);

  const [notification, setNotification] = useState<{ message: string; type: 'default' | 'info' | 'success' | 'warn' | 'error'; } | undefined>();
  const showNotification = (message: string, type?: 'default' | 'info' | 'success' | 'warn' | 'error'): void => setNotification({ message, type: type ?? 'default' });
  
  const notificationTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  const handleCloseNotification = () => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = undefined;
    }

    setNotification(undefined);
  };

  useEffect(() => {
    if (notification?.message) {
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(undefined);
      }, 5000);
    }

    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [notification?.message]);

  return (
    <GlobalState.Provider value={{
      auth,
      setAuth,
      formOrder,
      setFormOrder,
      refreshingOrders,
      setRefreshingOrders,
      showNotification,
    }}>
      <RouterComponent />

      {notification && (
        <Snackbar
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </GlobalState.Provider>
  )
}

export default App
