import { useContext } from 'react';
import { signin } from '../../../services/account';
import { useField } from '../../../shared/hooks/useField';
import { Signin } from '../components';
import { GlobalState } from '../../../shared/states/global';
import { useNavigate } from 'react-router-dom';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';

export const SigninContainer = () => {
  const { setAuth, showNotification } = useContext(GlobalState);
  const navigate = useNavigate();

  const usernameField = useField('');
  const passwordField = useField('');
  const { state, ...signinAction } = useDataProvider(false);

  const handleSigninClick = () => {
    if (usernameField.isEmpty() || passwordField.isEmpty()) {
      if (usernameField.isEmpty()) {
        usernameField.setError('Username is required');
      }
      if (passwordField.isEmpty()) {
        passwordField.setError('Password is required');
      }

      return;
    }

    signinAction.loading();
    signin(usernameField.value as string, passwordField.value as string)
      .then(data => {
        signinAction.success();
        setAuth({
          isLogged: true,
          myAccount: data
        });
        navigate('/');
        showNotification('Welcome back! 😇', 'info');
      })
      .catch((error: Error) => {
        signinAction.catch(error);
        showNotification(error.message, 'error');
        console.log(error);
      });
  };

  return (
    <Signin
      username={usernameField.value}
      usernameErrorMessage={usernameField.error}
      onUsernameChange={usernameField.onChange}
      password={passwordField.value}
      passwordErrorMessage={passwordField.error}
      onPasswordChange={passwordField.onChange}
      onSigninClick={handleSigninClick}
      isLoading={state.statusData === LOADING}
    />
  );
};
