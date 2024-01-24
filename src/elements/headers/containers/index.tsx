import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import { useContext, useState } from 'react';
import { GlobalState } from '../../../shared/states/global';
import { signout } from '../../../services/account';

export const HeaderContainer = () => {
  const navigate = useNavigate();
  const { setAuth, auth, setFormOrder } = useContext(GlobalState);

  const handleCreate = () => {
    setFormOrder({ isOpen: true });
  };

  const handleSignout = () => {
    signout()
      .then(() => {
        setAuth({ isLogged: false });
        navigate('/signin');
      });
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const handleOpenSidebar = () => setSidebarIsOpen(true);
  const handleCloseSidebar = () => setSidebarIsOpen(false);

  return (
    <Header
      isLogged={auth.isLogged}
      onCreate={handleCreate}
      onSignout={handleSignout}
      sidebarIsOpen={sidebarIsOpen}
      onOpenSidebar={handleOpenSidebar}
      onCloseSidebar={handleCloseSidebar}
    />
  );
};
