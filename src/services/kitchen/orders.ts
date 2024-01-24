import { API_URL, API_HOST_HEADER, getAuthHeader } from './../config';

const ORDERS_API_URL = `${API_URL}/kitchen/orders`;

export type OrderModel = {
  orderId: string;
  recipeId: string;
  state: string;
  recipeName?: string;
  recipeDescription?: string;
  recipePreparationMethod?: string;

  createdAt: string;
  updatedAt: string;
};

export const all = async (): Promise<OrderModel[]> => {
  const fn = new Promise<OrderModel[]>((resolve, reject) => {
    fetch(ORDERS_API_URL, {
      method: 'GET',
      headers: {
        'Host': API_HOST_HEADER,
        'Authorization': getAuthHeader() as string,
      },
      redirect: 'follow',
    })
      .then(res => res.text())
      .then(data => resolve(JSON.parse(data)))
      .catch(error => reject(error));
  });

  return fn;
}

export const create = async(): Promise<OrderModel> => {
  const fn = new Promise<OrderModel>((resolve, reject) => {
    fetch(ORDERS_API_URL, {
      method: 'POST',
      headers: {
        'Host': API_HOST_HEADER,
        'Authorization': getAuthHeader() as string,
      },
      redirect: 'follow',
    })
      .then((res) => res.text())
      .then((data) => resolve(JSON.parse(data)))
      .catch((error) => reject(error));
  });

  return fn;
};
