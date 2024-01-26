import DownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import UpIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { IconButton } from '../iconButton';
import './index.styles.css';
import { Typography } from '../typography';
import { TextField } from '../textField';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { ReactElement } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TableProps = {
  className?: string;
  condensed?: boolean;
  backgroundColor?: string;
  title?: string | React.ReactElement | React.ReactElement[];
  keyField?: string;
  keySelected?: string;
  onSelect?: (key: string) => void;
  collapse?: boolean;
  collapseDataKey?: string;
  columns: Record<string, any>[];
  rows: Record<string, any>[];
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
  renderCollapse?: (collapseData: Record<string, any>[]) => ReactElement;
  hideHeader?: boolean;
};

export const Table = (props: TableProps) => {
  const {
    className = '',
    condensed,
    title = '',
    keyField = '',
    keySelected = '',
    onSelect = () => {},
    collapse = false,
    collapseDataKey = '',
    columns,
    rows,
    onSearch,
    renderCollapse,
    hideHeader,
  } = props;

  const colSpan = columns.filter(({ hide }) => !hide).length;

  return (
    <div
      className={`table-container ${className} ${condensed ? 'table-container--condensed' : ''}`}
    >
      {!hideHeader && (
        <header className={`table-container__header`}>
          <span>
            <Typography component='h4'>
              {title}
            </Typography>
          </span>
          <div>
            <TextField
              rounded
              placeholder='Buscar...'
              icon={<SearchIcon />}
              onChange={onSearch}
            />
          </div>
        </header>
      )}
      <div className='table-wrapper'>
        <table className='table' cellSpacing={0}>
          <thead>
            <tr>
              {collapse && (<th className='collapse'></th>)}

              {columns?.map(column => <th
                key={`header-${column.key}`}
                className={`${column.hide ? 'hide' : ''} align--${column.align || 'left'}`}
              >
                {column.label}
              </th>)}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, rowIndex) => {
              return (
                <>
                  <tr key={rowIndex}>
                    {collapse && (
                      <td className='collapse'>
                        <IconButton
                          onClick={() => onSelect(!keySelected ? row[keyField] : '')}
                        >
                          {keySelected === row[keyField] ? (
                            <UpIcon />
                          ) : (
                            <DownIcon />
                          )}
                        </IconButton>
                      </td>
                    )}

                    {columns?.map((column, columnIndex) => {
                      return (
                        <td
                          key={columnIndex}
                          className={`${column.hide ? 'hide' : ''} align--${column.align || 'left'}`}
                        >
                          {row[column.key]}
                        </td>
                      );
                    })}
                  </tr>

                  {collapse && (
                    <tr className={`collapse-section ${keySelected === row[keyField] ? 'collapse--selected' : ''}`}>
                      <td colSpan={colSpan + 1}>
                        {renderCollapse && (renderCollapse(row[collapseDataKey]))}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
