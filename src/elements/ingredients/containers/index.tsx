/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { formatDistance } from 'date-fns';
import { IngredientModel, all } from '../../../services/warehouse/ingredients';
import { debounce } from '../../../shared/utils/debounce';
import { Ingredients } from '../components';
import { IconButton } from '../../../shared/components/iconButton';
import MovementIcon from '@mui/icons-material/FolderOpenRounded';
import { useNavigate } from 'react-router';

export const IngredientsContainer = () => {
  const navigate = useNavigate();
  const { state, ...ingredientsAction } = useDataProvider();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (state.statusData === LOADING) {
      all()
        .then(recipes => ingredientsAction.success(recipes))
        .catch(error => ingredientsAction.catch(error));
    }
  }, [state.isRefresh]);
  const { data } = state || {};

  const dataParsed = data?.map((recipe: IngredientModel) => {
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

  const handleMovementsOpen = (ingredientId: string) => {
    navigate(`/ingredients/${ingredientId}/movements/`);
  };

  return (
    <Ingredients
      columns={[
        {
          label: 'ID',
          key: 'ingredientId',
          hide: true,
        },
        {
          label: 'Nombre del Ingrediente',
          key: 'name',
        },
        {
          label: 'Stock de Inventario',
          key: 'stock',
          align: 'center',
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
        {
          label: '',
          key: 'actions',
          align: 'center',
          actions: true,
        },
      ]}
      rows={
        dataParsed
          .filter((ingredient: IngredientModel) => ingredient?.name.includes(searchTerm))
          .map((ingredient: IngredientModel) => ({
            ...ingredient,
            actions: <IconButton
                onClick={() => handleMovementsOpen(ingredient.ingredientId)}
            >
              <MovementIcon />
            </IconButton>
          }))
      }
      onSearch={(event => handleSearch(event.currentTarget.value))}
    />
  );
};
