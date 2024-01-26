/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { OrdersList } from '../components';
import { formatDistance } from 'date-fns';
import { OrderModel, all } from '../../../services/kitchen/orders';
import { debounce } from '../../../shared/utils/debounce';

export const OrdersListContainer = () => {
  const { state, ...ordersAction } = useDataProvider();
  const [orderSelected, setOrderSelected] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (state.statusData === LOADING) {
      all()
        .then(recipes => ordersAction.success(recipes))
        .catch(error => ordersAction.catch(error));
    }
  }, [state.isRefresh]);
  const { data } = state || {};

  const dataParsed = data?.map((order: OrderModel) => {
    const createdDate = formatDistance(new Date(order.createdAt), new Date());
    const updatedDate = formatDistance(new Date(order.updatedAt), new Date());
    return {
      ...order,
      createdAt: createdDate,
      updatedAt: updatedDate,
    };
  }) || [];

  const handleSearch = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, 500);

  return (
    <OrdersList
      columns={[
        {
          label: 'ID',
          key: 'orderId',
          hide: true,
        },
        {
          label: 'Order N°',
          key: 'orderNumber',
        },
        {
          label: 'Nombre del Platillo',
          key: 'recipeName',
        },
        {
          label: 'Estado',
          key: 'state',
        },
        {
          label: 'Creado hace',
          key: 'createdAt',
          align: 'center',
        },
        {
          label: 'Actualizado',
          key: 'updatedAt',
          align: 'center',
        },
      ]}
      rows={dataParsed.filter((order: OrderModel) => (order.recipeName as string).includes(searchTerm))}
      orderSelected={orderSelected}
      onRecipeSelected={(recipeId: string) => setOrderSelected(recipeId)}
      onSearch={(event => handleSearch(event.currentTarget.value))}
    />
  );
};
