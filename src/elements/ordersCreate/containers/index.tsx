import { useContext } from 'react';
import { GlobalState } from '../../../shared/states/global';
import { OrderCreate } from '../components';
import { create } from '../../../services/kitchen/orders';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';

export const OrderCreateContainer = () => {
  const {
    formOrder,
    setFormOrder,
    setRefreshingOrders,
    showNotification,
  } = useContext(GlobalState);
  const createOrderAction = useDataProvider(false);

  const handleCloseModal = () => {
    setFormOrder({ isOpen: false });
  };

  const handleAcceptModal = () => {
    createOrderAction.loading();

    create()
      .then(() => {
        setRefreshingOrders(true);
        setFormOrder({ isOpen: false });
        createOrderAction.success();
        showNotification('New order created 🍺', 'info');
      })
      .catch((error) => {
        createOrderAction.catch(error);
        showNotification(error.message, 'error');
      });
  };

  return (
    <OrderCreate
      isOpen={formOrder.isOpen}
      title={`Generando una nueva orden...`}
      onCloseModal={handleCloseModal}
      onAcceptModal={handleAcceptModal}
      isLoading={createOrderAction.state.statusData === LOADING}
    />
  );
};
