import { NameWithIdProps } from '../../definitions/nameWithId';
import './index.styles.css';

export type SelectProps = {
  label: string;
  placeholder?: string;
  items?: NameWithIdProps[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
};

export const Select = (props: SelectProps) => {
  const {
    label,
    placeholder,
    items,
    value,
    onChange,
    disabled = false,
    error = false,
    errorMessage,
  } = props;

  return (
    <div className={`select-field ${disabled ? 'select-field--disabled' : ''} ${error || errorMessage ? 'select-field--error' : ''}`}>
      <label>{label}</label>
      <select
        defaultValue={value}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {placeholder && (
          <option>{placeholder}</option>
        )}

        {items?.map(item =>
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        )}
      </select>

      {errorMessage && (
        <span className='select-field__error'>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
