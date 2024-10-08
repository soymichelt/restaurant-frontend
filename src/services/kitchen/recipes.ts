import { API_URL, API_HOST_HEADER, getAuthHeader } from './../config';

const RECIPES_API_URL = `${API_URL}/kitchen/recipes`;

export type RecipeModel = {
  recipeId: string;
  name: string;
  description: string;
  preparationMethod: string;
  ingredients: {
    ingredientId: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

export const all = async (): Promise<RecipeModel[]> => {
  const fn = new Promise<RecipeModel[]>((resolve, reject) => {
    fetch(RECIPES_API_URL, {
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
