import { Modal } from '../../../shared/components/modal';
import { TextField } from '../../../shared/components/textField';
import { Typography } from '../../../shared/components/typography';

export type OrderNotesProps = {
  title: string;
  notes?: string;
  onChangeNotes?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onCloseModal?: () => void;
  onAcceptModal?: () => void;
  
  isLoading?: boolean;
};

export const OrderNotes = (props: OrderNotesProps) => {
  const {
    title,
    notes,
    onChangeNotes,
    onCloseModal,
    onAcceptModal,
    isLoading = false,
  } = props;

  return (
    <Modal
      title={'Añada detalles a la orden'}
      onClose={onCloseModal}
      onAccept={onAcceptModal}
      acceptButtonDisabled={isLoading}
    >
      <Typography className='mb-5' component='h5'>
        {`Platillo: ${title}`}
      </Typography>

      <TextField
        className='mb-0'
        label='Notas'
        placeholder='Actualizar notas'
        component='textarea'
        onChange={onChangeNotes}
        value={notes}
      />
    </Modal>
  );
};