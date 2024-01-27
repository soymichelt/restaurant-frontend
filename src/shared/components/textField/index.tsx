import { ReactElement } from 'react';
import './index.styles.css';

export type TextFieldProps = {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLTextAreaElement>;
  component?: 'input' | 'textarea';
  type?: 'text' | 'password';
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  rounded?: boolean;
  icon?: ReactElement;
};

export const TextField = (props: TextFieldProps) => {
  const {
    className,
    label,
    placeholder,
    value,
    onChange,
    component = 'input',
    type = 'text',
    disabled = false,
    error = false,
    errorMessage,
    rounded = false,
    icon,
  } = props;

  return (
    <div className={`text-field ${className ? className : ''} ${disabled ? 'text-field--disabled' : ''} ${error || errorMessage ? 'text-field--error' : ''} ${rounded ? 'text-field--rounded' : ''}`}>
      {label && (
        <label>{label}</label>
      )}

      <div className={`text-field__container ${icon ? 'text-field__container--icon' : ''}`}>
        {icon}
        {component === 'input' ? (
          <input
            type={type}
            placeholder={placeholder ?? label}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            value={value}
            disabled={disabled}
          />
        ) : (
          <textarea
            placeholder={placeholder ?? label}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            value={value}
            disabled={disabled}
          ></textarea>
        )}
      </div>

      {error || errorMessage && (
        <span className='text-field__error'>
          {errorMessage}
        </span>
      )}
    </div>
  );
};