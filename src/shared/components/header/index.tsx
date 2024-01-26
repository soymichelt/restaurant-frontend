import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/MenuRounded';
import './index.styles.css';
import { Logo } from '../logo';

type HeaderProps = {
  isLogged?: boolean;
  onCreate?: () => void;
  onSignout?: () => void;
  sidebarIsOpen?: boolean;
  onOpenSidebar?: () => void;
  onCloseSidebar?: () => void;
};

export const Header = (props: HeaderProps) => {
  const {
    isLogged = false,
    onCreate,
    onSignout,
    sidebarIsOpen = false,
    onOpenSidebar,
    onCloseSidebar,
  } = props;

  return (
    <>
      <header className={'header'}>
        <h2>
          <Link to={'/'}>Kitchen <span>App</span></Link>
        </h2>

        <nav>
          {isLogged ? (
            <>
              <button className='btn-primary' onClick={onCreate}>
                Ordenar Comida
              </button>
              <button
                className='menu-item menu-item--short-menu'
                onClick={onOpenSidebar}
              >
                <MenuIcon />
              </button>

              <Link className='menu-item menu-item--large' to={'/catalogue'}>
                Catálogo
              </Link>
              <Link className='menu-item menu-item--large' to={'/ingredients'}>
                Ingredientes
              </Link>
              <Link className='menu-item menu-item--large' to={'/orders'}>
                Ordenes
              </Link>
              <Link className='menu-item menu-item--large' to={'/profile'}>
                My Account
              </Link>
              <button className='menu-item menu-item--large' onClick={onSignout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link className='menu-item menu-item--short-menu' to={'/signin'}>
                Entrar
              </Link>

              <Link className='menu-item menu-item--large' to={'/signin'}>
                Iniciar Sesión
              </Link>
              <Link className='menu-item' to={'/signup'}>
                Regístrate
              </Link>
            </>
          )}
        </nav>
      </header>

      <div
        className={`sidebar-overlay ${sidebarIsOpen ? 'is-open' : ''}`}
        onClick={onCloseSidebar}
      />
      <aside className={`sidebar ${sidebarIsOpen ? 'is-open' : ''}`}>
        <header>
          <Link to='/'>
            <Logo size='sm' />
          </Link>
        </header>
        <nav className='nav-menu'>
          <ul>
            <li>
              <Link to='/'>
                Inicio
              </Link>
            </li>
            <li>
              <Link to='/catalogue'>
                Catálogo
              </Link>
            </li>
            <li>
              <Link to='/ingredients'>
                Ingredientes
              </Link>
            </li>
            <li>
              <Link to='/orders'>
                Órdenes
              </Link>
            </li>
          </ul>
        </nav>
        <nav className='nav-account'>
          <ul>
            <li>
              <Link to='/profile'>
                My Profile
              </Link>
            </li>
            <li>
              <button onClick={onSignout}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
