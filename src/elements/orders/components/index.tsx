import { DropResult } from 'react-beautiful-dnd';
import { Sections } from '../../../shared/components/sections';
import { ItemType } from '../../../shared/definitions/item';
import { SectionType } from '../../../shared/definitions/section';
import DateRangeIcon from '@mui/icons-material/CalendarMonthRounded';
import { Dropdown } from '../../../shared/components/dropdown';
import { Typography } from '../../../shared/components/typography';
import './index.styles.css';
import { NameWithIdProps } from '../../../shared/definitions/nameWithId';

type OrdersProps = {
  ranges?: NameWithIdProps[];
  rangeSelected?: NameWithIdProps;
  onChangeRange?: (range: NameWithIdProps) => void;

  sectionList: SectionType[];
  onDragEnd: (result: DropResult) => void;
  items: ItemType[];
  loading: boolean;
  onComplete: (itemId: string) => void;
  onEdit: (item: ItemType) => void;
  completeId?: string;
};

export const Orders = (props: OrdersProps) => {
  const {
    ranges,
    rangeSelected,
    onChangeRange,

    sectionList,
    onDragEnd,
    items,
    loading,
    onComplete,
    onEdit,
    completeId,
  } = props;

  return (
    <>
      <div className='orders__filters'>
        <Typography component='h4' className='mt-0 mb-0'>
          Orders Board
        </Typography>

        <Dropdown
          icon={<DateRangeIcon />}
          label='Ver Órdenes'
          items={ranges}
          itemSelected={rangeSelected}
          onSelect={onChangeRange}
        />
      </div>

      <Sections
        loading={loading}
        items={items}
        onEdit={onEdit}
        onComplete={onComplete}
        sectionList={sectionList}
        onDragEnd={onDragEnd}
        completeId={completeId}
      />
    </>
  );
};
