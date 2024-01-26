import { Modal } from '../../../shared/components/modal';
import { Typography } from '../../../shared/components/typography';

export type OrderCreateModalProps = {
  isOpen: boolean;
  title: string;
  onCloseModal: () => void;
  onAcceptModal?: () => void;
  
  isLoading?: boolean;
};

export const OrderCreate = (props: OrderCreateModalProps) => {
  const {
    isOpen = false,
    title,
    onCloseModal,
    onAcceptModal,
    isLoading = false,
  } = props;

  return (
    <>
      {isOpen && (
        <Modal
          title={title}
          onClose={onCloseModal}
          onAccept={onAcceptModal}
          acceptButtonDisabled={isLoading}
        >
          <Typography component='h5'>
            Creando una nueva orden
          </Typography>
          <Typography>
            Al generar una nueva orden el platillo se seleccionará automáticamente y se registrará en la aplicación del restaurante para poder administrar sus cambios de estado.
          </Typography>
        </Modal>
      )}
    </>
  );
};