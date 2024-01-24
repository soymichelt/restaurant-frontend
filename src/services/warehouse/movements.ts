import { API_URL, API_HOST_HEADER, getAuthHeader } from './../config';

const MOVEMENTS_API_URL = `${API_URL}/warehouse/movements`;

export type MovementModel = {
  movementId: string;
  movementNumber: number;
  type: string;
  concept: string;
  quantity: number;
  stock: number;
  ingredientId: string;
  
  createdAt: string;
  updatedAt: string;
};

export const all = async (ingredientId: string): Promise<MovementModel[]> => {
  const fn = new Promise<MovementModel[]>((resolve, reject) => {
    fetch(`${MOVEMENTS_API_URL}/${ingredientId}`, {
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
