/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../shared/states/global';
import { HeaderContainer } from '../elements/headers/containers';
import { Page } from '../shared/components/page';
import { SigninContainer } from '../elements/signin/containers';

export const Signin = () => {
  const navigate = useNavigate();
  const { auth } = useContext(GlobalState);

  useEffect(() => {
    if (auth.isLogged) {
      navigate('/');
    }
  }, [auth.isLogged]);

  return (
    <>
      <HeaderContainer />
      <Page
        center
      >
        <SigninContainer />
      </Page>
    </>
  );
};
