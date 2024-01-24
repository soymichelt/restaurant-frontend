import { ReactElement, useContext } from 'react';
import { GlobalState } from '../../../shared/states/global';

export type IsAuthenticatedProps = {
  children: string | number | ReactElement | ReactElement[];
};

export const IsAuthenticated = (props: IsAuthenticatedProps) => {
  const { auth } = useContext(GlobalState);
  const { children } = props;
  return (
    <>
      {auth.isLogged && children}
    </>
  );
};
