/* eslint-disable react-hooks/exhaustive-deps */
import { DraggableProvided } from 'react-beautiful-dnd';
import { ItemType } from '../../definitions/item';
import FoodIcon from '@mui/icons-material/LunchDiningRounded';
import CompleteIcon from '@mui/icons-material/CheckCircleOutline';
import './index.styles.css';
import { Button } from '../button';
import { Typography } from '../typography';
import { formatDistance } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

type ItemProps = {
  provided: DraggableProvided;
  data: ItemType;
  onComplete: (itemId: string) => void;
  onEdit: (item: ItemType) => void;
  completeId?: string | null;
};

export const Item = (props: ItemProps) => {
  const {
    provided,
    data,
    onComplete,
    onEdit,
    completeId,
  } = props;

  const completing = completeId === data.itemId;

  const calculateDateAgo = () => {
    const newDateAgo = formatDistance(new Date(data.createdAt), new Date(), { addSuffix: true });
    return newDateAgo;
  };
  const [dateAgo, setDateAgo] = useState(calculateDateAgo());

  const dateAgoInterval = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    dateAgoInterval.current = setInterval(() => {
      setDateAgo(calculateDateAgo());
    }, 300000);

    return () => {
      if (dateAgoInterval.current) {
        clearInterval(dateAgoInterval.current);
      }
    };
  }, []);

  return (
    <article
      className={`item-element ${data.itemState === 'delivered' ? 'item-element--completed' : ''}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className='item-element__content'>
        <h2 className='item-element__header'>
          <span className={`item-element__header-title`}>
            <span className='item-element__header-image'>
              <FoodIcon />
            </span>
            <span className='item-element__header-text'>
              <span className='title'>
                {data.itemHeader || 'Unknown'}
              </span>
              <span className='date'>
                {dateAgo}
              </span>
            </span>
          </span>
        </h2>

        <p>{data.itemDescription}</p>
      </div>

      <div className='item-element__actions'>
        <div className='item-element__actions__buttons'>
          {data.itemState !== 'todo' && (
            <>
              <button
                className='btn'
                onClick={() => onComplete(data.itemId)}
                disabled={(completing || data.itemState === 'delivered')}
              >
                <CompleteIcon />
              </button>
              <Button
                variant='outline'
                onClick={() => onEdit(data)}
              >
                Add Notes
              </Button>
            </>
          )}
        </div>
        <div className='item-element__actions__price'>
          <Typography className='mb-0' bold component='h4'>
            $ 0.00
          </Typography>
          <Typography className='mt-0' bold component='p' color='primary'>
            Free
          </Typography>
        </div>
      </div>
    </article>
  );
};
