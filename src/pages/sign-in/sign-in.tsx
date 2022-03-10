import React, {useEffect, useState} from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {AppRoute, AuthStatus} from '../../consts';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthErrorMessage, getAuthStatus} from '../../store/user-reducer/selectors';
import {useNavigate} from 'react-router-dom';
import {requireAuthorization} from '../../store/api-action';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import {getIsLoading} from '../../store/data-reducer/selectors';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(getAuthStatus);
  const isLoading = useSelector(getIsLoading);
  const authErrorMessage = useSelector(getAuthErrorMessage)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const handleEmailChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    const regExPassword = /(?=.*[a-zA-Z])(?=.*\d)/;
    const regExEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
    let passwordCorrect  = regExPassword.test(password);
    let emailCorrect = regExEmail.test(email);

    if (!passwordCorrect) {
      setErrorMessage('Пароль должен состоять минимум из одной буквы и цифры');
      setIsErrorPassword(true);
    } else {
      setIsErrorPassword(false);
    }

    if (!emailCorrect) {
      setErrorMessage('Введите корректный email');
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }

    if (passwordCorrect && emailCorrect) {
      setErrorMessage('');
      dispatch(requireAuthorization(email, password));
    }

    if (authErrorMessage !== '') {
      setErrorMessage(authErrorMessage);
    }

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus]);

  useEffect(() => {
    if (authErrorMessage !== '') {
      setErrorMessage(authErrorMessage);
    }
  }, [authErrorMessage])


  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="user-page">
      <Header/>

      <div className="sign-in user-page__content">
        <form
          onSubmit={handleSubmit}
          action="#"
          className="sign-in__form"
        >
          <div className="sign-in__message">
            <p>{errorMessage}</p>
          </div>
          <div className="sign-in__fields">
            <div className={`sign-in__field ${isErrorEmail? 'sign-in__field--error' : ''}`}>
              <input
                value={email}
                onChange={handleEmailChange}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid = 'userEmail'
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field ${isErrorPassword? 'sign-in__field--error' : ''}`}>
              <input
                value={password}
                onChange={handlePasswordChange}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                autoComplete="on"
                data-testid = 'userPassword'
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              onClick={handleButtonClick}
              className="sign-in__btn"
              type="submit"
              data-testid = 'signInSubmitButton'
            >Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
};

export default SignIn;
