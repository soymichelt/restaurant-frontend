import './index.styles.css';

export type TextFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | React.ChangeEventHandler<HTMLTextAreaElement>;
  component?: 'input' | 'textarea';
  type?: 'text' | 'password';
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
};

export const TextField = (props: TextFieldProps) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    component = 'input',
    type = 'text',
    disabled = false,
    error = false,
    errorMessage,
  } = props;

  return (
    <div className={`text-field ${disabled ? 'text-field--disabled' : ''} ${error || errorMessage ? 'text-field--error' : ''}`}>
      <label>{label}</label>
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

      {error || errorMessage && (
        <span className='text-field__error'>
          {errorMessage}
        </span>
      )}
    </div>
  );
};