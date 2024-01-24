import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/button';
import { Logo } from '../../../shared/components/logo';
import { Panel } from '../../../shared/components/panel';
import { TextField } from '../../../shared/components/textField';
import { Typography } from '../../../shared/components/typography';
import './index.styles.css';

export type SignupProps = {
  className?: string;
  onUsernameChange?: React.ChangeEventHandler<HTMLInputElement>;
  username?: string;
  usernameErrorMessage?: string;
  onEmailChange?: React.ChangeEventHandler<HTMLInputElement>;
  email?: string;
  emailErrorMessage?: string;
  onPhoneChange?: React.ChangeEventHandler<HTMLInputElement>;
  phone?: string;
  onPasswordChange?: React.ChangeEventHandler<HTMLInputElement>;
  password?: string;
  passwordErrorMessage?: string;
  onSignupClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
};

export const Signup = (props: SignupProps) => {
  const navigate = useNavigate();

  const {
    className,
    onUsernameChange,
    username,
    usernameErrorMessage,
    onEmailChange,
    email,
    emailErrorMessage,
    onPhoneChange,
    phone,
    onPasswordChange,
    password,
    passwordErrorMessage,
    onSignupClick,
    isLoading = false,
  } = props;

  return (
    <Panel className={`signup-panel ${className}`}>
      <Logo
        className={`mt-4 center`}
        size='sm'
      />

      <Typography component='h4' className='center mt-4 mb-0' bold color='primary'>
        Hola, Bienvenido
      </Typography>

      <Typography component='h5' className='center mt-2 mb-5' thin color='gray'>
        Registra tus credenciales para continuar
      </Typography>

      <TextField
        label={`E - mail`}
        placeholder={`Correo electrónico`}
        value={email}
        onChange={onEmailChange}
        disabled={isLoading}
        errorMessage={emailErrorMessage}
      />

      <TextField
        label={`Teléfono`}
        placeholder={`Número telefónico`}
        value={phone}
        onChange={onPhoneChange}
        disabled={isLoading}
      />

      <TextField
        label={`Usuario`}
        placeholder={`Nombre de usuario`}
        value={username}
        onChange={onUsernameChange}
        disabled={isLoading}
        errorMessage={usernameErrorMessage}
      />

      <TextField
        label={`Contraseña`}
        placeholder={`Contraseña`}
        value={password}
        onChange={onPasswordChange}
        type={'password'}
        disabled={isLoading}
        errorMessage={passwordErrorMessage}
      />

      <Button
        fullwidth
        className='mb-4'
        onClick={onSignupClick}
        disabled={isLoading}
      >
        Crear Cuenta
      </Button>

      <Button
        fullwidth
        className='mb-4'
        variant='secondary'
        onClick={() => navigate('/signin')}
      >
        ¿Ya tienes Cuenta? Inicia Sesión
      </Button>
    </Panel>
  );
};
