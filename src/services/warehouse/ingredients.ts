import { API_URL, API_HOST_HEADER, getAuthHeader } from './../config';

const INGREDIENTS_API_URL = `${API_URL}/warehouse/ingredients`;

export type IngredientModel = {
  ingredientId: string;
  name: string;
  stock: number;
  
  createdAt: string;
  updatedAt: string;
};

export const all = async (): Promise<IngredientModel[]> => {
  const fn = new Promise<IngredientModel[]>((resolve, reject) => {
    fetch(INGREDIENTS_API_URL, {
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
