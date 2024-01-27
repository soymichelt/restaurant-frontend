/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';
import { Movements } from '../components';
import { format } from 'date-fns';
import { get } from '../../../services/warehouse/ingredients';
import { MovementModel, all } from '../../../services/warehouse/movements';
import { debounce } from '../../../shared/utils/debounce';
import { useParams } from 'react-router-dom';

export const MovementsContainer = () => {
  const { ingredientId } = useParams();

  const { state: stateIngredient, ...ingredientAction } = useDataProvider();
  const { state: stateMovements, ...movementsAction } = useDataProvider();
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (stateIngredient.statusData === LOADING && ingredientId) {
      get(ingredientId)
        .then(recipes => ingredientAction.success(recipes))
        .catch(error => ingredientAction.catch(error));
    }
  }, [stateIngredient.isRefresh, ingredientId]);

  useEffect(() => {
    if (stateMovements.statusData === LOADING && ingredientId) {
      all(ingredientId)
        .then(recipes => movementsAction.success(recipes))
        .catch(error => movementsAction.catch(error));
    }
  }, [stateMovements.isRefresh, ingredientId]);

  const { data: ingredient } = stateIngredient || {};
  console.log(ingredient);
  const { data: movements } = stateMovements || {};

  const dataParsed = movements?.map((movement: MovementModel, index: number) => {
    const createdDate = format(new Date(movement.createdAt), 'dd/MM/yyyy HH:mm');
    const updatedDate = format(new Date(movement.updatedAt), 'dd/MM/yyyy HH:mm');
    return {
      ...movement,
      movementNumber: index + 1,
      createdAt: createdDate,
      updatedAt: updatedDate,
    };
  }) || [];

  const handleSearch = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, 500);

  return (
    <Movements
      columns={[
        {
          label: 'ID',
          key: 'movementId',
          hide: true,
        },
        {
          label: 'Movement N°',
          key: 'movementNumber',
        },
        {
          label: 'Tipo',
          key: 'type',
        },
        {
          label: 'Concepto',
          key: 'concept',
        },
        {
          label: 'Cantidad',
          key: 'quantity',
          align: 'center',
        },
        {
          label: 'Stock',
          key: 'stock',
          align: 'center',
        },
        {
          label: 'Creado',
          key: 'createdAt',
          align: 'center',
        },
        {
          label: 'Actualizado',
          key: 'updatedAt',
          align: 'center',
        },
      ]}
      title={stateIngredient.statusData !== LOADING ? ingredient?.name : 'Cargando...'}
      rows={dataParsed.filter((movement: MovementModel) => movement?.concept.includes(searchTerm))}
      onSearch={(event => handleSearch(event.currentTarget.value))}
    />
  );
};
