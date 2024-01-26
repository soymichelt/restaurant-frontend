import { API_URL, API_HOST_HEADER, getAuthHeader } from './../config';

const ORDERS_HISTORY_API_URL = `${API_URL}/kitchen/orders`;

export type OrderHistoryModel = {
  orderHistoryId: string;
  orderId: string;
  state: string;
  prevState: string;

  createdAt: string;
  updatedAt: string;
};

export const all = async (orderId: string): Promise<OrderHistoryModel[]> => {
  const fn = new Promise<OrderHistoryModel[]>((resolve, reject) => {
    fetch(`${ORDERS_HISTORY_API_URL}/${orderId}/history`, {
      method: 'GET',
      headers: {
        'Host': API_HOST_HEADER,
        'Authorization': getAuthHeader() as string,
      },
      redirect: 'follow',
    })
      .then(res => res.text())
      .then(data => {
        const dataParsed = JSON.parse(data);
        if (dataParsed.errorCode) {
          reject(new Error(dataParsed.message));
        }

        resolve(dataParsed);
      })
      .catch(error => reject(error));
  });

  return fn;
}