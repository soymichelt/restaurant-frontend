/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { OrdersHistory } from '../components';
import { formatDistance } from 'date-fns';
import { OrderHistoryModel, all } from '../../../services/kitchen/orderHistory';

export type OrdersHistoryContainerProps = {
  orderId: string;
};

export const OrdersHistoryContainer = (props: OrdersHistoryContainerProps) => {
  const { state, ...ordersHistoryAction } = useDataProvider(true);

  useEffect(() => {
    if (state.statusData === LOADING) {
      all(props.orderId)
        .then(ordersHistory => ordersHistoryAction.success(ordersHistory))
        .catch(error => ordersHistoryAction.catch(error));
    }
  }, [state.isRefresh]);

  useEffect(() => {
    if (state.statusData !== LOADING) {
      ordersHistoryAction.loading();
    }
  }, [props.orderId]);

  const { data } = state || {};

  const dataParsed = data?.map((orderHistory: OrderHistoryModel) => {
    const createdDate = formatDistance(new Date(orderHistory.createdAt), new Date());
    const updatedDate = formatDistance(new Date(orderHistory.updatedAt), new Date());
    return {
      ...orderHistory,
      createdAt: createdDate,
      updatedAt: updatedDate,
    };
  }) || [];

  return (
    <OrdersHistory
      columns={[
        {
          label: 'ID',
          key: 'orderHistoryId',
          hide: true,
        },
        {
          label: 'Estado',
          key: 'state',
          align: 'center',
        },
        {
          label: 'Estado Previo',
          key: 'prevState',
          align: 'center',
        },
        {
          label: 'Creado Hace',
          key: 'createdAt',
          align: 'center',
        },
        {
          label: 'Actualizado Hace',
          key: 'updatedAt',
          align: 'center',
        },
      ]}
      rows={dataParsed}
      loading={state.statusData === LOADING}
      error={state.error}
    />
  );
};
