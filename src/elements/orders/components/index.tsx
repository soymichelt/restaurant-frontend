import { DropResult } from 'react-beautiful-dnd';
import { Sections } from '../../../shared/components/sections';
import { ItemType } from '../../../shared/definitions/item';
import { SectionType } from '../../../shared/definitions/section';

type OrdersProps = {
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
    sectionList,
    onDragEnd,
    items,
    loading,
    onComplete,
    onEdit,
    completeId,
  } = props;

  return (
    <Sections
      loading={loading}
      items={items}
      onEdit={onEdit}
      onComplete={onComplete}
      sectionList={sectionList}
      onDragEnd={onDragEnd}
      completeId={completeId}
    />
  );
};
