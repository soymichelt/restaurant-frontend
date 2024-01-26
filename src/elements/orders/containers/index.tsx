/* eslint-disable react-hooks/exhaustive-deps */
import { DropResult } from 'react-beautiful-dnd';
import { Orders } from '../components';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { OrderModel, all, moveOrderToNextState, updateOrderState } from '../../../services/kitchen/orders';
import { useContext, useEffect, useState } from 'react';
import { SECTIONS_LIST } from '../../../shared/constants';
import { GlobalState } from '../../../shared/states/global';
import { ItemType } from '../../../shared/definitions/item';

export const OrdersContainer = () => {
  const { refreshingOrders, setRefreshingOrders } = useContext(GlobalState);
  const { state, ...ordersAction } = useDataProvider();

  const getOrders = () => {
    all()
      .then(orders => ordersAction.success(orders))
      .catch(error => ordersAction.catch(error));
  };

  useEffect(() => {
    if (state.statusData === LOADING) {
      getOrders();
    }
  }, [state.isRefresh]);

  useEffect(() => {
    if (refreshingOrders) {
      getOrders();
      setRefreshingOrders(false);
    }
  }, [refreshingOrders]);

  const { data } = state || {};

  const [completeId, setCompleteId] = useState<string | null>();
  const handleComplete = (itemId: string) => {
    setCompleteId(itemId);
    moveOrderToNextState(itemId)
      .then(() => ordersAction.loading())
      .finally(() => setCompleteId(null));
  };

  const handlerDragEnd = (result: DropResult) => {
    if(!result.destination) return;

    console.log('Drag and Drop >>>> ', result.draggableId, result.destination.droppableId);

    updateOrderState(result.draggableId, result.destination.droppableId)
      .catch(error => {
        console.log('Error >>>> ', error);
        ordersAction.loading();
      });

    const newTaskItems = data?.map((order: OrderModel) => {
      if (order.orderId === result.draggableId) {
        return { ...order, state: result.destination?.droppableId }
      }
      return order;
    });
    ordersAction.success(newTaskItems);
  };

  const handleEdit = (item: ItemType) => {
    console.log('Editing >>>> ', item);
  };

  return (
    <Orders
      sectionList={SECTIONS_LIST}
      items={data?.map((item: OrderModel) => ({
        itemId: item.orderId,
        itemState: item.state,
        itemDescription: item.recipeDescription,
        itemCreatorId: item.recipeId,
        itemHeader: item.recipeName,
        itemPriority: item.state,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))}
      loading={false}
      onEdit={handleEdit}
      onComplete={handleComplete}
      onDragEnd={handlerDragEnd}
      completeId={completeId as string}
    />
  );
};
