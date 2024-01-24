import { ReactElement } from 'react';
import './index.styles.css';

export type IconButtonProps = {
  className?: string;
  children: ReactElement;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const IconButton = (props: IconButtonProps) => {
  const { children, onClick, className } = props;

  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
