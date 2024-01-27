import { OrderNotes } from '../components';
import { updateOrderNotes } from '../../../services/kitchen/orders';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { useField } from '../../../shared/hooks/useField';
import { useContext } from 'react';
import { GlobalState } from '../../../shared/states/global';

export type OrderNotesContainerProps = {
  isOpen?: boolean;
  orderId: string;
  recipeName: string;
  defaultNotes?: string;
  onClose?: () => void;
};

export const OrderNotesContainer = (props: OrderNotesContainerProps) => {
  const { showNotification, setRefreshingOrders } = useContext(GlobalState);

  const {
    orderId,
    recipeName,
    defaultNotes,
    onClose = () => {},
  } = props;

  const notesField = useField(defaultNotes);

  const orderNotesAction = useDataProvider(false);

  const handleAcceptModal = () => {
    orderNotesAction.loading();

    updateOrderNotes(orderId, notesField.value as string)
      .then(() => {
        orderNotesAction.success();
        setRefreshingOrders(true);
        showNotification('Order notes updated 🎉', 'info');
        onClose();
      })
      .catch((error) => {
        orderNotesAction.catch(error);
        showNotification(error.message, 'error');
      });
  };

  return (
    <OrderNotes
      title={recipeName}
      onChangeNotes={notesField.onChange}
      notes={notesField.value}
      onCloseModal={onClose}
      onAcceptModal={handleAcceptModal}
      isLoading={orderNotesAction.state.statusData === LOADING}
    />
  );
};
