import { CloseRounded } from '@mui/icons-material';
import './index.styles.css';
import { IconButton } from '../iconButton';
import { Button } from '../button';

export type ModalProps = {
  title: string;
  acceptButtonText?: string;
  acceptButtonDisabled?: boolean;
  onAccept?: () => void;
  cancelButtonText?: string;
  cancelButtonDisabled?: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactElement | Array<React.ReactElement> | string | number;
};

export const Modal = (props: ModalProps) => {
  const {
    title,
    acceptButtonText,
    acceptButtonDisabled = false,
    onAccept,
    cancelButtonText,
    cancelButtonDisabled = false,
    onClose,
    children,
  } = props;

  return (
    <div className={`overlay`}>
      <div className={`modal`}>
        <header className={`modal__header`}>
          <h2>{title}</h2>
          <IconButton onClick={onClose}>
            <CloseRounded />
          </IconButton>
        </header>
        <div className={`modal__body`}>
          {children}
        </div>
        <footer className={`modal__footer`}>
          <Button onClick={onClose} variant='secondary' disabled={cancelButtonDisabled}>
            {cancelButtonText ? cancelButtonText : 'Cancelar'}
          </Button>
          <Button onClick={onAccept} disabled={acceptButtonDisabled}>
            {acceptButtonText ? acceptButtonText : 'Aceptar'}
          </Button>
        </footer>
      </div>
    </div>
  );
};
