/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from '../../../shared/components/table';

export type RecipesProps = {
  className?: '';
  columns: Record<string, any>[];
  rows: Record<string, any>[];
  recipeSelected?: string;
  onRecipeSelected?: (recipe: string) => void;
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Recipes = (props: RecipesProps) => {
  const {
    className,
    columns,
    rows,
    recipeSelected,
    onRecipeSelected,
    onSearch,
  } = props;

  return (
    <Table
      className={className}
      title='Catálogo de Platillos'
      keyField={'recipeId'}
      keySelected={recipeSelected}
      onSelect={onRecipeSelected}
      collapse={true}
      collapseDataKey={'ingredients'}
      columns={columns}
      rows={rows}
      onSearch={onSearch}
      renderCollapse={(ingredients: Record<string, any>[]) => {
        return (
          <Table
            hideHeader
            condensed
            keyField={'ingredientId'}
            collapse={false}
            columns={[
              {
                label: 'ID del Ingrediente',
                key: 'ingredientId',
              },
              {
                label: 'Nombre del Ingrediente',
                key: 'name',
              },
              {
                label: 'Cantidad Requerida',
                key: 'quantity',
                align: 'center',
              },
            ]}
            rows={ingredients}
          />
        );
      }}
    />
  );
};