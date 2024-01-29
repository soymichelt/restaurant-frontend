import { ReactElement } from 'react';
import './index.styles.css';

export type IconButtonProps = {
  className?: string;
  children: ReactElement;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
};

export const IconButton = (props: IconButtonProps) => {
  const { children, onClick, className, disabled } = props;

  return (
    <button
      className={`icon-button ${className} ${disabled ? 'icon-button--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
