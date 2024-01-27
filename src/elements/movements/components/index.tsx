/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '../../../shared/components/table';

export type MovementsProps = {
  className?: string;
  title?: string;
  columns: Record<string, any>[];
  rows: Record<string, any>[];
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Movements = (props: MovementsProps) => {
  const {
    className,
    title,
    columns,
    rows,
    onSearch,
  } = props;

  return (
    <Table
      className={className}
      title={title}
      keyField={'movementId'}
      columns={columns}
      rows={rows}
      onSearch={onSearch}
    />
  );
};