/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../shared/states/global';
import { HeaderContainer } from '../elements/headers/containers';
import { Page } from '../shared/components/page';
import { SignupContainer } from '../elements/signup/containers';

export const Signup = () => {
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
        <SignupContainer />
      </Page>
    </>
  );
};
