import { ReactElement } from 'react';
import './index.styles.css';

export type PanelProps = {
  className?: string;
  children: string | number | ReactElement | Array<ReactElement>;
  size?: 'short' | 'full';
};

export const Panel = (props: PanelProps) => {
  const {
    className = '',
    children,
    size = 'short',
  } = props;

  return (
    <div className={`panel ${className} panel-size--${size}`}>
      {children}
    </div>
  );
};
