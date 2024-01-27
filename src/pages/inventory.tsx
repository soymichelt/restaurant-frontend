/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { Page } from '../shared/components/page';
import { useContext, useEffect } from 'react';
import { GlobalState } from '../shared/states/global';
import { Typography } from '../shared/components/typography';
import { IsAuthenticated } from '../elements/isAuthenticated/components';
import { HeaderContainer } from '../elements/headers/containers';
import { MovementsContainer } from '../elements/movements/containers';

export const Inventory = () => {
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
            Movimientos de Inventario
          </Typography>

          <MovementsContainer />
        </IsAuthenticated>
      </Page>
    </>
  );
};
