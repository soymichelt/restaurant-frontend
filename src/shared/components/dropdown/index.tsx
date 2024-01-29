import { ReactElement, useState } from 'react';
import { NameWithIdProps } from '../../definitions/nameWithId';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded';
import './index.styles.css';

export type DropdownProps = {
  className?: string;
  label?: string;
  icon?: ReactElement;
  items?: NameWithIdProps[];
  itemSelected?: NameWithIdProps;
  onSelect?: (itemSelected: NameWithIdProps) => void;
};

export const Dropdown = (props: DropdownProps) => {
  const {
    className,
    label,
    icon,
    items,
    itemSelected,
    onSelect,
  } = props;

  const [active, setActive] = useState(false);
  const [item, setItem] = useState<NameWithIdProps | undefined>(itemSelected);

  return (
    <div className={`dropdown ${className || ''} ${active ? 'active' : ''}`}>
      <div
        className={`dropdown__button`}
        onClick={() => setActive(!active)}
      >
        <div className={`dropdown__content`}>
          {icon}
          <span className={`dropdown__button-label`}>
            {item?.name || label}
          </span>
        </div>

        {active ? (
          <ExpandLessIcon className={`arrow`} />
        ) : (
          <ExpandMoreIcon className={`arrow`} />
        )}
      </div>
      <ul className={`dropdown__list`}>
        {items?.length && items.map(item => <li
          key={item.id}
          onClick={() => {
            setItem(item);
            setActive(false);

            if (onSelect) {
              onSelect(item);
            }
          }}
        >
          {item.name}
        </li>)}
      </ul>
    </div>
  );
};
