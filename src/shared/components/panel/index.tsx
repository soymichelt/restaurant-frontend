import { ReactElement } from 'react';
import './index.styles.css';

export type PanelProps = {
  className?: string;
  children: string | number | ReactElement | Array<ReactElement>;
};

export const Panel = (props: PanelProps) => {
  const {
    className = '',
    children,
  } = props;

  return (
    <div className={`panel ${className}`}>
      {children}
    </div>
  );
};
