import './index.styles.css';

export type LogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export const Logo = (props: LogoProps) => {
  const {
    className,
    size = 'md',
  } = props;

  return (
    <h2 className={`logo ${className} logo--${size}`}>
      Kitchen <span>App</span>
    </h2>
  );
};
