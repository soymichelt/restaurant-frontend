/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { Page } from '../shared/components/page';
import { useContext, useEffect } from 'react';
import { GlobalState } from '../shared/states/global';
import { Typography } from '../shared/components/typography';
import { IsAuthenticated } from '../elements/isAuthenticated/components';
import { HeaderContainer } from '../elements/headers/containers';
import { OrdersListContainer } from '../elements/ordersList/containers';

export const Orders = () => {
  const navigate = useNavigate();
  const { auth } = useContext(GlobalState);

  useEffect(() => {
    if (!auth.isLogged) {
      navigate('/signin');
    }
  }, [auth.isLogged]);

  return (
    <>
      <HeaderContainer />
      <Page>
        <IsAuthenticated>
          <Typography component='h4' className='mt-0 mb-4'>
            Órdenes de Comida
          </Typography>

          <OrdersListContainer />
        </IsAuthenticated>
      </Page>
    </>
  );
};
