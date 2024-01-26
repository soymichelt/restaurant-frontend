/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../shared/states/global';
import { useContext, useEffect } from 'react';
import { HeaderContainer } from '../elements/headers/containers';
import { Page } from '../shared/components/page';
import { IsAuthenticated } from '../elements/isAuthenticated/components';
import { Typography } from '../shared/components/typography';
import { OrdersContainer } from '../elements/orders/containers';

export const Home = () => {
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
            Orders Board
          </Typography>

          <OrdersContainer />
        </IsAuthenticated>
      </Page>
    </>
  );
};
