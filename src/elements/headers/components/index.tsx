import { Header as HeaderComponent } from '../../../shared/components/header';
import { OrderCreateContainer } from '../../ordersCreate/containers';

export type HeaderProps = {
  isLogged?: boolean;
  onCreate?: () => void;
  onSignout?: () => void;
  sidebarIsOpen?: boolean;
  onOpenSidebar?: () => void;
  onCloseSidebar?: () => void;
};

export const Header = (props: HeaderProps) => {
  const {
    isLogged,
    onCreate,
    onSignout,
    sidebarIsOpen,
    onOpenSidebar,
    onCloseSidebar,
  } = props;

  return (
    <>
      <HeaderComponent
        isLogged={isLogged}
        onCreate={onCreate}
        onSignout={onSignout}
        sidebarIsOpen={sidebarIsOpen}
        onOpenSidebar={onOpenSidebar}
        onCloseSidebar={onCloseSidebar}
      />

      <OrderCreateContainer />
    </>
  );
};