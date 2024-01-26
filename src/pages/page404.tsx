import { Page } from '../shared/components/page';
import { NotFound404 } from '../shared/components/404';
import { HeaderContainer } from '../elements/headers/containers';

export const Page404 = () => {
  return (
    <>
      <HeaderContainer />
      <Page center>
        <NotFound404 />
      </Page>
    </>
  );
};
