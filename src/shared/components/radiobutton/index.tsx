import { RadioButtonUncheckedRounded, RadioButtonCheckedRounded } from '@mui/icons-material';
import './index.styles.css';

export type RadioButtonProps = {
  className?: string;
  checked?: boolean;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  color?: string;
};

export const RadioButton = (props: RadioButtonProps) => {
  const {
    className,
    checked,
    label,
    onChange,
    value,
    color,
  } = props;

  return (
    <label className={`radiobutton ${className ?? ''}`}>
      <span className={`radiobutton__content`}>
        <input
          type='radio'
          onChange={onChange}
          value={value}
          checked={checked}
        />

        <span className={`radiobutton__controls`}>
          <RadioButtonCheckedRounded
            className={`checked`}
            style={{ ...(color ? { color } : {}) }}
          />
          <RadioButtonUncheckedRounded
            className={`unchecked`}
            style={{ ...(color ? { color } : {}) }}
          />
        </span>
      </span>
      <span
        className={`radiobutton__label`}
        style={{ ...(color ? { color } : {}) }}
      >
        {label}
      </span>
    </label>
  );
};
