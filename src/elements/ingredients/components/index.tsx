/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '../../../shared/components/table';

export type RecipesProps = {
  className?: string;
  columns: Record<string, any>[];
  rows: Record<string, any>[];
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Ingredients = (props: RecipesProps) => {
  const {
    className,
    columns,
    rows,
    onSearch,
  } = props;

  return (
    <Table
      className={className}
      title='Inventario de Ingredientes'
      keyField={'ingredientId'}
      columns={columns}
      rows={rows}
      onSearch={onSearch}
    />
  );
};