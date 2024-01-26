/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '../../../shared/components/table';
import { Typography } from '../../../shared/components/typography';

export type OrdersHistoryProps = {
  className?: string;
  columns: Record<string, any>[];
  rows: Record<string, any>[];
  loading?: boolean;
  error?: string | Error;
};

export const OrdersHistory = (props: OrdersHistoryProps) => {
  const {
    className,
    columns,
    rows,
    loading,
    error,
  } = props;

  return (
    <>
      {loading && (
        <Typography color='default'>
          Cargando... 🥱🥱🥱
        </Typography>
      )}
      {(!loading && !error) && (
        <Table
          className={className}
          hideHeader
          condensed
          keyField={'orderHistoryId'}
          collapse={false}
          columns={columns}
          rows={rows}
        />
      )}
      {error && (
        <Typography color='default'>
          Ha ocurrido un error inesperado 😭😭😭
        </Typography>
      )}
    </>
  );
};
