import { IconButton } from '../iconButton';
import CloseIcon from '@mui/icons-material/CloseRounded';
import './index.styles.css';

type SnackbarProps = {
  className?: string;
  type?: 'default' | 'success' | 'info' | 'warn' | 'error';
  message?: string;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Snackbar = (props: SnackbarProps) => {
  const {
    className = '',
    type = 'default',
    message,
    onClose,
  } = props;

  return (
    <div className={`snackbar ${className} snackbar--type-${type}`}>
      <div className={`snackbar__content`}>
        {message}
      </div>
      <div className={`snackbar__action-section`}>
        <IconButton className={`snackbar__close-button`} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};
