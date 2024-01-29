import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Sections } from '../../../shared/components/sections';
import { ItemType } from '../../../shared/definitions/item';
import { SectionType } from '../../../shared/definitions/section';
import { Dropdown } from '../../../shared/components/dropdown';
import { Typography } from '../../../shared/components/typography';
import { NameWithIdProps } from '../../../shared/definitions/nameWithId';
import { IconButton } from '../../../shared/components/iconButton';
import UpdateIcon from '@mui/icons-material/UpdateRounded';
import DateRangeIcon from '@mui/icons-material/CalendarMonthRounded';
import './index.styles.css';

type OrdersProps = {
  ranges?: NameWithIdProps[];
  rangeSelected?: NameWithIdProps;
  onChangeRange?: (range: NameWithIdProps) => void;

  onRefresh?: React.MouseEventHandler<HTMLButtonElement>;

  sectionList: SectionType[];
  onDragEnd: (result: DropResult) => void;
  items: ItemType[];
  isLoading: boolean;
  onComplete: (itemId: string) => void;
  onEdit: (item: ItemType) => void;
  completeId?: string;
};

export const Orders = (props: OrdersProps) => {
  const {
    ranges,
    rangeSelected,
    onChangeRange,

    onRefresh,

    sectionList,
    onDragEnd,
    items,
    isLoading,
    onComplete,
    onEdit,
    completeId,
  } = props;

  return (
    <>
      <div className='orders__filters'>
        <Typography component='h4' className='title mt-0 mb-0'>
          Orders Board
        </Typography>

        <IconButton
          className='update-button'
          onClick={onRefresh}
          disabled={isLoading}
        >
          <UpdateIcon />
        </IconButton>

        <Dropdown
          icon={<DateRangeIcon />}
          label='Ver Órdenes'
          items={ranges}
          itemSelected={rangeSelected}
          onSelect={onChangeRange}
        />
      </div>

      <Sections
        loading={isLoading}
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
