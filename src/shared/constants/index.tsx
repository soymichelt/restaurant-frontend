import OrderTodo from './../../assets/order-todo.png';
import OrderInProgress from './../../assets/order-inProgress.png';
import OrderDone from './../../assets/order-done.png';
import OrderDelivered from './../../assets/order-delivered.png';

export const SECTIONS_LIST = [
  {
    sectionId: 'todo',
    name: 'Pedido ordenado',
    disableToReceive: true,
    disableToDeliver: true,
    emptyBackgroundPath: OrderTodo,
  },
  {
    sectionId: 'inProgress',
    name: 'En preparación',
    disableToReceive: false,
    disableToDeliver: false,
    emptyBackgroundPath: OrderInProgress,
  },
  {
    sectionId: 'done',
    name: 'Finalizado',
    disableToReceive: false,
    disableToDeliver: false,
    emptyBackgroundPath: OrderDone,
  },
  {
    sectionId: 'delivered',
    name: 'Entregado al cliente',
    disableToReceive: false,
    disableToDeliver: false,
    emptyBackgroundPath: OrderDelivered,
  },
];
