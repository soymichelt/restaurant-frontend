import { useNavigate } from 'react-router-dom';
import { signup } from '../../../services/account';
import { useField } from '../../../shared/hooks/useField';
import { Signup } from '../components';
import { useContext } from 'react';
import { GlobalState } from '../../../shared/states/global';
import { LOADING, useDataProvider } from '../../../shared/hooks/useDataProvider';

export const SignupContainer = () => {
  const { setAuth, showNotification } = useContext(GlobalState);
  const navigate = useNavigate();

  const emailField = useField('');
  const phoneField = useField('');
  const usernameField = useField('');
  const passwordField = useField('');
  const { state, ...singupAction } = useDataProvider(false);

  const handleSignupClick = () => {
    if (emailField.isEmpty() || usernameField.isEmpty() || passwordField.isEmpty()) {
      if (emailField.isEmpty()) {
        emailField.setError('Email is required');
      }
      if (usernameField.isEmpty()) {
        usernameField.setError('Username is required');
      }
      if (passwordField.isEmpty()) {
        passwordField.setError('Password is required');
      }

      return;
    }

    singupAction.loading();
    signup({
      email: emailField.value as string,
      phone: phoneField.value as string,
      username: usernameField.value as string,
      password: passwordField.value as string,
    })
      .then((data) => {
        singupAction.success();
        setAuth({
          isLogged: true,
          myAccount: data,
        });
        navigate('/');
        showNotification('Welcome 🫶', 'info');
      })
      .catch((error: Error) => {
        singupAction.catch(error);
        console.log(error);
        showNotification(error.message, 'error');
      });
  };

  return (
    <Signup
      email={emailField.value}
      emailErrorMessage={emailField.error}
      onEmailChange={emailField.onChange}
      phone={phoneField.value}
      onPhoneChange={phoneField.onChange}
      username={usernameField.value}
      usernameErrorMessage={usernameField.error}
      onUsernameChange={usernameField.onChange}
      password={passwordField.value}
      passwordErrorMessage={passwordField.error}
      onPasswordChange={passwordField.onChange}
      onSignupClick={handleSignupClick}
      isLoading={state.statusData === LOADING}
    />
  );
};
