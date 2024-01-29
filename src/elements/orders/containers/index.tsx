/* eslint-disable react-hooks/exhaustive-deps */
import { DropResult } from 'react-beautiful-dnd';
import { Orders } from '../components';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { OrderModel, all, moveOrderToNextState, updateOrderState } from '../../../services/kitchen/orders';
import { useContext, useEffect, useState } from 'react';
import { SECTIONS_LIST } from '../../../shared/constants';
import { GlobalState } from '../../../shared/states/global';
import { ItemType } from '../../../shared/definitions/item';
import { OrderNotesContainer } from '../../ordersNotes/containers';
import { NameWithIdProps } from '../../../shared/definitions/nameWithId';

const RANGES_ITEMS = [
  {
    id: 'today',
    name: 'Today',
  },
  {
    id: 'month',
    name: 'Month',
  },
  {
    id: 'all',
    name: 'Previous',
  },
];

export const OrdersContainer = () => {
  const { refreshingOrders, setRefreshingOrders } = useContext(GlobalState);
  const { state, ...ordersAction } = useDataProvider();

  const [range, setRange] = useState<NameWithIdProps>(RANGES_ITEMS[0]);
  const handleChangeRange = (newRange: NameWithIdProps) => {
    setRange(newRange);

    if (newRange) {
      getOrders(newRange.id);
    }
  };

  const getOrders = (rangeId?: string) => {
    all(rangeId)
      .then(orders => ordersAction.success(orders))
      .catch(error => ordersAction.catch(error));
  };

  useEffect(() => {
    if (state.statusData === LOADING) {
      getOrders(range?.id);
    }
  }, [state.isRefresh]);

  useEffect(() => {
    if (refreshingOrders) {
      getOrders(range?.id);
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

  const [orderSelected, setOrderSelected] = useState<ItemType | null>();
  const handleClose = () => setOrderSelected(null);
  const handleEdit = (item: ItemType) => setOrderSelected(item);

  return (
    <>
      <Orders
        ranges={RANGES_ITEMS}
        rangeSelected={range}
        onChangeRange={handleChangeRange}

        sectionList={SECTIONS_LIST}
        items={data?.map((item: OrderModel) => ({
          itemId: item.orderId,
          itemState: item.state,
          itemDescription: item.recipeDescription,
          itemCreatorId: item.recipeId,
          itemHeader: item.recipeName,
          itemPriority: item.state,
          itemNotes: item.notes,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))}
        loading={false}
        onEdit={handleEdit}
        onComplete={handleComplete}
        onDragEnd={handlerDragEnd}
        completeId={completeId as string}
      />

      {orderSelected && (
        <OrderNotesContainer
          isOpen={true}
          orderId={orderSelected.itemId}
          recipeName={orderSelected.itemHeader}
          defaultNotes={orderSelected.itemNotes}
          onClose={handleClose}
        />
      )}
    </>
  );
};
