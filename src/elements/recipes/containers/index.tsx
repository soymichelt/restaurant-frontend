/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { Recipes } from '../components';
import { formatDistance } from 'date-fns';
import { RecipeModel, all } from '../../../services/kitchen/recipes';
import { debounce } from '../../../shared/utils/debounce';

export const RecipesContainer = () => {
  const { state, ...recipesAction } = useDataProvider();
  const [recipeSelected, setRecipeSelected] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (state.statusData === LOADING) {
      all()
        .then(recipes => recipesAction.success(recipes))
        .catch(error => recipesAction.catch(error));
    }
  }, [state.isRefresh]);
  const { data } = state || {};

  const dataParsed = data?.map((recipe: RecipeModel) => {
    const createdDate = formatDistance(new Date(recipe.createdAt), new Date());
    const updatedDate = formatDistance(new Date(recipe.updatedAt), new Date());
    return {
      ...recipe,
      createdAt: createdDate,
      updatedAt: updatedDate,
    };
  }) || [];

  const handleSearch = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, 500);

  return (
    <Recipes
      columns={[
        {
          label: 'ID',
          key: 'recipeId',
          hide: true,
        },
        {
          label: 'Nombre del Platillo',
          key: 'name',
        },
        {
          label: 'Descripción del Platillo',
          key: 'description',
        },
        {
          label: 'Método de preparación',
          key: 'preparationMethod',
        },
        {
          label: 'Creado hace',
          key: 'createdAt',
          align: 'center',
        },
        {
          label: 'Actualizado hace',
          key: 'updatedAt',
          align: 'center',
        },
      ]}
      rows={dataParsed.filter((recipe: RecipeModel) => recipe?.name.includes(searchTerm))}
      recipeSelected={recipeSelected}
      onRecipeSelected={(recipeId: string) => setRecipeSelected(recipeId)}
      onSearch={(event => handleSearch(event.currentTarget.value))}
    />
  );
};
