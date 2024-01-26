/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '../../../shared/components/table';
import { OrdersHistoryContainer } from '../../ordersHistory/containers';

export type OrdersListProps = {
  className?: string;
  columns: Record<string, any>[];
  rows: Record<string, any>[];
  orderSelected?: string;
  onRecipeSelected?: (recipe: string) => void;
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
};

export const OrdersList = (props: OrdersListProps) => {
  const {
    className,
    columns,
    rows,
    orderSelected,
    onRecipeSelected,
    onSearch,
  } = props;

  return (
    <Table
      className={className}
      title='Órdenes'
      keyField={'orderId'}
      keySelected={orderSelected}
      onSelect={onRecipeSelected}
      collapse={true}
      columns={columns}
      rows={rows}
      onSearch={onSearch}
      renderCollapse={(row: Record<string, any>) => {
        return (
          <OrdersHistoryContainer orderId={row.orderId} />
        );
      }}
    />
  );
};
