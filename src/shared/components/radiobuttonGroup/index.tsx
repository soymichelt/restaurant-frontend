import { ReactElement } from 'react';
import './index.styles.css';
import { Typography } from '../typography';

export type RadioButtonGroup = {
  className?: string;
  label?: string;
  children?: ReactElement | Array<ReactElement>;
  vertical?: boolean;
};

export const RadioButtonGroup = (props: RadioButtonGroup) => {
  const {
    className,
    label,
    children,
    vertical,
  } = props;

  return (
    <fieldset className={`radiobutton-group ${className ?? ''} ${vertical ? 'radiobutton-group--vertical' : ''}`}>
      <Typography className={`radiobutton-group__title pt-0 pb-0`}>
        {label as string}
      </Typography>

      <div>
        {children}
      </div>
    </fieldset>
  );
};
