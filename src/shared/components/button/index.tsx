import './index.styles.css';

export type ButtonProps = {
  className?: string;
  variant?: 'primary' | 'secondary';
  fullwidth?: boolean;
  children: string | number | React.ReactElement | Array<React.ReactElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  const {
    className = '',
    variant = 'primary',
    onClick,
    children,
    fullwidth = false,
    disabled = false,
  } = props;

  return (
    <button
      className={`button ${className} button--${variant} ${fullwidth && 'button--fullwidth'} ${disabled ? 'button--disabled' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
